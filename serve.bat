@echo off
REM Check for required files
if not exist "dist" (
  echo ERROR: dist folder not found in current directory
  pause
  exit /b 1
)
if not exist "caddy.exe" (
  echo ERROR: caddy.exe not found in current directory
  pause
  exit /b 1
)
REM Start Caddy file server
start "" /b caddy.exe file-server --root dist --listen :8080
REM Wait for Caddy to start
timeout /t 3 /nobreak >nul
REM Find Edge
set "EDGE_X86=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
set "EDGE_X64=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if exist "%EDGE_X86%" (
  set "EDGE=%EDGE_X86%"
) else if exist "%EDGE_X64%" (
  set "EDGE=%EDGE_X64%"
) else (
  echo ERROR: Microsoft Edge not found
  taskkill /im caddy.exe /f >nul 2>&1
  pause
  exit /b 1
)
REM Launch Edge in kiosk
"%EDGE%" --kiosk http://localhost:8080 --edge-kiosk-type=fullscreen --no-first-run
REM Stop Caddy when Edge closes
taskkill /im caddy.exe /f >nul 2>&1
