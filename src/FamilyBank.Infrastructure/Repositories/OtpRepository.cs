using FamilyBank.Domain.Entities;
using FamilyBank.Domain.Interfaces;
using FamilyBank.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FamilyBank.Infrastructure.Repositories;

public class OtpRepository : Repository<OtpCode>, IOtpRepository
{
    public OtpRepository(FamilyBankDbContext context) : base(context)
    {
    }

    public async Task<OtpCode?> GetLatestByPhoneNumberAsync(string phoneNumber, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(o => o.PhoneNumber == phoneNumber && !o.IsUsed && o.ExpiresAt > DateTime.UtcNow)
            .OrderByDescending(o => o.CreatedAt)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task InvalidateAllForPhoneNumberAsync(string phoneNumber, CancellationToken cancellationToken = default)
    {
        var otps = await _dbSet
            .Where(o => o.PhoneNumber == phoneNumber && !o.IsUsed)
            .ToListAsync(cancellationToken);

        foreach (var otp in otps)
        {
            otp.IsUsed = true;
        }
    }
}
