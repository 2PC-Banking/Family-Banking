using Microsoft.AspNetCore.Mvc;
using backend.models; 
using backend.Data;   
using System.Linq;

namespace backend.controller 
{
    [ApiController]
    [Route("api/auth")] 
    public class AuthController : ControllerBase
    {
        private readonly BankDbContext _context;

        public AuthController(BankDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // 1. Tìm User trong bảng Customers dựa vào số điện thoại và mật khẩu
            var user = _context.Customers
                .FirstOrDefault(u => u.phone == request.phone && u.pass == request.pass);

            // Nếu không tìm thấy ai khớp -> báo lỗi
            if (user == null)
            {
                return Unauthorized(new { message = "Sai số điện thoại hoặc mật khẩu" });
            }

            // 2. Nếu đăng nhập đúng, tìm Account của User này để lấy số tài khoản
            var account = _context.Accounts.FirstOrDefault(a => a.customerid == user.customerid);

            // 3. Trả về thông tin cho React Native
            return Ok(new { 
                customerId = user.customerid, 
                name = user.name,
                accountnumber = account?.accountnumber ?? "", // Trả về thêm Account Number
                message = "Đăng nhập thành công" 
            });
        }
    }

    public class LoginRequest 
    {
        public string phone { get; set; } = string.Empty;
        public string pass { get; set; } = string.Empty;
    }
}   