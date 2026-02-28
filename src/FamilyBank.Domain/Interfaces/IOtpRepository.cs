using FamilyBank.Domain.Entities;

namespace FamilyBank.Domain.Interfaces;

public interface IOtpRepository : IRepository<OtpCode>
{
    Task<OtpCode?> GetLatestByPhoneNumberAsync(string phoneNumber, CancellationToken cancellationToken = default);
    Task InvalidateAllForPhoneNumberAsync(string phoneNumber, CancellationToken cancellationToken = default);
}
