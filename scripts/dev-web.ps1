$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot "load-env.ps1")

if (-not $env:NEXT_PUBLIC_API_URL) {
    $env:NEXT_PUBLIC_API_URL = "http://localhost:5288/api"
}

Push-Location (Join-Path $repoRoot "apps\web")
try {
    npm run dev
}
finally {
    Pop-Location
}
