using FamilyBank.Application.Interfaces;
using Microsoft.Extensions.Logging;

namespace FamilyBank.Infrastructure.Services;

/// <summary>
/// Mock SMS service cho development/demo
/// Production: thay bằng Twilio, Firebase, hoặc SMS gateway thực
/// </summary>
public class MockSmsService : ISmsService
{
    private readonly ILogger<MockSmsService> _logger;

    public MockSmsService(ILogger<MockSmsService> logger)
    {
        _logger = logger;
    }

    public Task SendOtpAsync(string phoneNumber, string code, CancellationToken cancellationToken = default)
    {
        // Log OTP ra console thay vì gửi SMS thật
        _logger.LogInformation("========================================");
        _logger.LogInformation("📱 MOCK SMS TO: {PhoneNumber}", phoneNumber);
        _logger.LogInformation("🔐 YOUR OTP CODE: {Code}", code);
        _logger.LogInformation("========================================");
        
        return Task.CompletedTask;
    }
}
