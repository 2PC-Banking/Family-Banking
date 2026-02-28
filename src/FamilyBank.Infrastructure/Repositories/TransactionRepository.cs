using FamilyBank.Domain.Entities;
using FamilyBank.Domain.Interfaces;
using FamilyBank.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FamilyBank.Infrastructure.Repositories;

public class TransactionRepository : Repository<Transaction>, ITransactionRepository
{
    public TransactionRepository(FamilyBankDbContext context) : base(context)
    {
    }

    public async Task<Transaction?> GetByReferenceNumberAsync(string referenceNumber, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Include(t => t.FromAccount)
            .Include(t => t.ToAccount)
            .FirstOrDefaultAsync(t => t.ReferenceNumber == referenceNumber, cancellationToken);
    }

    public async Task<Transaction?> GetByIdempotencyKeyAsync(string idempotencyKey, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Include(t => t.FromAccount)
            .Include(t => t.ToAccount)
            .FirstOrDefaultAsync(t => t.IdempotencyKey == idempotencyKey, cancellationToken);
    }

    public async Task<IEnumerable<Transaction>> GetByAccountIdAsync(Guid accountId, int page = 1, int pageSize = 20, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Include(t => t.FromAccount)
            .Include(t => t.ToAccount)
            .Where(t => t.FromAccountId == accountId || t.ToAccountId == accountId)
            .OrderByDescending(t => t.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
    }
}
