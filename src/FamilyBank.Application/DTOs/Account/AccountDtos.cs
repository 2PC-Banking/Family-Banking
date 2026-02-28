namespace FamilyBank.Application.DTOs.Account;

public record CreateAccountRequest(string Name, string Currency = "VND");

public record AccountDto(
    Guid Id,
    string AccountNumber,
    string Name,
    string Currency,
    decimal Balance,
    string Status,
    DateTime CreatedAt
);
