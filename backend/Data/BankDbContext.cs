using Microsoft.EntityFrameworkCore;
using backend.models; // Import từ models viết thường

namespace backend.Data
{
    public class BankDbContext : DbContext
    {
        public BankDbContext(DbContextOptions<BankDbContext> options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Account> Accounts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map tên bảng trong Postgres (nên để tên bảng viết thường cho an toàn)
            modelBuilder.Entity<Customer>().ToTable("customer").HasKey(c => c.customerid);
            modelBuilder.Entity<Transaction>().ToTable("transaction").HasKey(t => t.transactionid);
            
            // Đưa phần cấu hình Account VÀO BÊN TRONG hàm OnModelCreating
            modelBuilder.Entity<Account>(entity => {
                entity.ToTable("account");
                entity.HasKey(e => e.accountnumber);
                // Ép tên cột viết thường để không bị lỗi 42703 trên PostgreSQL
                entity.Property(e => e.accountnumber).HasColumnName("accountnumber");
                entity.Property(e => e.customerid).HasColumnName("customerid");
                entity.Property(e => e.balance).HasColumnName("balance");
                entity.Property(e => e.dateopened).HasColumnName("dateopened");
                entity.Property(e => e.interestrate).HasColumnName("interestrate");
                entity.Property(e => e.overdraftlimit).HasColumnName("overdraftlimit");
            });
        } 
    }
}