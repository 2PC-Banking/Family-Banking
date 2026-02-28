using FamilyBank.Application.DTOs.Transfer;

namespace FamilyBank.Application.Interfaces;

public interface ITransferService
{
    /// <summary>
    /// Thực hiện chuyển tiền giữa 2 tài khoản
    /// - Sử dụng database transaction để đảm bảo ACID
    /// - Sử dụng row-level locking (SELECT FOR UPDATE) để tránh race condition
    /// - Sử dụng idempotency key để tránh duplicate transaction
    /// </summary>
    Task<TransferResponse> TransferAsync(Guid userId, TransferRequest request, CancellationToken cancellationToken = default);
    
    Task<TransactionDto?> GetTransactionAsync(string referenceNumber, CancellationToken cancellationToken = default);
    Task<IEnumerable<TransactionDto>> GetTransactionHistoryAsync(Guid accountId, int page = 1, int pageSize = 20, CancellationToken cancellationToken = default);
}
