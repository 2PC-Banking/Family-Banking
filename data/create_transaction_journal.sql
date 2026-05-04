-- ============================================================
-- Migration: Tạo bảng transaction_journal cho 2PC Protocol
-- Chạy script này trong PostgreSQL database "2PC"
-- ============================================================

CREATE TABLE IF NOT EXISTS transaction_journal (
    transaction_id  VARCHAR(100) NOT NULL,
    phase_status    VARCHAR(20)  NOT NULL DEFAULT 'INIT', -- INIT | PREPARED | COMMITTED | ABORTED
    operation       VARCHAR(10)  NOT NULL,                -- DEBIT | CREDIT
    account_id      VARCHAR(50)  NOT NULL,
    amount          NUMERIC(18, 2) NOT NULL,
    last_error      TEXT,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT pk_transaction_journal PRIMARY KEY (transaction_id)
);

-- Index tối ưu query theo trạng thái (dùng khi recovery/retry)
CREATE INDEX IF NOT EXISTS idx_journal_status_updated
    ON transaction_journal (phase_status, updated_at);

-- ============================================================
-- Xác nhận
-- ============================================================
SELECT 'transaction_journal table created successfully' AS result;
