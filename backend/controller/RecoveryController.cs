using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.controller
{
    [ApiController]
    [Route("api/recovery")]
    public class RecoveryController : ControllerBase
    {
        private readonly BankDbContext _context;

        public RecoveryController(BankDbContext context)
        {
            _context = context;
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetStatus([FromQuery] string? transaction_id, [FromQuery] string? status)
        {
            var query = _context.TransactionJournals.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(transaction_id))
                query = query.Where(j => j.transaction_id == transaction_id);

            if (!string.IsNullOrWhiteSpace(status))
                query = query.Where(j => j.phase_status == status);

            var items = await query
                .OrderByDescending(j => j.updated_at)
                .Select(j => new
                {
                    j.transaction_id,
                    j.phase_status,
                    j.operation,
                    j.account_id,
                    j.amount,
                    j.last_error,
                    j.created_at,
                    j.updated_at
                })
                .ToListAsync();

            var summary = await _context.TransactionJournals
                .GroupBy(j => j.phase_status)
                .Select(g => new { status = g.Key, count = g.Count() })
                .ToListAsync();

            return Ok(new
            {
                participant = "csharp-postgres-bank",
                summary,
                transactions = items
            });
        }

        [HttpPost("force-rollback")]
        public async Task<IActionResult> ForceRollback([FromBody] ForceRollbackRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.transaction_id))
                return BadRequest(new ErrorResponse("VALIDATION_ERROR", "transaction_id is required", req.transaction_id));

            var journal = await _context.TransactionJournals
                .FirstOrDefaultAsync(j => j.transaction_id == req.transaction_id);

            if (journal == null)
                return NotFound(new ErrorResponse("NOT_FOUND", "Transaction not found", req.transaction_id));

            if (journal.phase_status == "COMMITTED")
                return Conflict(new ErrorResponse("CONFLICT", "Cannot force rollback a committed transaction", req.transaction_id));

            if (journal.phase_status == "ABORTED")
                return Ok(new RecoveryDecisionResponse(req.transaction_id, "ABORTED", "Already aborted (idempotent)"));

            journal.phase_status = "ABORTED";
            journal.last_error = req.reason ?? "Force rollback requested";
            journal.updated_at = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new RecoveryDecisionResponse(req.transaction_id, "ABORTED", "Force rollback applied"));
        }

        [HttpPost("auto-rollback-expired")]
        public async Task<IActionResult> AutoRollbackExpired([FromBody] AutoRollbackExpiredRequest? req)
        {
            var maxAgeSeconds = req?.max_age_seconds > 0 ? req.max_age_seconds : 300;
            var cutoff = DateTime.UtcNow.AddSeconds(-maxAgeSeconds);

            var expired = await _context.TransactionJournals
                .Where(j => j.phase_status == "PREPARED" && j.updated_at <= cutoff)
                .OrderBy(j => j.updated_at)
                .ToListAsync();

            foreach (var journal in expired)
            {
                journal.phase_status = "ABORTED";
                journal.last_error = $"Auto rollback expired PREPARED transaction after {maxAgeSeconds} seconds";
                journal.updated_at = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                status = "OK",
                max_age_seconds = maxAgeSeconds,
                rolled_back_count = expired.Count,
                transactions = expired.Select(j => j.transaction_id).ToList()
            });
        }

        [HttpPost("cleanup-locks")]
        public async Task<IActionResult> CleanupLocks()
        {
            var preparedCount = await _context.TransactionJournals
                .CountAsync(j => j.phase_status == "PREPARED");

            return Ok(new
            {
                status = "OK",
                cleanup_count = 0,
                prepared_count = preparedCount,
                message = "C# participant does not hold separate DB locks; recovery state is tracked in transaction_journal."
            });
        }
    }

    public class ForceRollbackRequest
    {
        public string transaction_id { get; set; } = "";
        public string? reason { get; set; }
    }

    public class AutoRollbackExpiredRequest
    {
        public int max_age_seconds { get; set; } = 300;
    }

    public record RecoveryDecisionResponse(string transaction_id, string status, string message);
}
