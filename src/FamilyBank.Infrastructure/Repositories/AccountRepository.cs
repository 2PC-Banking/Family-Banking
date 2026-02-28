using FamilyBank.Domain.Entities;
using FamilyBank.Domain.Enums;
using FamilyBank.Domain.Interfaces;
using FamilyBank.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FamilyBank.Infrastructure.Repositories;

public class AccountRepository : Repository<Account>, IAccountRepository
{
    public AccountRepository(FamilyBankDbContext context) : base(context)
    {
    }

    public async Task<Account?> GetByAccountNumberAsync(string accountNumber, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Include(a => a.User)
            .FirstOrDefaultAsync(a => a.AccountNumber == accountNumber, cancellationToken);
    }

    public async Task<IEnumerable<Account>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(a => a.UserId == userId)
            .ToListAsync(cancellationToken);
    }

    public async Task<decimal> GetBalanceAsync(Guid accountId, CancellationToken cancellationToken = default)
    {
        // Balance = SUM(Credit) - SUM(Debit)
        var credits = await _context.LedgerEntries
            .Where(e => e.AccountId == accountId && e.EntryType == LedgerEntryType.Credit)
            .SumAsync(e => e.Amount, cancellationToken);

        var debits = await _context.LedgerEntries
            .Where(e => e.AccountId == accountId && e.EntryType == LedgerEntryType.Debit)
            .SumAsync(e => e.Amount, cancellationToken);

        return credits - debits;
    }

    public async Task<Account?> GetByIdForUpdateAsync(Guid id, CancellationToken cancellationToken = default)
    {
        // PostgreSQL: SELECT ... FOR UPDATE để lock row
        return await _dbSet
            .FromSqlRaw("SELECT * FROM \"Accounts\" WHERE \"Id\" = {0} FOR UPDATE", id)
            .FirstOrDefaultAsync(cancellationToken);
    }
}
