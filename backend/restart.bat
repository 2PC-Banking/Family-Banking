@echo off
echo Dang tat backend cu tren port 5288...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5288.*LISTENING" 2^>nul') do (
    taskkill /PID %%a /F >nul 2>&1
)
timeout /t 1 /nobreak >nul
echo Dang khoi dong lai backend...
dotnet run
