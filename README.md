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

Check local tools:

```powershell
node --version
npm --version
dotnet --info
```

## Backend

```powershell
dotnet restore .\2PC.sln
dotnet build .\2PC.sln
dotnet run --project .\backend\backend.csproj
```

The API configuration is in `backend/appsettings.json`. Do not commit local secrets or machine-specific settings.

## Web App

```powershell
cd .\apps\web
npm install
npm run dev
npm run build
```

The web app contains both admin pages and user banking pages.

## Mobile App

```powershell
cd .\apps\mobile
npm install
npm run start
```

The mobile app is an Expo app. Set `EXPO_PUBLIC_API_URL` when the API is not reachable at the default Android emulator URL:

```powershell
$env:EXPO_PUBLIC_API_URL="http://<MACHINE_IP>:5288/api"
npm run start
```

## Branch Notes

- `develop` is the active integration branch.
- `main` should be updated only when preparing a stable release.
- `feature/frontend-auth-api` is intentionally left aside for later review because it conflicts with the current admin login flow.
