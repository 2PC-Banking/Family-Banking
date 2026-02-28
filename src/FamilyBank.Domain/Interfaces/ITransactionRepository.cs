using FamilyBank.Domain.Entities;

namespace FamilyBank.Domain.Interfaces;

public interface ITransactionRepository : IRepository<Transaction>
{
    Task<Transaction?> GetByReferenceNumberAsync(string referenceNumber, CancellationToken cancellationToken = default);
    Task<Transaction?> GetByIdempotencyKeyAsync(string idempotencyKey, CancellationToken cancellationToken = default);
    Task<IEnumerable<Transaction>> GetByAccountIdAsync(Guid accountId, int page = 1, int pageSize = 20, CancellationToken cancellationToken = default);
}
