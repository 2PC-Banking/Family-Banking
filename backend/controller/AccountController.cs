using Microsoft.AspNetCore.Mvc;
using backend.models;
using backend.Data;

namespace backend.controller
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        private readonly BankDbContext _context;

        public AccountController(BankDbContext context)
        {
            _context = context;
        }

        // API Lấy thông tin tài khoản và số dư
        [HttpGet("balance/{accountnumber}")]
        public IActionResult GetBalance(string accountnumber)
        {
            var account = _context.Accounts.FirstOrDefault(a => a.accountnumber == accountnumber);
            
            if (account == null)
                return NotFound(new { message = "Không tìm thấy tài khoản" });

            return Ok(new { 
                accountnumber = account.accountnumber,
                balance = account.balance,
                dateopened = account.dateopened
            });
        }
    }
}