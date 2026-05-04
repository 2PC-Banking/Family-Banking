using Microsoft.AspNetCore.Mvc;
using backend.models; 
using backend.Data;   
using System.Linq;

namespace backend.controller
{
    [ApiController]
    [Route("api/history")] // Đổi Route cho ngắn gọn và đúng ngữ nghĩa
    public class HistoryController : ControllerBase
    {
        private readonly BankDbContext _context;

        public HistoryController(BankDbContext context)
        {
            _context = context;
        }

        [HttpGet("{accountnumber}")]
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