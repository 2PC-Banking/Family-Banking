using FamilyBank.Domain.Entities;
using FamilyBank.Domain.Interfaces;
using FamilyBank.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FamilyBank.Infrastructure.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(FamilyBankDbContext context) : base(context)
    {
    }

    public async Task<User?> GetByPhoneNumberAsync(string phoneNumber, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber, cancellationToken);
    }
}
