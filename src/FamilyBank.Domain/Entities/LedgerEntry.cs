using FamilyBank.Domain.Common;
using FamilyBank.Domain.Enums;

namespace FamilyBank.Domain.Entities;

/// <summary>
/// Double-entry bookkeeping - Sổ cái kép
/// Mỗi giao dịch tạo 2 entries: 1 Debit (tiền ra) và 1 Credit (tiền vào)
/// </summary>
public class LedgerEntry : BaseEntity
{
    public Guid TransactionId { get; set; }
    public Guid AccountId { get; set; }
    public LedgerEntryType EntryType { get; set; }
    public decimal Amount { get; set; }
    
    // Navigation
    public virtual Transaction Transaction { get; set; } = null!;
    public virtual Account Account { get; set; } = null!;
}
