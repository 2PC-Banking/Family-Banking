using FamilyBank.Application.DTOs.Auth;

namespace FamilyBank.Application.Interfaces;

public interface IAuthService
{
    Task<bool> SendOtpAsync(SendOtpRequest request, CancellationToken cancellationToken = default);
    Task<AuthResponse> VerifyOtpAsync(VerifyOtpRequest request, CancellationToken cancellationToken = default);
    Task<AuthResponse> RefreshTokenAsync(string refreshToken, CancellationToken cancellationToken = default);
}
