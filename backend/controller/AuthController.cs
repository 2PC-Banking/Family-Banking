using Microsoft.AspNetCore.Mvc;
using backend.models; // Đổi Models thành models
using backend.Data;   // Đảm bảo có dòng này nếu cần gọi DbContext

namespace backend.controller // Theo tên thư mục của bạn
{
    [ApiController]
    [Route("api/auth")] // Đường dẫn sẽ là api/auth/login
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
            var user = _context.Customers
                .FirstOrDefault(u => u.username == request.username && u.pass == request.pass);

            if (user == null)
                return Unauthorized(new { message = "Sai tài khoản hoặc mật khẩu" });

            return Ok(new { 
                customerId = user.customerid, 
                name = user.name,
                message = "Đăng nhập thành công" 
            });
        }
    }

    public class LoginRequest 
    {
        public string username { get; set; } = String.Empty;
        public string pass { get; set; } = String.Empty;
    }
}