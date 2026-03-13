namespace backend.models // Lưu ý: models viết thường theo tên thư mục của bạn
{
    public class Customer
    {
        public string customerid { get; set; } = "";
        public string name { get; set; } = "";
        public string username { get; set; } = "";
        public string pass { get; set; } = "";
    }

    public class Transaction
    {
        public string transactionid { get; set; } = "";
        public string accountnumber { get; set; } = "";
        public decimal amount { get; set; }
        public DateTime timestamp { get; set; }
        public string type { get; set; } = "";
        public string? relatedaccount { get; set; } = "";
        public decimal postbalance { get; set; }
    }
}