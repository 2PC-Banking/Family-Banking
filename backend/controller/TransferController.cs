using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using backend.models; 
using backend.Data;   
using System;
using System.Threading.Tasks;

namespace backend.controller 
{
    [ApiController]
    [Route("api/transfer")]
    public class TransferController : ControllerBase
    {
        private readonly BankDbContext _context;
        private readonly IMemoryCache _cache; // Thêm Cache

        public TransferController(BankDbContext context, IMemoryCache cache)
        {
            _context = context;
            _cache = cache;
        }

        [HttpPost]
        public async Task<IActionResult> TransferMoney([FromBody] TransferRequest request)
        {
            // --- 1. KIỂM TRA OTP TRƯỚC TIÊN ---
            if (!_cache.TryGetValue(request.FromAccount + "_OTP", out string? savedOtp) || savedOtp != request.OtpCode)
            {
                return BadRequest(new { message = "Mã OTP không chính xác hoặc đã hết hạn (quá 2 phút)!" });
            }

            // Xóa OTP khỏi cache để không bị dùng lại lần 2 (Chống Replay Attack)
            _cache.Remove(request.FromAccount + "_OTP");

            // --- 2. KIỂM TRA ĐẦU VÀO CƠ BẢN ---
            if (request.Amount <= 0)
                return BadRequest(new { message = "Số tiền chuyển phải lớn hơn 0" });

            if (request.FromAccount == request.ToAccount)
                return BadRequest(new { message = "Không thể tự chuyển tiền cho chính mình" });

            // --- 3. MỞ TRANSACTION DATABASE VÀ CHUYỂN TIỀN ---
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var sender = await _context.Accounts.FirstOrDefaultAsync(a => a.accountnumber == request.FromAccount);
                var receiver = await _context.Accounts.FirstOrDefaultAsync(a => a.accountnumber == request.ToAccount);

                if (sender == null) return NotFound(new { message = "Tài khoản gửi không tồn tại" });
                if (receiver == null) return NotFound(new { message = "Tài khoản nhận không tồn tại" });
                if (sender.balance < request.Amount) return BadRequest(new { message = "Số dư không đủ để thực hiện giao dịch" });

                // Trừ/cộng tiền
                sender.balance -= request.Amount;
                receiver.balance += request.Amount;

                // Ghi Lịch sử giao dịch (Transaction Log)
                var timeNow = DateTime.UtcNow; 
                var baseTransId = Guid.NewGuid().ToString("N").Substring(0, 10).ToUpper(); 

                var logSender = new Transaction {
                    transactionid = "TX_" + baseTransId + "_OUT", accountnumber = sender.accountnumber,
                    amount = -request.Amount, timestamp = timeNow, type = "ChuyenTien",
                    relatedaccount = receiver.accountnumber, postbalance = sender.balance
                };

                var logReceiver = new Transaction {
                    transactionid = "TX_" + baseTransId + "_IN", accountnumber = receiver.accountnumber,
                    amount = request.Amount, timestamp = timeNow, type = "NhanTien",
                    relatedaccount = sender.accountnumber, postbalance = receiver.balance
                };

                await _context.Transactions.AddAsync(logSender);
                await _context.Transactions.AddAsync(logReceiver);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new { 
                    message = "Chuyển tiền thành công!", amount = request.Amount,
                    transactionId = "TX_" + baseTransId, timestamp = timeNow
                });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, new { message = "Lỗi hệ thống khi xử lý giao dịch", error = ex.Message });
            }
        }
    }

    // Cập nhật DTO để nhận thêm OtpCode từ React Native
    public class TransferRequest
    {
        public string FromAccount { get; set; } = "";
        public string ToAccount { get; set; } = "";
        public decimal Amount { get; set; }
        public string Note { get; set; } = ""; 
        public string OtpCode { get; set; } = ""; // THÊM DÒNG NÀY
    }
}