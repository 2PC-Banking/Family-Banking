using FamilyBank.Domain.Common;
using FamilyBank.Domain.Enums;

namespace FamilyBank.Domain.Entities;

public class Transaction : BaseEntity
{
    public string ReferenceNumber { get; set; } = string.Empty;  // Mã giao dịch unique
    public Guid FromAccountId { get; set; }
    public Guid ToAccountId { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "VND";
    public string? Description { get; set; }
    public TransactionStatus Status { get; set; } = TransactionStatus.Pending;
    public string? IdempotencyKey { get; set; }  // Tránh duplicate transaction
    public DateTime? CompletedAt { get; set; }
    
    // Navigation
    public virtual Account FromAccount { get; set; } = null!;
    public virtual Account ToAccount { get; set; } = null!;
    public virtual ICollection<LedgerEntry> LedgerEntries { get; set; } = new List<LedgerEntry>();
}
