using FamilyBank.Domain.Entities;

namespace FamilyBank.Domain.Interfaces;

public interface IUserRepository : IRepository<User>
{
    Task<User?> GetByPhoneNumberAsync(string phoneNumber, CancellationToken cancellationToken = default);
}
