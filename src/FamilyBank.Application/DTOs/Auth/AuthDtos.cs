namespace FamilyBank.Application.DTOs.Auth;

public record SendOtpRequest(string PhoneNumber);

public record VerifyOtpRequest(string PhoneNumber, string Code, string? Name = null);

public record AuthResponse(
    string AccessToken,
    string RefreshToken,
    DateTime ExpiresAt,
    UserDto User
);

public record UserDto(
    Guid Id,
    string PhoneNumber,
    string Name,
    bool IsVerified
);
