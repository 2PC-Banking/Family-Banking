using FamilyBank.Application.Common.Exceptions;
using FamilyBank.Application.DTOs.Auth;
using FamilyBank.Application.Interfaces;
using FamilyBank.Domain.Entities;
using FamilyBank.Domain.Interfaces;
using Microsoft.Extensions.Configuration;

namespace FamilyBank.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ITokenService _tokenService;
    private readonly ISmsService _smsService;
    private readonly IConfiguration _configuration;

    public AuthService(
        IUnitOfWork unitOfWork,
        ITokenService tokenService,
        ISmsService smsService,
        IConfiguration configuration)
    {
        _unitOfWork = unitOfWork;
        _tokenService = tokenService;
        _smsService = smsService;
        _configuration = configuration;
    }

    public async Task<bool> SendOtpAsync(SendOtpRequest request, CancellationToken cancellationToken = default)
    {
        var otpSettings = _configuration.GetSection("Otp");
        var codeLength = int.Parse(otpSettings["CodeLength"] ?? "6");
        var expiryMinutes = int.Parse(otpSettings["ExpiryMinutes"] ?? "5");

        // Invalidate old OTPs
        await _unitOfWork.OtpCodes.InvalidateAllForPhoneNumberAsync(request.PhoneNumber, cancellationToken);

        // Generate new OTP
        var code = GenerateOtpCode(codeLength);
        
        var otpCode = new OtpCode
        {
            PhoneNumber = request.PhoneNumber,
            Code = code,
            ExpiresAt = DateTime.UtcNow.AddMinutes(expiryMinutes)
        };

        await _unitOfWork.OtpCodes.AddAsync(otpCode, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        // Send OTP via SMS (mock in development)
        await _smsService.SendOtpAsync(request.PhoneNumber, code, cancellationToken);

        return true;
    }

    public async Task<AuthResponse> VerifyOtpAsync(VerifyOtpRequest request, CancellationToken cancellationToken = default)
    {
        var otpSettings = _configuration.GetSection("Otp");
        var maxAttempts = int.Parse(otpSettings["MaxAttempts"] ?? "3");

        // Get latest OTP
        var otpCode = await _unitOfWork.OtpCodes.GetLatestByPhoneNumberAsync(request.PhoneNumber, cancellationToken);

        if (otpCode == null)
        {
            throw new InvalidOtpException();
        }

        // Check attempts
        if (otpCode.AttemptCount >= maxAttempts)
        {
            otpCode.IsUsed = true;
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            throw new ValidationException("Quá số lần thử cho phép. Vui lòng yêu cầu mã OTP mới.");
        }

        // Verify code
        if (otpCode.Code != request.Code)
        {
            otpCode.AttemptCount++;
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            throw new InvalidOtpException();
        }

        // Mark OTP as used
        otpCode.IsUsed = true;
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        // Get or create user
        var user = await _unitOfWork.Users.GetByPhoneNumberAsync(request.PhoneNumber, cancellationToken);
        
        if (user == null)
        {
            // New user registration
            user = new User
            {
                PhoneNumber = request.PhoneNumber,
                Name = request.Name ?? $"User_{request.PhoneNumber[^4..]}",
                IsVerified = true
            };
            await _unitOfWork.Users.AddAsync(user, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
        else if (!user.IsVerified)
        {
            user.IsVerified = true;
            if (!string.IsNullOrEmpty(request.Name))
            {
                user.Name = request.Name;
            }
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }

        // Generate tokens
        var accessToken = _tokenService.GenerateAccessToken(user);
        var refreshToken = _tokenService.GenerateRefreshToken();
        
        var jwtSettings = _configuration.GetSection("Jwt");
        var refreshExpiryDays = int.Parse(jwtSettings["RefreshTokenExpiryDays"] ?? "7");
        var accessExpiryMinutes = int.Parse(jwtSettings["ExpiryMinutes"] ?? "60");
        
        _tokenService.StoreRefreshToken(refreshToken, user.Id, refreshExpiryDays);

        return new AuthResponse(
            AccessToken: accessToken,
            RefreshToken: refreshToken,
            ExpiresAt: DateTime.UtcNow.AddMinutes(accessExpiryMinutes),
            User: new UserDto(user.Id, user.PhoneNumber, user.Name, user.IsVerified)
        );
    }

    public async Task<AuthResponse> RefreshTokenAsync(string refreshToken, CancellationToken cancellationToken = default)
    {
        var userId = _tokenService.ValidateRefreshToken(refreshToken);
        
        if (userId == null)
        {
            throw new ValidationException("Invalid or expired refresh token");
        }

        var user = await _unitOfWork.Users.GetByIdAsync(userId.Value, cancellationToken);
        
        if (user == null)
        {
            throw new NotFoundException("User not found");
        }

        // Revoke old refresh token
        _tokenService.RevokeRefreshToken(refreshToken);

        // Generate new tokens
        var newAccessToken = _tokenService.GenerateAccessToken(user);
        var newRefreshToken = _tokenService.GenerateRefreshToken();
        
        var jwtSettings = _configuration.GetSection("Jwt");
        var refreshExpiryDays = int.Parse(jwtSettings["RefreshTokenExpiryDays"] ?? "7");
        var accessExpiryMinutes = int.Parse(jwtSettings["ExpiryMinutes"] ?? "60");
        
        _tokenService.StoreRefreshToken(newRefreshToken, user.Id, refreshExpiryDays);

        return new AuthResponse(
            AccessToken: newAccessToken,
            RefreshToken: newRefreshToken,
            ExpiresAt: DateTime.UtcNow.AddMinutes(accessExpiryMinutes),
            User: new UserDto(user.Id, user.PhoneNumber, user.Name, user.IsVerified)
        );
    }

    private static string GenerateOtpCode(int length)
    {
        var random = new Random();
        var code = string.Empty;
        
        for (int i = 0; i < length; i++)
        {
            code += random.Next(0, 10).ToString();
        }
        
        return code;
    }
}
