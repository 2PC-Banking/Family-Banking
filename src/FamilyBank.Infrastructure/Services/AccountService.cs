using FamilyBank.Application.Common.Exceptions;
using FamilyBank.Application.DTOs.Account;
using FamilyBank.Application.Interfaces;
using FamilyBank.Domain.Entities;
using FamilyBank.Domain.Interfaces;

namespace FamilyBank.Infrastructure.Services;

public class AccountService : IAccountService
{
    private readonly IUnitOfWork _unitOfWork;

    public AccountService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<AccountDto> CreateAccountAsync(Guid userId, CreateAccountRequest request, CancellationToken cancellationToken = default)
    {
        // Verify user exists
        var user = await _unitOfWork.Users.GetByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            throw new NotFoundException("Người dùng không tồn tại");
        }

        // Generate unique account number
        var accountNumber = await GenerateAccountNumberAsync(cancellationToken);

        var account = new Account
        {
            UserId = userId,
            AccountNumber = accountNumber,
            Name = request.Name,
            Currency = request.Currency
        };

        await _unitOfWork.Accounts.AddAsync(account, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return new AccountDto(
            Id: account.Id,
            AccountNumber: account.AccountNumber,
            Name: account.Name,
            Currency: account.Currency,
            Balance: 0m, // New account starts with 0 balance
            Status: account.Status.ToString(),
            CreatedAt: account.CreatedAt
        );
    }

    public async Task<AccountDto?> GetAccountAsync(Guid accountId, CancellationToken cancellationToken = default)
    {
        var account = await _unitOfWork.Accounts.GetByIdAsync(accountId, cancellationToken);
        if (account == null)
        {
            return null;
        }

        var balance = await _unitOfWork.Accounts.GetBalanceAsync(accountId, cancellationToken);

        return new AccountDto(
            Id: account.Id,
            AccountNumber: account.AccountNumber,
            Name: account.Name,
            Currency: account.Currency,
            Balance: balance,
            Status: account.Status.ToString(),
            CreatedAt: account.CreatedAt
        );
    }

    public async Task<IEnumerable<AccountDto>> GetUserAccountsAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var accounts = await _unitOfWork.Accounts.GetByUserIdAsync(userId, cancellationToken);
        var result = new List<AccountDto>();

        foreach (var account in accounts)
        {
            var balance = await _unitOfWork.Accounts.GetBalanceAsync(account.Id, cancellationToken);
            result.Add(new AccountDto(
                Id: account.Id,
                AccountNumber: account.AccountNumber,
                Name: account.Name,
                Currency: account.Currency,
                Balance: balance,
                Status: account.Status.ToString(),
                CreatedAt: account.CreatedAt
            ));
        }

        return result;
    }

    public async Task<decimal> GetBalanceAsync(Guid accountId, CancellationToken cancellationToken = default)
    {
        var account = await _unitOfWork.Accounts.GetByIdAsync(accountId, cancellationToken);
        if (account == null)
        {
            throw new NotFoundException("Tài khoản không tồn tại");
        }

        return await _unitOfWork.Accounts.GetBalanceAsync(accountId, cancellationToken);
    }

    private async Task<string> GenerateAccountNumberAsync(CancellationToken cancellationToken)
    {
        var random = new Random();
        string accountNumber;
        
        do
        {
            // Format: FAM-XXXXXX (6 random digits)
            accountNumber = $"FAM-{random.Next(100000, 999999)}";
        }
        while (await _unitOfWork.Accounts.GetByAccountNumberAsync(accountNumber, cancellationToken) != null);

        return accountNumber;
    }
}
