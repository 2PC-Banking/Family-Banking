using FamilyBank.Application.DTOs.Account;

namespace FamilyBank.Application.Interfaces;

public interface IAccountService
{
    Task<AccountDto> CreateAccountAsync(Guid userId, CreateAccountRequest request, CancellationToken cancellationToken = default);
    Task<AccountDto?> GetAccountAsync(Guid accountId, CancellationToken cancellationToken = default);
    Task<IEnumerable<AccountDto>> GetUserAccountsAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<decimal> GetBalanceAsync(Guid accountId, CancellationToken cancellationToken = default);
}
