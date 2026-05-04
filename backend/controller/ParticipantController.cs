using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.models;
using backend.Data;
using System;
using System.Threading.Tasks;

namespace backend.controller
{
    /// <summary>
    /// Participant API — nhận lệnh từ Coordinator trong giao thức 2PC.
    /// State machine: INIT → PREPARED → COMMITTED
    ///                INIT/PREPARED → ABORTED
    /// COMMITTED và ABORTED là terminal state (idempotent).
    /// </summary>
    [ApiController]
    [Route("api")]
    public class ParticipantController : ControllerBase
    {
        private readonly BankDbContext _context;

        public ParticipantController(BankDbContext context)
        {
            _context = context;
        }

        // ─────────────────────────────────────────────
        //  Phase 1: PREPARE
        //  Coordinator gọi để hỏi "Mày có sẵn sàng không?"
        // ─────────────────────────────────────────────
        [HttpPost("prepare")]
        public async Task<IActionResult> Prepare([FromBody] PrepareRequest req)
        {
            // 1. Validate input cơ bản
            if (string.IsNullOrWhiteSpace(req.transaction_id))
                return BadRequest(new ErrorResponse("VALIDATION_ERROR", "transaction_id is required", req.transaction_id));

            if (string.IsNullOrWhiteSpace(req.account_id))
                return BadRequest(new ErrorResponse("VALIDATION_ERROR", "account_id is required", req.transaction_id));

            if (req.operation != "DEBIT" && req.operation != "CREDIT")
                return BadRequest(new ErrorResponse("VALIDATION_ERROR", "operation must be DEBIT or CREDIT", req.transaction_id));

            if (req.amount <= 0)
                return BadRequest(new ErrorResponse("VALIDATION_ERROR", "amount must be > 0", req.transaction_id));

            // 2. Kiểm tra idempotency — nếu transaction_id đã tồn tại
            var existing = await _context.TransactionJournals
                .FirstOrDefaultAsync(j => j.transaction_id == req.transaction_id);

            if (existing != null)
            {
                // Terminal state → trả idempotent response
                if (existing.phase_status == "COMMITTED")
                    return Ok(new PrepareResponse(req.transaction_id, "YES", "COMMITTED"));

                if (existing.phase_status == "ABORTED")
                    return Ok(new PrepareResponse(req.transaction_id, "NO", "ABORTED"));

                // Đã PREPARED trước đó → trả YES idempotent
                if (existing.phase_status == "PREPARED")
                    return Ok(new PrepareResponse(req.transaction_id, "YES", "PREPARED"));
            }

            // 3. Business check
            var account = await _context.Accounts
                .FirstOrDefaultAsync(a => a.accountnumber == req.account_id);

            if (account == null)
            {
                // Ghi ABORTED và trả NO
                await WriteJournal(req, "ABORTED", "Account not found");
                return Ok(new PrepareResponse(req.transaction_id, "NO", "ABORTED"));
            }

            if (req.operation == "DEBIT" && account.balance < req.amount)
            {
                // Không đủ số dư → ABORT
                await WriteJournal(req, "ABORTED", "Insufficient balance");
                return Ok(new PrepareResponse(req.transaction_id, "NO", "ABORTED"));
            }

            // 4. Tất cả pass → ghi PREPARED (giữ chỗ — chưa trừ/cộng tiền thật)
            await WriteJournal(req, "PREPARED", null);
            return Ok(new PrepareResponse(req.transaction_id, "YES", "PREPARED"));
        }

        // ─────────────────────────────────────────────
        //  Phase 2a: COMMIT
        //  Coordinator gọi sau khi tất cả participant vote YES
        // ─────────────────────────────────────────────
        [HttpPost("commit")]
        public async Task<IActionResult> Commit([FromBody] DecisionRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.transaction_id))
                return BadRequest(new ErrorResponse("VALIDATION_ERROR", "transaction_id is required", req.transaction_id));

            var journal = await _context.TransactionJournals
                .FirstOrDefaultAsync(j => j.transaction_id == req.transaction_id);

            if (journal == null)
                return NotFound(new ErrorResponse("NOT_FOUND", "Transaction not found", req.transaction_id));

            // Idempotent: đã COMMITTED rồi
            if (journal.phase_status == "COMMITTED")
                return Ok(new DecisionResponse(req.transaction_id, "COMMITTED", "Already committed (idempotent)"));

            // Conflict: đã ABORTED không thể commit
            if (journal.phase_status == "ABORTED")
                return Conflict(new ErrorResponse("CONFLICT", "Cannot commit an aborted transaction", req.transaction_id));

