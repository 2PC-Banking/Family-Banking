using FamilyBank.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FamilyBank.Infrastructure.Data;

public class FamilyBankDbContext : DbContext
{
    public FamilyBankDbContext(DbContextOptions<FamilyBankDbContext> options) 
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Account> Accounts => Set<Account>();
    public DbSet<Transaction> Transactions => Set<Transaction>();
    public DbSet<LedgerEntry> LedgerEntries => Set<LedgerEntry>();
    public DbSet<OtpCode> OtpCodes => Set<OtpCode>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.PhoneNumber).IsUnique();
            entity.Property(e => e.PhoneNumber).HasMaxLength(20).IsRequired();
            entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
        });

        // Account configuration
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.AccountNumber).IsUnique();
            entity.Property(e => e.AccountNumber).HasMaxLength(20).IsRequired();
            entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
            entity.Property(e => e.Currency).HasMaxLength(3).HasDefaultValue("VND");
            
            entity.HasOne(e => e.User)
                  .WithMany(u => u.Accounts)
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        // Transaction configuration
        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.ReferenceNumber).IsUnique();
            entity.HasIndex(e => e.IdempotencyKey).IsUnique().HasFilter("\"IdempotencyKey\" IS NOT NULL");
            
            entity.Property(e => e.ReferenceNumber).HasMaxLength(30).IsRequired();
            entity.Property(e => e.Amount).HasPrecision(18, 2);
            entity.Property(e => e.Currency).HasMaxLength(3).HasDefaultValue("VND");
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.IdempotencyKey).HasMaxLength(100);

            entity.HasOne(e => e.FromAccount)
                  .WithMany()
                  .HasForeignKey(e => e.FromAccountId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.ToAccount)
                  .WithMany()
                  .HasForeignKey(e => e.ToAccountId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        // LedgerEntry configuration (Double-entry bookkeeping)
        modelBuilder.Entity<LedgerEntry>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Amount).HasPrecision(18, 2);

            entity.HasOne(e => e.Transaction)
                  .WithMany(t => t.LedgerEntries)
                  .HasForeignKey(e => e.TransactionId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Account)
                  .WithMany(a => a.LedgerEntries)
                  .HasForeignKey(e => e.AccountId)
                  .OnDelete(DeleteBehavior.Restrict);

            // Index for calculating balance quickly
            entity.HasIndex(e => new { e.AccountId, e.EntryType });
        });

        // OtpCode configuration
        modelBuilder.Entity<OtpCode>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => new { e.PhoneNumber, e.ExpiresAt });
            entity.Property(e => e.PhoneNumber).HasMaxLength(20).IsRequired();
            entity.Property(e => e.Code).HasMaxLength(6).IsRequired();
        });
    }
}
