using FamilyBank.Domain.Common;
using FamilyBank.Domain.Enums;

namespace FamilyBank.Domain.Entities;

public class Account : BaseEntity
{
    public Guid UserId { get; set; }
    public string AccountNumber { get; set; } = string.Empty; // e.g., "FAM-XXXXXX"
    public string Name { get; set; } = string.Empty;          // e.g., "Tài khoản chính"
    public string Currency { get; set; } = "VND";
    public AccountStatus Status { get; set; } = AccountStatus.Active;
    
    // Balance is calculated from ledger entries (không lưu trực tiếp)
    // Balance = SUM(Credit) - SUM(Debit)
    
    // Navigation
    public virtual User User { get; set; } = null!;
    public virtual ICollection<LedgerEntry> LedgerEntries { get; set; } = new List<LedgerEntry>();
}
