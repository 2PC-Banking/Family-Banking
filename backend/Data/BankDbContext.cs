using Microsoft.EntityFrameworkCore;
using backend.models;

namespace backend.Data
{
    public class BankDbContext : DbContext
    {
        public BankDbContext(DbContextOptions<BankDbContext> options) : base(options) { }

        // Khai báo 5 bảng
        public DbSet<Bank> Banks { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 1. Ép tên bảng về chữ thường (để khớp chuẩn PostgreSQL)
            // Bỏ qua bước này nếu bạn đã chủ động viết hoa tên bảng trong lúc tạo (vd: CREATE TABLE "Bank")
            modelBuilder.Entity<Bank>().ToTable("bank");
            modelBuilder.Entity<Branch>().ToTable("branch");
            modelBuilder.Entity<Customer>().ToTable("customer");
            modelBuilder.Entity<Account>().ToTable("account");
            modelBuilder.Entity<Transaction>().ToTable("transaction");

            // 2. Chỉ định Khóa chính (Primary Key)
            modelBuilder.Entity<Bank>().HasKey(b => b.bankcode);
            modelBuilder.Entity<Branch>().HasKey(br => br.branchid);
            modelBuilder.Entity<Customer>().HasKey(c => c.customerid);
            modelBuilder.Entity<Account>().HasKey(a => a.accountnumber);
            modelBuilder.Entity<Transaction>().HasKey(t => t.transactionid);

            // 3. (Tùy chọn) Khai báo rõ Khóa ngoại để LINQ query dễ hơn nếu sau này cần Include
            modelBuilder.Entity<Branch>()
                .HasOne<Bank>()
                .WithMany()
                .HasForeignKey(br => br.bankcode);

            modelBuilder.Entity<Customer>()
                .HasOne<Branch>()
                .WithMany()
                .HasForeignKey(c => c.branchid);

            modelBuilder.Entity<Account>()
                .HasOne<Customer>()
                .WithMany()
                .HasForeignKey(a => a.customerid);

            modelBuilder.Entity<Transaction>()
                .HasOne<Account>()
                .WithMany()
                .HasForeignKey(t => t.accountnumber);
        }
    }
}