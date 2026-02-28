using System.Security.Claims;
using FamilyBank.Application.Common.Exceptions;
using FamilyBank.Application.DTOs.Transfer;
using FamilyBank.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FamilyBank.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TransfersController : ControllerBase
{
    private readonly ITransferService _transferService;
    private readonly ILogger<TransfersController> _logger;

    public TransfersController(ITransferService transferService, ILogger<TransfersController> logger)
    {
        _transferService = transferService;
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
    /// Thực hiện chuyển tiền giữa 2 tài khoản
    /// </summary>
    /// <remarks>
    /// Sử dụng IdempotencyKey trong header để tránh xử lý duplicate khi retry
    /// </remarks>
    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<TransferResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Transfer(
        [FromBody] TransferRequest request,
        [FromHeader(Name = "Idempotency-Key")] string? idempotencyKey,
        CancellationToken cancellationToken)
    {
        try
        {
            var userId = GetUserId();
            
            // Use header idempotency key if body doesn't have one
            var transferRequest = request with 
            { 
                IdempotencyKey = request.IdempotencyKey ?? idempotencyKey 
            };

            var result = await _transferService.TransferAsync(userId, transferRequest, cancellationToken);
            
            return Ok(ApiResponse<TransferResponse>.Success(result, "Chuyển tiền thành công"));
        }
        catch (DuplicateTransactionException ex)
        {
            // 409 Conflict for duplicate idempotent request
            return Conflict(new ApiResponse<object>
            {
                IsSuccess = false,
                Message = ex.Message,
                ErrorCode = ex.ErrorCode,
                Data = new { ReferenceNumber = ex.ReferenceNumber }
            });
        }
        catch (InsufficientBalanceException ex)
        {
            return BadRequest(ApiResponse<object>.Error(ex.Message, ex.ErrorCode));
        }
        catch (AccountFrozenException ex)
        {
            return BadRequest(ApiResponse<object>.Error(ex.Message, ex.ErrorCode));
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
    /// Lấy thông tin giao dịch theo mã tham chiếu
    /// </summary>
    [HttpGet("{referenceNumber}")]
    [ProducesResponseType(typeof(ApiResponse<TransactionDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetTransaction(string referenceNumber, CancellationToken cancellationToken)
    {
        var result = await _transferService.GetTransactionAsync(referenceNumber, cancellationToken);
        
        if (result == null)
        {
            return NotFound(ApiResponse<object>.Error("Giao dịch không tồn tại", "NOT_FOUND"));
        }

        return Ok(ApiResponse<TransactionDto>.Success(result));
    }

    /// <summary>
    /// Lấy lịch sử giao dịch của tài khoản
    /// </summary>
    [HttpGet("history/{accountId:guid}")]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<TransactionDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetTransactionHistory(
        Guid accountId,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        var result = await _transferService.GetTransactionHistoryAsync(accountId, page, pageSize, cancellationToken);
        return Ok(ApiResponse<IEnumerable<TransactionDto>>.Success(result));
    }
}
