# Family Banking

> Hệ thống ngân hàng gia đình đơn giản với chức năng chuyển tiền thực tế

## 🏗️ Kiến trúc

```
┌─────────────────────────────────────────────────────────────┐
│                    React + TypeScript                       │
│              (Vite, TailwindCSS, TanStack Query)           │
└─────────────────────────┬───────────────────────────────────┘
                          │ REST API
┌─────────────────────────▼───────────────────────────────────┐
│                   ASP.NET Core 10 API                       │
│  ┌──────────────┐  ┌────────────────────┐                  │
│  │ Auth (JWT)   │  │ Transfer Service   │                  │
│  │ Phone + OTP  │  │ Double-Entry       │                  │
│  └──────────────┘  └────────────────────┘                  │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                     PostgreSQL 16                           │
│  Users | Accounts | Transactions | LedgerEntries | OtpCodes │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
FamilyBank/
├── src/
│   ├── FamilyBank.Domain/           # Entities, Interfaces
│   ├── FamilyBank.Application/      # DTOs, Service Interfaces
│   ├── FamilyBank.Infrastructure/   # EF Core, Repositories
│   ├── FamilyBank.Api/              # Controllers, Middleware
│   └── family-bank-web/             # React Frontend
├── tests/
│   └── FamilyBank.Tests/            # xUnit Tests
├── docker-compose.yml               # Full stack deployment
└── docker-compose.dev.yml           # Development (DB only)
```

## 🚀 Quick Start

### Prerequisites
- .NET 10 SDK
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL (or use Docker)

### Development

1. **Start Database**
```bash
docker-compose -f docker-compose.dev.yml up -d
```

2. **Run API**
```bash
cd src/FamilyBank.Api
dotnet run
```

3. **Run Frontend**
```bash
cd src/family-bank-web
npm install
npm run dev
```

### Full Stack (Docker)
```bash
docker-compose up --build
```

## 🔐 Authentication Flow

```
┌──────────┐    ┌──────────┐    ┌──────────┐
│  Phone   │───▶│  OTP     │───▶│  JWT     │
│  Number  │    │ (6 digits)│   │  Token   │
└──────────┘    └──────────┘    └──────────┘
```

## 💸 Transfer Flow (Double-Entry Bookkeeping)

```sql
-- Mỗi giao dịch tạo 2 ledger entries:
INSERT INTO Transactions (...) -- status = PENDING
INSERT INTO LedgerEntries (DEBIT, from_account, amount)
INSERT INTO LedgerEntries (CREDIT, to_account, amount)
UPDATE Transactions SET status = COMPLETED

-- Balance = SUM(Credit) - SUM(Debit)
```

## 🛡️ Key Features

- **ACID Transactions**: PostgreSQL với row-level locking
- **Idempotency**: Tránh duplicate transactions
- **Double-Entry Bookkeeping**: Sổ cái kép như ngân hàng thật
- **Phone + OTP Auth**: Mock SMS cho development

## 📝 Git Workflow

```
main ─────────────────────────────────────────▶ production
  │
  └── develop ────────────────────────────────▶ integration
        │
        ├── feature/auth-otp ─────────────────▶ features
        ├── feature/transfer
        └── feature/dashboard
```

## 📄 License

MIT
