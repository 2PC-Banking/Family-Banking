using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.models; 
using backend.Data;   
using System;
using System.Threading.Tasks;

namespace backend.controller // Lưu ý: Viết thường nếu thư mục của bạn là 'controller'
{
    [ApiController]
    [Route("api/transfer")]
    public class TransferController : ControllerBase
    {
        private readonly BankDbContext _context;

        public TransferController(BankDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> TransferMoney([FromBody] TransferRequest request)
        {
            // 1. Kiểm tra đầu vào cơ bản
            if (request.Amount <= 0)
                return BadRequest(new { message = "Số tiền chuyển phải lớn hơn 0" });

            if (request.FromAccount == request.ToAccount)
                return BadRequest(new { message = "Không thể tự chuyển tiền cho chính mình" });

            // 2. MỞ TRANSACTION DATABASE (Bảo đảm tính Atomicity - Nguyên tử)
            // Bước này cực kỳ quan trọng để chuẩn bị cho các hệ thống phân tán phức tạp hơn sau này
            using var transaction = await _context.Database.BeginTransactionAsync();
            
            try
            {
                // Sử dụng ForUpdate() hoặc cơ chế khóa (lock) nếu môi trường có concurrency cao.
                // Tạm thời ở mức cơ bản, ta query bình thường.
                var sender = await _context.Accounts
                    .FirstOrDefaultAsync(a => a.accountnumber == request.FromAccount);
                
                var receiver = await _context.Accounts
                    .FirstOrDefaultAsync(a => a.accountnumber == request.ToAccount);

                if (sender == null) return NotFound(new { message = "Tài khoản gửi không tồn tại" });
                if (receiver == null) return NotFound(new { message = "Tài khoản nhận không tồn tại" });

                if (sender.balance < request.Amount)
                    return BadRequest(new { message = "Số dư không đủ để thực hiện giao dịch" });

                // 3. Thực hiện nghiệp vụ trừ/cộng tiền
                sender.balance -= request.Amount;
                receiver.balance += request.Amount;

                // 4. Ghi Lịch sử giao dịch (Transaction Log)
                var timeNow = DateTime.UtcNow; // PostgreSQL khuyên dùng UTC
                var baseTransId = Guid.NewGuid().ToString("N").Substring(0, 10).ToUpper(); 

                var logSender = new Transaction {
                    transactionid = "TX_" + baseTransId + "_OUT",
                    accountnumber = sender.accountnumber,
                    amount = -request.Amount, // Tiền ra thì mang dấu âm
                    timestamp = timeNow,
                    type = "ChuyenTien",
                    relatedaccount = receiver.accountnumber,
                    postbalance = sender.balance
                };

                var logReceiver = new Transaction {
                    transactionid = "TX_" + baseTransId + "_IN",
                    accountnumber = receiver.accountnumber,
                    amount = request.Amount, // Tiền vào mang dấu dương
                    timestamp = timeNow,
                    type = "NhanTien",
                    relatedaccount = sender.accountnumber,
                    postbalance = receiver.balance
                };

                await _context.Transactions.AddAsync(logSender);
                await _context.Transactions.AddAsync(logReceiver);

                // 5. Lưu thay đổi vào Database
                await _context.SaveChangesAsync();

                // 6. Chốt giao dịch (Phase 2: Commit)
                await transaction.CommitAsync();

                return Ok(new { 
                    message = "Chuyển tiền thành công!", 
                    amount = request.Amount,
                    transactionId = "TX_" + baseTransId, // Trả về mã để hiển thị trên app
                    timestamp = timeNow
                });
            }
            catch (Exception ex)
            {
                // Nếu có bất kỳ lỗi nào (kể cả sập server giữa chừng), rollback lại toàn bộ
                await transaction.RollbackAsync();
                
                // Trả về lỗi server (Code 500)
                return StatusCode(500, new { message = "Lỗi hệ thống khi xử lý giao dịch", error = ex.Message });
            }
        }
    }

    // Lớp hứng dữ liệu từ React Native gửi lên (DTO)
    public class TransferRequest
    {
        public string FromAccount { get; set; } = "";
        public string ToAccount { get; set; } = "";
        public decimal Amount { get; set; }
        public string Note { get; set; } = ""; // Có thể thêm trường Note nếu muốn lưu nội dung
    }
}