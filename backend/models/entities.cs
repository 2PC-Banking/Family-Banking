using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models
{
    public class Bank
    {
        public string bankcode { get; set; } = "";
        public string bankname { get; set; } = "";
    }

    public class Branch
    {
        public string branchid { get; set; } = "";
        public string bankcode { get; set; } = "";
        public string address { get; set; } = "";
    }

    public class Customer
    {
        public string customerid { get; set; } = "";
        public string? branchid { get; set; } = "";
        public string name { get; set; } = "";
              public string pass { get; set; } = ""; // Bắt buộc phải có để Login
        public string? address { get; set; } = "";
        public string phone { get; set; } = "";
  
    }

    public class Account
    {
        public string accountnumber { get; set; } = "";
        public string? customerid { get; set; } = "";
        public decimal balance { get; set; }
        public DateTime dateopened { get; set; }
        public decimal interestrate { get; set; }
        public decimal overdraftlimit { get; set; }
    }

    public class Transaction
    {
        public string transactionid { get; set; } = "";
        public string? accountnumber { get; set; } = "";
        public decimal amount { get; set; }
        public DateTime timestamp { get; set; }
        public string? type { get; set; } = "";
        public string? relatedaccount { get; set; } = "";
        public decimal postbalance { get; set; }
    }

    // ========== 2PC Transaction Journal ==========
    // Bảng lưu trạng thái local của mỗi global transaction (2PC participant state machine)
    public class TransactionJournal
    {
        [Key]
        public string transaction_id { get; set; } = "";   // ID duy nhất từ Coordinator
        public string phase_status { get; set; } = "INIT"; // INIT | PREPARED | COMMITTED | ABORTED
        public string operation { get; set; } = "";        // DEBIT | CREDIT
        public string account_id { get; set; } = "";       // accountnumber liên quan
        public decimal amount { get; set; }                // Số tiền
        public string? last_error { get; set; }            // Lưu lỗi cuối nếu có
        public DateTime created_at { get; set; } = DateTime.UtcNow;
        public DateTime updated_at { get; set; } = DateTime.UtcNow;
    }
}