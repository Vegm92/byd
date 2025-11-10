@echo off
cd /d "%~dp0"

echo Running from folder: %cd%
echo.
echo Starting Caddy on http://localhost:8080 ...
echo (this window must stay open while you test)
echo.

caddy.exe file-server --root . --listen :8080

echo.
echo Caddy has stopped. Press any key to close this window.
pause >nul
