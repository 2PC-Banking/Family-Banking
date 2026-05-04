$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot "load-env.ps1")

dotnet run --project (Join-Path $repoRoot "backend\backend.csproj")
