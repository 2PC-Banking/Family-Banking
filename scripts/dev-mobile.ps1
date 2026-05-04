$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot "load-env.ps1")

if (-not $env:EXPO_PUBLIC_API_URL) {
    $env:EXPO_PUBLIC_API_URL = "http://10.0.2.2:5288/api"
}

Push-Location (Join-Path $repoRoot "apps\mobile")
try {
    npm run start
}
finally {
    Pop-Location
}
