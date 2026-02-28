using FamilyBank.Domain.Entities;

namespace FamilyBank.Application.Interfaces;

public interface ITokenService
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
    Guid? ValidateRefreshToken(string refreshToken);
    void StoreRefreshToken(string token, Guid userId, int expiryDays);
    void RevokeRefreshToken(string token);
}
