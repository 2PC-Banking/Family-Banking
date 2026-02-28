using FamilyBank.Domain.Entities;

namespace FamilyBank.Domain.Interfaces;

public interface IAccountRepository : IRepository<Account>
{
    Task<Account?> GetByAccountNumberAsync(string accountNumber, CancellationToken cancellationToken = default);
    Task<IEnumerable<Account>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<decimal> GetBalanceAsync(Guid accountId, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Lock account for update (SELECT FOR UPDATE) to prevent race condition
    /// </summary>
    Task<Account?> GetByIdForUpdateAsync(Guid id, CancellationToken cancellationToken = default);
}
