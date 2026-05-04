# Java Coordinator Handoff

This is a short handoff for the team building the Java Spring Boot 2PC coordinator.

## Current Repository State

This repo currently contains:

- `backend/`: C# ASP.NET Core banking API using PostgreSQL.
- `apps/web/`: Next.js web UI for user/admin banking screens.
- `apps/mobile/`: Expo React Native mobile app.
- `docker-compose.yml`: PostgreSQL container for local development.
- `data/schema.sql`, `data/create_transaction_journal.sql`, `data/2pc.test-data.sql`: local DB schema and seed data.
- `.env.example`: shared local environment template.

The C# backend has two roles right now:

1. Normal banking API for login, account lookup, OTP, transfer, history.
2. Bank participant API for 2PC.

It also has a C# demo coordinator under `CoordinatorController`, but that controller is not a production-grade durable coordinator. The Java team should treat it as reference logic only, not as the final coordinator design.

## What Already Works

Local setup:

```powershell
Copy-Item .\.env.example .\.env
docker compose up -d db
.\scripts\setup-db.ps1
.\scripts\run-backend.ps1
```

Verified sample data:

```text
Phone: 0900000000 / Password: 123456 / Account: 1000000001 / Balance: 5000000
Phone: 0900000001 / Password: 123456 / Account: 1000000002 / Balance: 3000000
Phone: 0900000002 / Password: 123456 / Account: 1000000003 / Balance: 9000000
```

Verified C# API examples:

```http
POST /api/auth/login
GET  /api/account/balance/{accountnumber}
GET  /api/account/info/{accountnumber}
POST /api/otp/request
POST /api/transfer
GET  /api/history/{accountnumber}
```

## Bank B: C# PostgreSQL Participant Contract

Base URL comes from env:

```text
http://<bank-b-host>:5288
```

Current participant endpoints:

```http
POST /api/prepare
POST /api/commit
POST /api/rollback
GET  /api/recovery/status
POST /api/recovery/force-rollback
POST /api/recovery/auto-rollback-expired
POST /api/recovery/cleanup-locks
```

### PREPARE

Request:

```json
{
  "transaction_id": "TX-20260504-ABC123",
  "account_id": "1000000002",
  "operation": "CREDIT",
  "amount": 100000
}
```

`operation` must be `DEBIT` or `CREDIT`.

Success response:

```json
{
  "transaction_id": "TX-20260504-ABC123",
  "vote": "YES",
  "participant_tx_status": "PREPARED"
}
```

Business reject response still returns HTTP 200 with `vote = NO`:

```json
{
  "transaction_id": "TX-20260504-ABC123",
  "vote": "NO",
  "participant_tx_status": "ABORTED"
}
```

Validation error:

```json
{
  "error": "VALIDATION_ERROR",
  "message": "amount must be > 0",
  "transaction_id": "TX-20260504-ABC123"
}
```

### COMMIT

Request:

```json
{
  "transaction_id": "TX-20260504-ABC123"
}
```

Success/idempotent response:

```json
{
  "transaction_id": "TX-20260504-ABC123",
  "status": "COMMITTED",
  "message": "Commit applied"
}
```

### ROLLBACK

Request:

```json
{
  "transaction_id": "TX-20260504-ABC123"
}
```

Success/idempotent response:

```json
{
  "transaction_id": "TX-20260504-ABC123",
  "status": "ABORTED",
  "message": "Rollback applied"
}
```

## Current C# Participant State Model

Table: `transaction_journal`

```text
transaction_id  PK
phase_status    INIT | PREPARED | COMMITTED | ABORTED
operation       DEBIT | CREDIT
account_id
amount
last_error
created_at
updated_at
```

Current state behavior:

- `PREPARE` writes `PREPARED` if account exists and debit balance is sufficient.
- `PREPARE` writes `ABORTED` for missing account or insufficient debit balance.
- Repeated `PREPARE` is idempotent for `PREPARED`, `COMMITTED`, `ABORTED`.
- `COMMIT` only applies money movement from `PREPARED`.
- Repeated `COMMIT` after `COMMITTED` returns OK.
- `ROLLBACK` only moves non-terminal state to `ABORTED`.
- Repeated `ROLLBACK` after `ABORTED` returns OK.
- `ROLLBACK` after `COMMITTED` returns conflict.

## Recovery Endpoints

```http
GET  /api/recovery/status
POST /api/recovery/force-rollback
POST /api/recovery/auto-rollback-expired
POST /api/recovery/cleanup-locks
```

`GET /api/recovery/status` supports optional query filters:

```http
GET /api/recovery/status?transaction_id=TX-20260504-ABC123
GET /api/recovery/status?status=PREPARED
```

`POST /api/recovery/force-rollback`:

```json
{
  "transaction_id": "TX-20260504-ABC123",
  "reason": "manual recovery"
}
```

`POST /api/recovery/auto-rollback-expired`:

```json
{
  "max_age_seconds": 300
}
```

`POST /api/recovery/cleanup-locks` is currently a no-op for C# because this participant does not hold separate DB locks; the prepared state is represented in `transaction_journal`.

## Important Gaps Before Java Coordinator Integration

Remaining participant-side gaps:

- No explicit fault simulation flags yet.
- No lock table; `cleanup-locks` returns a no-op response.
- Error schema is close but not guaranteed identical to the Python bank.
- `PREPARE` idempotency is based on `transaction_id`; it does not currently reject same `transaction_id` with a different payload.

## Do Not Reuse As Final Coordinator

Existing C# endpoint:

```http
POST /api/coordinator/transfer
GET  /api/coordinator/status/{transactionId}
```

This is a demo coordinator only:

- No durable coordinator log.
- No `coordinator_tx` or `coordinator_participant_state`.
- No retry queue/backoff.
- No startup recovery scan.
- Bank B can be mocked via config.
- Local Bank A logic is partly embedded in coordinator instead of being a clean client adapter.

Use it only as behavioral reference for basic 2PC flow.

## Recommended Java Coordinator Contract

Coordinator API:

```http
POST /coordinator/transfers
GET  /coordinator/transfers/{transaction_id}
POST /coordinator/transfers/{transaction_id}/retry-decision
```

Coordinator DB:

```text
coordinator_tx
coordinator_participant_state
```

Recommended participant abstraction:

```text
ParticipantClient.prepare(...)
ParticipantClient.commit(...)
ParticipantClient.rollback(...)
ParticipantClient.getRecoveryStatus(...)
ParticipantClient.forceRollback(...)
ParticipantClient.autoRollbackExpired(...)
ParticipantClient.cleanupLocks(...)
```

Implement concrete adapters:

```text
PythonBankClient
CSharpBankClient
```

## Contract Decisions Still Needed

- Global `transaction_id` format.
- `client_tx_id` idempotency rule at coordinator API.
- Prepare timeout and decision timeout.
- Retry policy: max retry, initial delay, backoff multiplier.
- Mapping participant HTTP status to coordinator state.
- Unified error response shape across Python and C# participants.
- Whether C# Bank B must implement Python-style recovery endpoints.

## Suggested Build Order

1. Freeze JSON contract for `prepare`, `commit`, `rollback`.
2. Scaffold Java Spring Boot with Web, Validation, Data JPA, Actuator.
3. Add DB migrations for `coordinator_tx` and `coordinator_participant_state`.
4. Implement participant clients against mock servers first.
5. Implement prepare phase.
6. Implement decision phase.
7. Add manual retry API.
8. Add scheduled retry and startup recovery.
9. Connect Python Bank A.
10. Connect C# Bank B.
11. Run fault-injection tests.
