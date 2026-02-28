namespace FamilyBank.Application.DTOs.Transfer;

public record TransferRequest(
    string FromAccountNumber,
    string ToAccountNumber,
    decimal Amount,
    string? Description = null,
    string? IdempotencyKey = null
);

public record TransferResponse(
    string ReferenceNumber,
    string Status,
    decimal Amount,
    string Currency,
    string FromAccountNumber,
    string ToAccountNumber,
    DateTime CreatedAt
);

public record TransactionDto(
    Guid Id,
    string ReferenceNumber,
    string FromAccountNumber,
    string ToAccountNumber,
    decimal Amount,
    string Currency,
    string? Description,
    string Status,
    DateTime CreatedAt,
    DateTime? CompletedAt
);
