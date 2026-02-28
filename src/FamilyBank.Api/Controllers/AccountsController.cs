using System.Security.Claims;
using FamilyBank.Application.Common.Exceptions;
using FamilyBank.Application.DTOs.Account;
using FamilyBank.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FamilyBank.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AccountsController : ControllerBase
{
    private readonly IAccountService _accountService;
    private readonly ILogger<AccountsController> _logger;

    public AccountsController(IAccountService accountService, ILogger<AccountsController> logger)
    {
        _accountService = accountService;
        _logger = logger;
    }

    private Guid GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
        {
            throw new ValidationException("Invalid user token");
        }
        return userId;
    }

    /// <summary>
    /// Tạo tài khoản ngân hàng mới
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<AccountDto>), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateAccount([FromBody] CreateAccountRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var userId = GetUserId();
            var result = await _accountService.CreateAccountAsync(userId, request, cancellationToken);
            return CreatedAtAction(nameof(GetAccount), new { id = result.Id }, ApiResponse<AccountDto>.Success(result, "Tạo tài khoản thành công"));
        }
        catch (NotFoundException ex)
        {
            return NotFound(ApiResponse<object>.Error(ex.Message, ex.ErrorCode));
        }
        catch (ValidationException ex)
        {
            return BadRequest(ApiResponse<object>.Error(ex.Message, ex.ErrorCode));
        }
    }

    /// <summary>
    /// Lấy thông tin tài khoản theo ID
    /// </summary>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(ApiResponse<AccountDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetAccount(Guid id, CancellationToken cancellationToken)
    {
        var result = await _accountService.GetAccountAsync(id, cancellationToken);
        
        if (result == null)
        {
            return NotFound(ApiResponse<object>.Error("Tài khoản không tồn tại", "NOT_FOUND"));
        }

        return Ok(ApiResponse<AccountDto>.Success(result));
    }

    /// <summary>
    /// Lấy danh sách tài khoản của người dùng hiện tại
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<AccountDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetMyAccounts(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        var result = await _accountService.GetUserAccountsAsync(userId, cancellationToken);
        return Ok(ApiResponse<IEnumerable<AccountDto>>.Success(result));
    }

    /// <summary>
    /// Lấy số dư tài khoản
    /// </summary>
    [HttpGet("{id:guid}/balance")]
    [ProducesResponseType(typeof(ApiResponse<decimal>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetBalance(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            var balance = await _accountService.GetBalanceAsync(id, cancellationToken);
            return Ok(ApiResponse<decimal>.Success(balance));
        }
        catch (NotFoundException ex)
        {
            return NotFound(ApiResponse<object>.Error(ex.Message, ex.ErrorCode));
        }
    }
}
