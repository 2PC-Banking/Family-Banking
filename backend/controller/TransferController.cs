using Microsoft.AspNetCore.Mvc;
using backend.models; 
using backend.Data;   
using System;
using System.Linq;

namespace backend.controller
{
    [ApiController]
    [Route("api/transfer")] // Route riêng biệt cho việc chuyển tiền
    public class TransferController : ControllerBase
    {
        private readonly BankDbContext _context;

        public TransferController(BankDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult TransferMoney([FromBody] TransferRequest request)
        {
            // 1. Kiểm tra đầu vào cơ bản
            if (request.Amount <= 0)
                return BadRequest(new { message = "Số tiền chuyển phải lớn hơn 0" });

            if (request.FromAccount == request.ToAccount)
                return BadRequest(new { message = "Không thể tự chuyển tiền cho chính mình" });

            // 2. MỞ TRANSACTION DATABASE 
            using var transaction = _context.Database.BeginTransaction();
            
            try
            {
                var sender = _context.Accounts.FirstOrDefault(a => a.accountnumber == request.FromAccount);
                var receiver = _context.Accounts.FirstOrDefault(a => a.accountnumber == request.ToAccount);

                if (sender == null) return NotFound(new { message = "Tài khoản gửi không tồn tại" });
                if (receiver == null) return NotFound(new { message = "Tài khoản nhận không tồn tại" });

                if (sender.balance < request.Amount)
                    return BadRequest(new { message = "Số dư không đủ để chuyển tiền" });

                // Trừ tiền / Cộng tiền
                sender.balance -= request.Amount;
                receiver.balance += request.Amount;

                // Ghi Lịch sử
                var timeNow = DateTime.UtcNow;
                var transId = Guid.NewGuid().ToString().Substring(0, 8); 

                var logSender = new Transaction {
                    transactionid = "TX_" + transId + "_OUT",
                    accountnumber = sender.accountnumber,
                    amount = -request.Amount,
                    timestamp = timeNow,
                    type = "ChuyenTien",
                    relatedaccount = receiver.accountnumber,
                    postbalance = sender.balance
                };

                var logReceiver = new Transaction {
                    transactionid = "TX_" + transId + "_IN",
                    accountnumber = receiver.accountnumber,
                    amount = request.Amount, 
                    timestamp = timeNow,
                    type = "NhanTien",
                    relatedaccount = sender.accountnumber,
                    postbalance = receiver.balance
                };

                _context.Transactions.Add(logSender);
                _context.Transactions.Add(logReceiver);

                // Lưu thay đổi
                _context.SaveChanges();

                // Chốt giao dịch
                transaction.Commit();

                return Ok(new { message = "Chuyển tiền thành công!", amount = request.Amount });
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return StatusCode(500, new { message = "Lỗi hệ thống khi chuyển tiền", error = ex.Message });
            }
        }
    }

    // Class hứng dữ liệu (DTO)
    public class TransferRequest
    {
        public string FromAccount { get; set; } = "";
        public string ToAccount { get; set; } = "";
        public decimal Amount { get; set; }
    }
}