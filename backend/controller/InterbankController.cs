using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace backend.controller
{
    [ApiController]
    [Route("api/interbank")]
    public class InterbankController : ControllerBase
    {
        private static readonly JsonSerializerOptions JsonOptions = new()
        {
            PropertyNameCaseInsensitive = true
        };

        private readonly IMemoryCache _cache;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;

        public InterbankController(
            IMemoryCache cache,
            IHttpClientFactory httpClientFactory,
            IConfiguration config)
        {
            _cache = cache;
            _httpClientFactory = httpClientFactory;
            _config = config;
        }

        [HttpPost("transfer-2pc")]
        public async Task<IActionResult> Transfer2Pc([FromBody] InterbankTransferRequest request)
        {
            if (!_cache.TryGetValue(request.FromAccount + "_OTP", out string? savedOtp) || savedOtp != request.OtpCode)
                return BadRequest(new { message = "Ma OTP khong chinh xac hoac da het han." });

            if (request.Amount <= 0)
                return BadRequest(new { message = "So tien chuyen phai lon hon 0." });

            if (string.IsNullOrWhiteSpace(request.FromAccount) || string.IsNullOrWhiteSpace(request.ToAccount))
                return BadRequest(new { message = "Tai khoan nguon va tai khoan dich la bat buoc." });

            _cache.Remove(request.FromAccount + "_OTP");

            var clientTxId = string.IsNullOrWhiteSpace(request.ClientTxId)
                ? $"MOB-FAMILY-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}"
                : request.ClientTxId.Trim();

            var coordinatorRequest = BuildCoordinatorRequest(request, clientTxId);
            var client = _httpClientFactory.CreateClient();
            var coordinatorBaseUrl = GetConfig("JAVA_COORDINATOR_BASE_URL", "http://localhost:8002");

            try
            {
                var initial = await PostCoordinatorTransfer(client, coordinatorBaseUrl, coordinatorRequest);
                var final = await PollCoordinatorStatus(client, coordinatorBaseUrl, initial.TransactionId, initial);

                return Ok(ToMobileResponse(final, request, clientTxId));
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(502, new { message = "Khong ket noi duoc Java Coordinator.", error = ex.Message });
            }
            catch (TaskCanceledException)
            {
                return StatusCode(504, new { message = "Qua thoi gian cho Java Coordinator phan hoi." });
            }
        }

        [HttpGet("transfer-2pc/{transactionId}")]
        public async Task<IActionResult> GetTransferStatus(string transactionId)
        {
            var client = _httpClientFactory.CreateClient();
            var coordinatorBaseUrl = GetConfig("JAVA_COORDINATOR_BASE_URL", "http://localhost:8002");

            try
            {
                var status = await GetCoordinatorStatus(client, coordinatorBaseUrl, transactionId);
                return Ok(status);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(502, new { message = "Khong ket noi duoc Java Coordinator.", error = ex.Message });
            }
        }

        private object BuildCoordinatorRequest(InterbankTransferRequest request, string clientTxId)
        {
            return new
            {
                client_tx_id = clientTxId,
                from_account = request.FromAccount,
                to_account = request.ToAccount,
                amount = request.Amount,
                currency = "VND",
                participants = new object[]
                {
                    new
                    {
                        name = "family-bank-source",
                        base_url = GetConfig("JAVA_COORDINATOR_FAMILY_PARTICIPANT_URL", "http://host.docker.internal:5288"),
                        account_id = request.FromAccount,
                        operation = "DEBIT"
                    },
                    new
                    {
                        name = "simple-serene-bank-dest",
                        base_url = GetConfig("JAVA_COORDINATOR_SIMPLE_PARTICIPANT_URL", "http://host.docker.internal:8001"),
                        account_id = request.ToAccount,
                        operation = "CREDIT"
                    }
                },
                timeout_ms = 3000
            };
        }

        private async Task<JavaCoordinatorTransferResponse> PostCoordinatorTransfer(
            HttpClient client,
            string coordinatorBaseUrl,
            object coordinatorRequest)
        {
            var json = JsonSerializer.Serialize(coordinatorRequest);
            using var content = new StringContent(json, Encoding.UTF8, "application/json");
            using var response = await client.PostAsync($"{coordinatorBaseUrl.TrimEnd('/')}/coordinator/transfers", content);
            response.EnsureSuccessStatusCode();

            var body = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<JavaCoordinatorTransferResponse>(body, JsonOptions)
                ?? throw new InvalidOperationException("Coordinator returned an empty response.");
        }

        private async Task<JavaCoordinatorTransferResponse> PollCoordinatorStatus(
            HttpClient client,
            string coordinatorBaseUrl,
            string transactionId,
            JavaCoordinatorTransferResponse fallback)
        {
            var current = fallback;
            for (var i = 0; i < 5; i++)
            {
                if (IsTerminal(current.Status))
                    return current;

                await Task.Delay(700);
                current = await GetCoordinatorStatus(client, coordinatorBaseUrl, transactionId);
            }

            return current;
        }

        private async Task<JavaCoordinatorTransferResponse> GetCoordinatorStatus(
            HttpClient client,
            string coordinatorBaseUrl,
            string transactionId)
        {
            using var response = await client.GetAsync($"{coordinatorBaseUrl.TrimEnd('/')}/coordinator/transfers/{transactionId}");
            response.EnsureSuccessStatusCode();

            var body = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<JavaCoordinatorTransferResponse>(body, JsonOptions)
                ?? throw new InvalidOperationException("Coordinator returned an empty response.");
        }

        private object ToMobileResponse(JavaCoordinatorTransferResponse response, InterbankTransferRequest request, string clientTxId)
        {
            var success = response.Status == "COMMITTED";
            return new
            {
                success,
                message = success ? "Chuyen lien ngan hang thanh cong." : "Giao dich 2PC chua commit thanh cong.",
                amount = request.Amount,
                transactionId = response.TransactionId,
                clientTxId,
                timestamp = response.UpdatedAt ?? response.CreatedAt ?? DateTime.UtcNow.ToString("O"),
                fromAccount = request.FromAccount,
                toAccount = request.ToAccount,
                destinationBank = request.DestinationBank,
                status = response.Status,
                phase = response.Phase,
                decision = response.Decision,
                participants = response.Participants
            };
        }

        private string GetConfig(string key, string fallback)
        {
            return _config[key] ?? fallback;
        }

        private static bool IsTerminal(string? status)
        {
            return status is "COMMITTED" or "ABORTED" or "IN_DOUBT";
        }
    }

    public class InterbankTransferRequest
    {
        public string FromAccount { get; set; } = "";
        public string ToAccount { get; set; } = "";
        public decimal Amount { get; set; }
        public string Note { get; set; } = "";
        public string OtpCode { get; set; } = "";
        public string DestinationBank { get; set; } = "Simple Serene Bank (2PC Demo)";
        public string? ClientTxId { get; set; }
    }

    public class JavaCoordinatorTransferResponse
    {
        public string TransactionId { get; set; } = "";
        public string? ClientTxId { get; set; }
        public string Status { get; set; } = "";
        public string Phase { get; set; } = "";
        public string? Decision { get; set; }
        public decimal Amount { get; set; }
        public string? Currency { get; set; }
        public List<CoordinatorParticipantState> Participants { get; set; } = new();
        public string? CreatedAt { get; set; }
        public string? UpdatedAt { get; set; }
    }

    public class CoordinatorParticipantState
    {
        public string Name { get; set; } = "";
        public string Operation { get; set; } = "";
        public string PrepareVote { get; set; } = "";
        public string DecisionAck { get; set; } = "";
        public int RetryCount { get; set; }
        public string? LastError { get; set; }
    }
}
