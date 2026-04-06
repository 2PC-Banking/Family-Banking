using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using backend.models;
using backend.Data;
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace backend.controller
{
    /// <summary>
    /// Coordinator API — React app gọi endpoint này để thực hiện chuyển tiền 2PC liên ngân hàng.
    ///
    /// Flow tổng quan (2-Phase Commit):
    ///   1. React gọi POST /api/coordinator/transfer
    ///   2. Coordinator tạo transaction_id
    ///   3. Phase 1 — PREPARE: gọi /api/prepare tới Bank A (local) & Bank B (remote) song song
    ///   4. Nếu cả 2 vote YES → Phase 2 COMMIT: gọi /api/commit tới cả 2
    ///   5. Nếu có 1 vote NO  → Phase 2 ABORT:  gọi /api/rollback tới cả 2
    ///   6. Trả kết quả về React app
    /// </summary>
    [ApiController]
    [Route("api/coordinator")]
    public class CoordinatorController : ControllerBase
    {
        private readonly BankDbContext _context;
        private readonly IMemoryCache _cache;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;

        public CoordinatorController(
            BankDbContext context,
            IMemoryCache cache,
            IHttpClientFactory httpClientFactory,
            IConfiguration config)
        {
            _context = context;
            _cache = cache;
            _httpClientFactory = httpClientFactory;
            _config = config;
        }

        /// <summary>
        /// Endpoint chính — React Native app gọi để chuyển tiền liên ngân hàng qua 2PC.
        /// </summary>
        [HttpPost("transfer")]
        public async Task<IActionResult> Transfer2PC([FromBody] CoordinatorTransferRequest req)
        {
            // ── 1. Validate OTP ──────────────────────────────
            if (!_cache.TryGetValue(req.from_account + "_OTP", out string? savedOtp) || savedOtp != req.otp_code)
                return BadRequest(new { message = "Mã OTP không chính xác hoặc đã hết hạn!" });

            _cache.Remove(req.from_account + "_OTP");

            // ── 2. Validate input ──────────────────────────────
            if (req.amount <= 0)
                return BadRequest(new { message = "Số tiền phải lớn hơn 0" });

            if (req.from_account == req.to_account)
                return BadRequest(new { message = "Không thể tự chuyển tiền cho chính mình" });

            // ── 3. Tạo Transaction ID toàn cục ──────────────────
            var txId = "TX-2PC-" + DateTime.UtcNow.ToString("yyyyMMddHHmmss") + "-" +
                       Guid.NewGuid().ToString("N")[..6].ToUpper();

            // ── 4. Lấy URL của Bank B từ config ──────────────────
            var bankBUrl = _config["BankB:BaseUrl"] ?? "http://localhost:5289";

            var client = _httpClientFactory.CreateClient("BankB");

            // ═══════════════════════════════════════════
            //  PHASE 1: PREPARE
            // ═══════════════════════════════════════════

            // Prepare cho Bank A (local — DEBIT từ tài khoản nguồn)
            var prepareA = new PrepareRequest
            {
                transaction_id = txId,
                account_id = req.from_account,
                operation = "DEBIT",
                amount = req.amount
            };

            // Prepare cho Bank B (remote — CREDIT vào tài khoản đích)
            var prepareBBody = new
            {
                transaction_id = txId,
                account_id = req.to_account,
                operation = "CREDIT",
                amount = req.amount
            };

            // Gọi prepare Bank A (local participant — gọi thẳng vào DB/logic nội bộ)
            var voteA = await PrepareLocalParticipant(prepareA);

            // Gọi prepare Bank B (remote participant qua HTTP hoặc mock)
            bool voteBSuccess = false;
            string voteBStatus = "UNKNOWN";

            bool isMock = _config.GetValue<bool>("BankB:MockMode");
            if (isMock)
            {
                // ── MOCK MODE: giả lập Bank B luôn vote YES ──
                voteBSuccess = true;
                voteBStatus = "PREPARED (MOCK)";
            }
            else
            {
                try
                {
                    var bJson = JsonSerializer.Serialize(prepareBBody);
                    var bContent = new StringContent(bJson, Encoding.UTF8, "application/json");
                    var bResponse = await client.PostAsync(bankBUrl + "/api/prepare", bContent);
                    if (bResponse.IsSuccessStatusCode)
                    {
                        var bBody = await bResponse.Content.ReadAsStringAsync();
                        var bResult = JsonSerializer.Deserialize<PrepareResultDto>(bBody,
                            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                        voteBSuccess = bResult?.vote == "YES";
                        voteBStatus = bResult?.participant_tx_status ?? "UNKNOWN";
                    }
                }
                catch (Exception ex)
                {
                    // Network error → coi là NO
                    voteBSuccess = false;
                    voteBStatus = "NETWORK_ERROR: " + ex.Message;
                }
            }


            bool bothVoteYes = voteA.voted && voteBSuccess;

            // ═══════════════════════════════════════════
            //  PHASE 2: COMMIT hoặc ROLLBACK
            // ═══════════════════════════════════════════

            if (bothVoteYes)
            {
                // ── COMMIT cả 2 ──
                var commitA = await CommitLocalParticipant(txId);

                bool commitBSuccess;
                if (isMock)
                    commitBSuccess = true; // Mock: Bank B luôn commit OK
                else
                    commitBSuccess = await SendDecisionToB(client, bankBUrl, "commit", txId);

                if (commitA && commitBSuccess)
                {
                    return Ok(new CoordinatorTransferResponse
                    {
                        success = true,
                        transaction_id = txId,
                        final_status = "COMMITTED",
                        message = "Chuyển tiền liên ngân hàng thành công!",
                        amount = req.amount,
                        from_account = req.from_account,
                        to_account = req.to_account,
                        timestamp = DateTime.UtcNow
                    });
                }
                else
                {
                    // Commit thất bại (hiếm gặp) — cần recovery thủ công
                    return StatusCode(500, new
                    {
                        success = false,
                        transaction_id = txId,
                        final_status = "COMMIT_FAILED",
                        message = "Commit thất bại sau khi cả 2 đã vote YES — cần recovery!",
                        commit_a = commitA,
                        commit_b = commitBSuccess
                    });
                }
            }
            else
            {
                // ── ROLLBACK cả 2 ──
                await RollbackLocalParticipant(txId);
                if (!isMock)
                    await SendDecisionToB(client, bankBUrl, "rollback", txId);

                return BadRequest(new
                {
                    success = false,
                    transaction_id = txId,
                    final_status = "ABORTED",
                    message = "Giao dịch bị hủy: " + (voteA.voted ? "" : $"Bank A từ chối ({voteA.reason}); ") +
                              (!voteBSuccess ? $"Bank B từ chối ({voteBStatus})" : ""),
                    vote_a = voteA.voted ? "YES" : "NO",
                    vote_b = voteBSuccess ? "YES" : "NO"
                });
            }
        }

        /// <summary>
        /// GET /api/coordinator/status/{transactionId}
        /// React app dùng để poll trạng thái giao dịch 2PC.
        /// </summary>
        [HttpGet("status/{transactionId}")]
        public async Task<IActionResult> GetStatus(string transactionId)
        {
            var journal = await _context.TransactionJournals
                .FirstOrDefaultAsync(j => j.transaction_id == transactionId);

            if (journal == null)
                return NotFound(new { message = "Transaction not found", transaction_id = transactionId });

            return Ok(new
            {
                transaction_id = journal.transaction_id,
                phase_status = journal.phase_status,
                operation = journal.operation,
                account_id = journal.account_id,
                amount = journal.amount,
                last_error = journal.last_error,
                created_at = journal.created_at,
                updated_at = journal.updated_at
            });
        }

        // ──────────────────────────────────────────────────────────────────
        //  INTERNAL HELPERS — gọi trực tiếp vào DB cục bộ (Bank A participant)
        // ──────────────────────────────────────────────────────────────────

        private async Task<(bool voted, string reason)> PrepareLocalParticipant(PrepareRequest req)
        {
            // Kiểm tra account
            var account = await _context.Accounts
                .FirstOrDefaultAsync(a => a.accountnumber == req.account_id);

            if (account == null)
            {
                await SaveJournal(req, "ABORTED", "Account not found");
                return (false, "Account not found");
            }

            if (req.operation == "DEBIT" && account.balance < req.amount)
            {
                await SaveJournal(req, "ABORTED", "Insufficient balance");
                return (false, "Insufficient balance");
            }

            await SaveJournal(req, "PREPARED", null);
            return (true, "");
        }

        private async Task<bool> CommitLocalParticipant(string txId)
        {
            var journal = await _context.TransactionJournals
                .FirstOrDefaultAsync(j => j.transaction_id == txId && j.operation == "DEBIT");

            if (journal == null || journal.phase_status != "PREPARED") return false;

            using var dbTx = await _context.Database.BeginTransactionAsync();
            try
            {
                var account = await _context.Accounts
                    .FirstOrDefaultAsync(a => a.accountnumber == journal.account_id);

                if (account == null) return false;

                account.balance -= journal.amount;

                var txLog = new Transaction
                {
                    transactionid = txId + "_2PC_OUT",
                    accountnumber = journal.account_id,
                    amount = -journal.amount,
                    timestamp = DateTime.UtcNow,
                    type = "2PC_DEBIT",
                    relatedaccount = null,
                    postbalance = account.balance
                };
                await _context.Transactions.AddAsync(txLog);

                journal.phase_status = "COMMITTED";
                journal.updated_at = DateTime.UtcNow;

                await _context.SaveChangesAsync();
                await dbTx.CommitAsync();
                return true;
            }
            catch
            {
                await dbTx.RollbackAsync();
                return false;
            }
        }

        private async Task RollbackLocalParticipant(string txId)
        {
            var journal = await _context.TransactionJournals
                .FirstOrDefaultAsync(j => j.transaction_id == txId);

            if (journal != null && journal.phase_status != "COMMITTED" && journal.phase_status != "ABORTED")
            {
                journal.phase_status = "ABORTED";
                journal.updated_at = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }
        }

        private async Task SaveJournal(PrepareRequest req, string status, string? error)
        {
            // Tránh duplicate nếu đã tồn tại
            var existing = await _context.TransactionJournals
                .FirstOrDefaultAsync(j => j.transaction_id == req.transaction_id);
            if (existing != null) return;

            await _context.TransactionJournals.AddAsync(new TransactionJournal
            {
                transaction_id = req.transaction_id,
                phase_status = status,
                operation = req.operation,
                account_id = req.account_id,
                amount = req.amount,
                last_error = error,
                created_at = DateTime.UtcNow,
                updated_at = DateTime.UtcNow
            });
            await _context.SaveChangesAsync();
        }

        private async Task<bool> SendDecisionToB(HttpClient client, string bankBUrl, string action, string txId)
        {
            try
            {
                var body = JsonSerializer.Serialize(new { transaction_id = txId });
                var content = new StringContent(body, Encoding.UTF8, "application/json");
                var response = await client.PostAsync(bankBUrl + "/api/" + action, content);
                return response.IsSuccessStatusCode;
            }
            catch
            {
                return false;
            }
        }
    }

    // ─── DTOs ───────────────────────────────────────────────────────────

    public class CoordinatorTransferRequest
    {
        public string from_account { get; set; } = "";
        public string to_account { get; set; } = "";
        public decimal amount { get; set; }
        public string note { get; set; } = "";
        public string otp_code { get; set; } = "";
    }

    public class CoordinatorTransferResponse
    {
        public bool success { get; set; }
        public string transaction_id { get; set; } = "";
        public string final_status { get; set; } = "";
        public string message { get; set; } = "";
        public decimal amount { get; set; }
        public string from_account { get; set; } = "";
        public string to_account { get; set; } = "";
        public DateTime timestamp { get; set; }
    }

    // DTO để deserialize response từ Bank B
    public class PrepareResultDto
    {
        public string? transaction_id { get; set; }
        public string? vote { get; set; }
        public string? participant_tx_status { get; set; }
    }
}
