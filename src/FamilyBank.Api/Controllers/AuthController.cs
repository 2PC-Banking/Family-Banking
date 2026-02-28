using FamilyBank.Application.Common.Exceptions;
using FamilyBank.Application.DTOs.Auth;
using FamilyBank.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FamilyBank.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    /// <summary>
    /// Gửi mã OTP đến số điện thoại
    /// </summary>
    [HttpPost("send-otp")]
    [ProducesResponseType(typeof(ApiResponse<bool>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> SendOtp([FromBody] SendOtpRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var result = await _authService.SendOtpAsync(request, cancellationToken);
            return Ok(ApiResponse<bool>.Success(result, "Mã OTP đã được gửi đến số điện thoại của bạn"));
        }
        catch (ValidationException ex)
        {
            return BadRequest(ApiResponse<object>.Error(ex.Message, ex.ErrorCode));
        }
    }

    /// <summary>
    /// Xác thực OTP và đăng nhập/đăng ký
    /// </summary>
    [HttpPost("verify-otp")]
    [ProducesResponseType(typeof(ApiResponse<AuthResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var result = await _authService.VerifyOtpAsync(request, cancellationToken);
            return Ok(ApiResponse<AuthResponse>.Success(result, "Đăng nhập thành công"));
        }
        catch (InvalidOtpException ex)
        {
            return BadRequest(ApiResponse<object>.Error(ex.Message, ex.ErrorCode));
        }
        catch (ValidationException ex)
        {
            return BadRequest(ApiResponse<object>.Error(ex.Message, ex.ErrorCode));
        }
    }

    /// <summary>
    /// Làm mới access token bằng refresh token
    /// </summary>
    [HttpPost("refresh")]
    [ProducesResponseType(typeof(ApiResponse<AuthResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var result = await _authService.RefreshTokenAsync(request.RefreshToken, cancellationToken);
            return Ok(ApiResponse<AuthResponse>.Success(result, "Token đã được làm mới"));
        }
        catch (ValidationException ex)
        {
            return BadRequest(ApiResponse<object>.Error(ex.Message, ex.ErrorCode));
        }
        catch (NotFoundException ex)
        {
            return NotFound(ApiResponse<object>.Error(ex.Message, ex.ErrorCode));
        }
    }
}

public record RefreshTokenRequest(string RefreshToken);

/// <summary>
/// Standard API response wrapper
/// </summary>
public class ApiResponse<T>
{
    public bool IsSuccess { get; set; }
    public string Message { get; set; } = string.Empty;
    public string? ErrorCode { get; set; }
    public T? Data { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    public static ApiResponse<T> Success(T data, string message = "Success")
    {
        return new ApiResponse<T>
        {
            IsSuccess = true,
            Message = message,
            Data = data
        };
    }

    public static ApiResponse<T> Error(string message, string? errorCode = null)
    {
        return new ApiResponse<T>
        {
            IsSuccess = false,
            Message = message,
            ErrorCode = errorCode
        };
    }
}
