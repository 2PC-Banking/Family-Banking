using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;

namespace backend.controller
{
    [ApiController]
    [Route("api/otp")]
    public class OtpController : ControllerBase
    {
        private readonly IMemoryCache _cache;

        public OtpController(IMemoryCache cache)
        {
            _cache = cache;
        }

        [HttpPost("request")]
        public IActionResult RequestOtp([FromBody] OtpRequest request)
        {
            // 1. Sinh ngẫu nhiên 6 số
            string otpCode = new Random().Next(100000, 999999).ToString();

            // 2. Lưu vào Cache với Key là {AccountNumber}_OTP, thời gian hết hạn là 2 phút
            _cache.Set(request.AccountNumber + "_OTP", otpCode, TimeSpan.FromMinutes(2));

            // 3. GIẢ LẬP GỬI SMS (In ra màn hình console của C#)
            Console.WriteLine("\n=======================================");
            Console.WriteLine($"[SMS GATEWAY] Ting Ting! Gửi SMS đến chủ tài khoản {request.AccountNumber}");
            Console.WriteLine($"Nội dung: Ma OTP xac thuc chuyen tien cua ban la {otpCode}. Hieu luc trong 2 phut.");
            Console.WriteLine("=======================================\n");

            return Ok(new { message = "Đã gửi mã OTP thành công" });
        }
    }

    public class OtpRequest 
    { 
        public string AccountNumber { get; set; } = ""; 
    }
}