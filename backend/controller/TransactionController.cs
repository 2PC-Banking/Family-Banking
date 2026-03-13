using Microsoft.AspNetCore.Mvc;
using backend.models; // Đổi Models thành models
using backend.Data;   // Đảm bảo có dòng này nếu cần gọi DbContext

namespace backend.controller
{
    [ApiController]
    [Route("api/transactions")] // Đường dẫn sẽ là api/transactions/history/...
    public class TransactionController : ControllerBase
    {
        private readonly BankDbContext _context;

        public TransactionController(BankDbContext context)
        {
            _context = context;
        }

        [HttpGet("history/{accountnumber}")]
        public IActionResult GetHistory(string accountnumber)
        {
            var history = _context.Transactions
                .Where(t => t.accountnumber == accountnumber)
                .OrderByDescending(t => t.timestamp)
                .ToList();

            if (history == null || history.Count == 0)
                return NotFound(new { message = "Không tìm thấy lịch sử giao dịch" });

            return Ok(history);
        }
    }
}