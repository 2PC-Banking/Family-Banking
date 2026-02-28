using FamilyBank.Application.Common.Exceptions;
using FamilyBank.Application.DTOs.Transfer;
using FamilyBank.Application.Interfaces;
using FamilyBank.Domain.Entities;
using FamilyBank.Domain.Enums;
using FamilyBank.Domain.Interfaces;
using FamilyBank.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace FamilyBank.Infrastructure.Services;

public class TransferService : ITransferService
{
    private readonly FamilyBankDbContext _context;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<TransferService> _logger;

    public TransferService(
        FamilyBankDbContext context,
        IUnitOfWork unitOfWork,
        ILogger<TransferService> logger)
    {
        _context = context;
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    /// <summary>
    /// Thực hiện chuyển tiền với full ACID transaction
    /// Sử dụng:
    /// 1. Idempotency key để tránh duplicate
    /// 2. Row-level locking (SELECT FOR UPDATE) để tránh race condition
    /// 3. Double-entry bookkeeping để đảm bảo audit trail
    /// </summary>
    public async Task<TransferResponse> TransferAsync(Guid userId, TransferRequest request, CancellationToken cancellationToken = default)
    {
        // Validate amount
        if (request.Amount <= 0)
        {
            throw new ValidationException("Số tiền chuyển phải lớn hơn 0");
        }

        // Check idempotency - if this request was already processed, return existing result
        if (!string.IsNullOrEmpty(request.IdempotencyKey))
        {
            var existingTransaction = await _unitOfWork.Transactions
                .GetByIdempotencyKeyAsync(request.IdempotencyKey, cancellationToken);
            
            if (existingTransaction != null)
            {
                _logger.LogInformation("Duplicate transaction detected with idempotency key: {Key}", request.IdempotencyKey);
                throw new DuplicateTransactionException(existingTransaction.ReferenceNumber);
            }
        }

        // Get accounts
        var fromAccount = await _unitOfWork.Accounts
            .GetByAccountNumberAsync(request.FromAccountNumber, cancellationToken);
        
        if (fromAccount == null)
        {
            throw new NotFoundException($"Tài khoản nguồn {request.FromAccountNumber} không tồn tại");
        }

        var toAccount = await _unitOfWork.Accounts
            .GetByAccountNumberAsync(request.ToAccountNumber, cancellationToken);
        
        if (toAccount == null)
        {
            throw new NotFoundException($"Tài khoản đích {request.ToAccountNumber} không tồn tại");
        }

        // Verify ownership
        if (fromAccount.UserId != userId)
        {
            throw new ValidationException("Bạn không có quyền chuyển tiền từ tài khoản này");
        }

        // Check account status
        if (fromAccount.Status != AccountStatus.Active)
        {
            throw new AccountFrozenException();
        }

        if (toAccount.Status != AccountStatus.Active)
        {
            throw new ValidationException("Tài khoản đích đã bị đóng băng hoặc đã đóng");
        }

        // Cannot transfer to same account
        if (fromAccount.Id == toAccount.Id)
        {
            throw new ValidationException("Không thể chuyển tiền đến cùng một tài khoản");
        }

        // Begin transaction with row-level locking
        await _unitOfWork.BeginTransactionAsync(cancellationToken);

        try
        {
            // Lock accounts in consistent order (by ID) to prevent deadlock
            var accountIds = new[] { fromAccount.Id, toAccount.Id }.OrderBy(id => id).ToArray();
            
            foreach (var accountId in accountIds)
            {
                await _unitOfWork.Accounts.GetByIdForUpdateAsync(accountId, cancellationToken);
            }

            // Re-check balance after locking
            var currentBalance = await _unitOfWork.Accounts.GetBalanceAsync(fromAccount.Id, cancellationToken);
            
            if (currentBalance < request.Amount)
            {
                throw new InsufficientBalanceException();
            }

            // Generate reference number
            var referenceNumber = GenerateReferenceNumber();

            // Create transaction record
            var transaction = new Transaction
            {
                ReferenceNumber = referenceNumber,
                FromAccountId = fromAccount.Id,
                ToAccountId = toAccount.Id,
                Amount = request.Amount,
                Currency = fromAccount.Currency,
                Description = request.Description,
                Status = TransactionStatus.Pending,
                IdempotencyKey = request.IdempotencyKey
            };

            await _context.Transactions.AddAsync(transaction, cancellationToken);

            // Create ledger entries (Double-entry bookkeeping)
            // Entry 1: DEBIT from source account (tiền ra)
            var debitEntry = new LedgerEntry
            {
                TransactionId = transaction.Id,
                AccountId = fromAccount.Id,
                EntryType = LedgerEntryType.Debit,
                Amount = request.Amount
            };

            // Entry 2: CREDIT to destination account (tiền vào)
            var creditEntry = new LedgerEntry
            {
                TransactionId = transaction.Id,
                AccountId = toAccount.Id,
                EntryType = LedgerEntryType.Credit,
                Amount = request.Amount
            };

            await _context.LedgerEntries.AddRangeAsync(new[] { debitEntry, creditEntry }, cancellationToken);

            // Mark transaction as completed
            transaction.Status = TransactionStatus.Completed;
            transaction.CompletedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync(cancellationToken);
            await _unitOfWork.CommitTransactionAsync(cancellationToken);

            _logger.LogInformation(
                "Transfer completed: {ReferenceNumber} | {Amount} {Currency} | {From} -> {To}",
                referenceNumber, request.Amount, fromAccount.Currency,
                request.FromAccountNumber, request.ToAccountNumber);

            return new TransferResponse(
                ReferenceNumber: referenceNumber,
                Status: TransactionStatus.Completed.ToString(),
                Amount: request.Amount,
                Currency: fromAccount.Currency,
                FromAccountNumber: request.FromAccountNumber,
                ToAccountNumber: request.ToAccountNumber,
                CreatedAt: transaction.CreatedAt
            );
        }
        catch (Exception ex)
        {
            await _unitOfWork.RollbackTransactionAsync(cancellationToken);
            _logger.LogError(ex, "Transfer failed: {From} -> {To}", request.FromAccountNumber, request.ToAccountNumber);
            throw;
        }
    }

    public async Task<TransactionDto?> GetTransactionAsync(string referenceNumber, CancellationToken cancellationToken = default)
    {
        var transaction = await _unitOfWork.Transactions.GetByReferenceNumberAsync(referenceNumber, cancellationToken);
        
        if (transaction == null)
        {
            return null;
        }

        return MapToDto(transaction);
    }

    public async Task<IEnumerable<TransactionDto>> GetTransactionHistoryAsync(Guid accountId, int page = 1, int pageSize = 20, CancellationToken cancellationToken = default)
    {
        var transactions = await _unitOfWork.Transactions.GetByAccountIdAsync(accountId, page, pageSize, cancellationToken);
        return transactions.Select(MapToDto);
    }

    private static TransactionDto MapToDto(Transaction transaction)
    {
        return new TransactionDto(
            Id: transaction.Id,
            ReferenceNumber: transaction.ReferenceNumber,
            FromAccountNumber: transaction.FromAccount?.AccountNumber ?? "N/A",
            ToAccountNumber: transaction.ToAccount?.AccountNumber ?? "N/A",
            Amount: transaction.Amount,
            Currency: transaction.Currency,
            Description: transaction.Description,
            Status: transaction.Status.ToString(),
            CreatedAt: transaction.CreatedAt,
            CompletedAt: transaction.CompletedAt
        );
    }

    private static string GenerateReferenceNumber()
    {
        // Format: TXN + timestamp + random suffix
        // Example: TXN20260228143022ABC
        var timestamp = DateTime.UtcNow.ToString("yyyyMMddHHmmss");
        var random = new Random();
        var suffix = new string(Enumerable.Range(0, 3)
            .Select(_ => (char)('A' + random.Next(26)))
            .ToArray());
        
        return $"TXN{timestamp}{suffix}";
    }
}
