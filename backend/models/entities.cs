using System;

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
}