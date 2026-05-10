# Family Banking

Monorepo for the Family Banking system. The current integration branch is `develop`; keep `main` for release-ready snapshots.

## Project Layout

```text
Family-Banking/
  backend/       ASP.NET Core API for banking, OTP, and 2PC transfer flows
  apps/
    web/         Next.js web app for admin and user banking screens
    mobile/      Expo React Native mobile app
  data/          seed or project data files
  2PC.sln        .NET solution for the backend
```

## Prerequisites

- Node.js and npm
- .NET SDK 10
- Expo CLI through `npx expo`
- PostgreSQL

Check local tools:

```powershell
node --version
npm --version
dotnet --info
```

## Environment

Local configuration lives in the root `.env` file.

```powershell
Copy-Item .\.env.example .\.env
```

Edit `.env` for your machine. The important values are:

```text
DB_HOST=localhost
DB_PORT=5432
DB_NAME=2PC
DB_USER=postgres
DB_PASSWORD=postgres
ASPNETCORE_URLS=http://0.0.0.0:5288
NEXT_PUBLIC_API_URL=http://localhost:5288/api
EXPO_PUBLIC_API_URL=http://10.0.2.2:5288/api
```

Use your computer LAN IP for `EXPO_PUBLIC_API_URL` when testing on a physical phone.

## Backend

```powershell
dotnet restore .\2PC.sln
dotnet build .\2PC.sln
.\scripts\run-backend.ps1
```

The backend reads database and 2PC peer settings from `.env`. `backend/appsettings.json` only keeps non-local defaults.

## Database

Seed data is available in `data/2pc.test-data.sql`.

Recommended Docker flow:

```powershell
docker compose up -d db
.\scripts\setup-db.ps1
```

Native PostgreSQL flow:

```powershell
.\scripts\setup-db.ps1
```

If `psql` is not in the current terminal PATH, pass the full paths:

```powershell
.\scripts\setup-db.ps1 `
  -PsqlPath "C:\Program Files\PostgreSQL\18\bin\psql.exe" `
  -CreatedbPath "C:\Program Files\PostgreSQL\18\bin\createdb.exe"
```

Sample login data:

```text
Phone: 0900000000 / Password: 123456 / Account: 1000000001
Phone: 0900000001 / Password: 123456 / Account: 1000000002
Phone: 0900000002 / Password: 123456 / Account: 1000000003
```

## Web App

```powershell
cd .\apps\web
npm install
..\..\scripts\dev-web.ps1
npm run build
```

The web app contains both admin pages and user banking pages.

## Mobile App

```powershell
cd .\apps\mobile
npm install
..\..\scripts\dev-mobile.ps1
```

## Branch Notes

- `develop` is the active integration branch.
- `main` should be updated only when preparing a stable release.
- `feature/frontend-auth-api` is intentionally left aside for later review because it conflicts with the current admin login flow.


cd E:\Workspace\FamilyBank\Family-Banking\apps\mobile                                             
>> $env:EXPO_PUBLIC_API_URL="http://192.168.1.15:5288/api"
>> npm run start -- --clear        

cd E:\Workspace\FamilyBank\Family-Banking
>> $env:ASPNETCORE_URLS="http://0.0.0.0:5288"             
>> dotnet run --project backend\backend.csproj --no-launch-profile     