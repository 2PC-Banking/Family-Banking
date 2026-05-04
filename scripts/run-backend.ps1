$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot "load-env.ps1")

if (-not $env:ASPNETCORE_URLS) {
    $env:ASPNETCORE_URLS = "http://0.0.0.0:5288"
}

dotnet run --project (Join-Path $repoRoot "backend\backend.csproj") --no-launch-profile
