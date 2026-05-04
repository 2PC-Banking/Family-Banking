param(
    [string]$PsqlPath = "psql",
    [string]$CreatedbPath = "createdb",
    [string]$HostName,
    [int]$Port,
    [string]$UserName,
    [string]$DatabaseName,
    [string]$DockerContainer = "family-banking-postgres"
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot "load-env.ps1")

if (-not $HostName) { $HostName = $env:DB_HOST }
if (-not $Port) { $Port = if ($env:DB_PORT) { [int]$env:DB_PORT } else { 5432 } }
if (-not $UserName) { $UserName = $env:DB_USER }
if (-not $DatabaseName) { $DatabaseName = $env:DB_NAME }

if (-not $HostName) { $HostName = "localhost" }
if (-not $UserName) { $UserName = "postgres" }
if (-not $DatabaseName) { $DatabaseName = "2PC" }
if ($env:DB_PASSWORD -and -not $env:PGPASSWORD) { $env:PGPASSWORD = $env:DB_PASSWORD }

$schemaPath = Join-Path $repoRoot "data\schema.sql"
$journalPath = Join-Path $repoRoot "data\create_transaction_journal.sql"
$seedPath = Join-Path $repoRoot "data\2pc.test-data.sql"

$psqlCommand = Get-Command $PsqlPath -ErrorAction SilentlyContinue
$dockerCommand = Get-Command docker -ErrorAction SilentlyContinue
$containerId = if ($dockerCommand) {
    (& docker ps -q --filter "name=^/$DockerContainer$" 2>$null)
}
else {
    $null
}
$useDocker = $null -ne $dockerCommand -and -not [string]::IsNullOrWhiteSpace($containerId)

function Wait-ForDatabase {
    $maxAttempts = 30
    for ($attempt = 1; $attempt -le $maxAttempts; $attempt++) {
        if ($useDocker) {
            & docker exec $DockerContainer pg_isready -U $UserName -d postgres *> $null
            if ($LASTEXITCODE -eq 0) { return }
        }
        elseif ($psqlCommand) {
            & $PsqlPath -h $HostName -p $Port -U $UserName -d postgres -c "SELECT 1" *> $null
            if ($LASTEXITCODE -eq 0) { return }
        }

        Start-Sleep -Seconds 1
    }

    throw "PostgreSQL is not ready after $maxAttempts seconds."
}

function Invoke-PsqlScalar {
    param(
        [string]$TargetDatabase,
        [string]$Query
    )

    if ($useDocker) {
        return & docker exec $DockerContainer `
            psql `
            -U $UserName `
            -d $TargetDatabase `
            -tAc $Query
    }

    return & $PsqlPath `
        -h $HostName `
        -p $Port `
        -U $UserName `
        -d $TargetDatabase `
        -tAc $Query
}

function Invoke-PsqlFile {
    param([string]$FilePath)

    if ($useDocker) {
        Get-Content -LiteralPath $FilePath -Raw | & docker exec -i $DockerContainer `
            psql `
            -U $UserName `
            -d $DatabaseName `
            -v ON_ERROR_STOP=1 `
            -f -
        return
    }

    & $PsqlPath `
        -h $HostName `
        -p $Port `
        -U $UserName `
        -d $DatabaseName `
        -v ON_ERROR_STOP=1 `
        -f $FilePath
}

Wait-ForDatabase

$exists = Invoke-PsqlScalar `
    -TargetDatabase "postgres" `
    -Query "SELECT 1 FROM pg_database WHERE datname = '$DatabaseName'"

if (($exists ?? "").Trim() -ne "1") {
    if ($useDocker) {
        & docker exec $DockerContainer `
            createdb `
            -U $UserName `
            $DatabaseName
    }
    else {
        & $CreatedbPath `
            -h $HostName `
            -p $Port `
            -U $UserName `
            $DatabaseName
    }
}

Invoke-PsqlFile $schemaPath
Invoke-PsqlFile $journalPath
Invoke-PsqlFile $seedPath

if ($useDocker) {
    & docker exec $DockerContainer `
        psql `
        -U $UserName `
        -d $DatabaseName `
        -c "SELECT accountnumber, customerid, balance FROM account ORDER BY accountnumber;"
}
else {
    & $PsqlPath `
        -h $HostName `
        -p $Port `
        -U $UserName `
        -d $DatabaseName `
        -c "SELECT accountnumber, customerid, balance FROM account ORDER BY accountnumber;"
}
