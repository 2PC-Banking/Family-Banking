using FamilyBank.Domain.Common;

namespace FamilyBank.Domain.Entities;

public class User : BaseEntity
{
    public string PhoneNumber { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public bool IsVerified { get; set; } = false;
    
    // Navigation
    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
}
