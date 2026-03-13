using Microsoft.EntityFrameworkCore;
using backend.models; // Import từ models viết thường

namespace backend.Data
{
    public class BankDbContext : DbContext
    {
        public BankDbContext(DbContextOptions<BankDbContext> options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map tên bảng trong Postgres (nên để tên bảng viết thường cho an toàn)
            modelBuilder.Entity<Customer>().ToTable("customer").HasKey(c => c.customerid);
            modelBuilder.Entity<Transaction>().ToTable("transaction").HasKey(t => t.transactionid);
        }
    }
}