            // Chỉ apply khi đang PREPARED
            if (journal.phase_status != "PREPARED")
                return Conflict(new ErrorResponse("CONFLICT", $"Cannot commit from state {journal.phase_status}", req.transaction_id));

            // Apply nghiệp vụ thật trong DB transaction
            using var dbTx = await _context.Database.BeginTransactionAsync();
            try
            {
                var account = await _context.Accounts
                    .FirstOrDefaultAsync(a => a.accountnumber == journal.account_id);

                if (account == null)
                    return NotFound(new ErrorResponse("NOT_FOUND", "Account not found during commit", req.transaction_id));

                if (journal.operation == "DEBIT")
                    account.balance -= journal.amount;
                else
                    account.balance += journal.amount;

                // Ghi transaction log (lịch sử chuyển tiền)
                var txLog = new Transaction
                {
                    transactionid = req.transaction_id + "_2PC",
                    accountnumber = journal.account_id,
                    amount = journal.operation == "DEBIT" ? -journal.amount : journal.amount,
                    timestamp = DateTime.UtcNow,
                    type = journal.operation == "DEBIT" ? "2PC_DEBIT" : "2PC_CREDIT",
                    relatedaccount = null,
                    postbalance = account.balance
                };
                await _context.Transactions.AddAsync(txLog);

                // Cập nhật journal → COMMITTED
                journal.phase_status = "COMMITTED";
                journal.updated_at = DateTime.UtcNow;

                await _context.SaveChangesAsync();
                await dbTx.CommitAsync();

                return Ok(new DecisionResponse(req.transaction_id, "COMMITTED", "Commit applied"));
            }
            catch (Exception ex)
            {
                await dbTx.RollbackAsync();
                return StatusCode(500, new ErrorResponse("SYSTEM_ERROR", ex.Message, req.transaction_id));
            }
        }

        // ─────────────────────────────────────────────
        //  Phase 2b: ROLLBACK
        //  Coordinator gọi khi có ít nhất 1 participant vote NO
        // ─────────────────────────────────────────────
        [HttpPost("rollback")]
        public async Task<IActionResult> Rollback([FromBody] DecisionRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.transaction_id))
                return BadRequest(new ErrorResponse("VALIDATION_ERROR", "transaction_id is required", req.transaction_id));

            var journal = await _context.TransactionJournals
                .FirstOrDefaultAsync(j => j.transaction_id == req.transaction_id);

            if (journal == null)
                return NotFound(new ErrorResponse("NOT_FOUND", "Transaction not found", req.transaction_id));

            // Idempotent: đã ABORTED rồi
            if (journal.phase_status == "ABORTED")
                return Ok(new DecisionResponse(req.transaction_id, "ABORTED", "Already aborted (idempotent)"));

            // Không thể rollback khi đã COMMITTED
            if (journal.phase_status == "COMMITTED")
                return Conflict(new ErrorResponse("CONFLICT", "Cannot rollback a committed transaction", req.transaction_id));

            // Release lock (chưa apply tiền thật nên chỉ cần update trạng thái)
            journal.phase_status = "ABORTED";
            journal.updated_at = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new DecisionResponse(req.transaction_id, "ABORTED", "Rollback applied"));
        }

        // ─────────────────────────────────────────────
        //  Helper: ghi journal mới
        // ─────────────────────────────────────────────
        private async Task WriteJournal(PrepareRequest req, string status, string? error)
        {
            var entry = new TransactionJournal
            {
                transaction_id = req.transaction_id,
                phase_status = status,
                operation = req.operation,
                account_id = req.account_id,
                amount = req.amount,
                last_error = error,
                created_at = DateTime.UtcNow,
                updated_at = DateTime.UtcNow
            };
            await _context.TransactionJournals.AddAsync(entry);
            await _context.SaveChangesAsync();
        }
    }

    // ─── DTOs ───────────────────────────────────────

    public class PrepareRequest
    {
        public string transaction_id { get; set; } = "";
        public string account_id { get; set; } = "";
        public string operation { get; set; } = "";  // DEBIT | CREDIT
        public decimal amount { get; set; }
    }

    public class DecisionRequest
    {
        public string transaction_id { get; set; } = "";
    }

    public record PrepareResponse(string transaction_id, string vote, string participant_tx_status);
    public record DecisionResponse(string transaction_id, string status, string message);
    public record ErrorResponse(string error, string message, string? transaction_id);
}
