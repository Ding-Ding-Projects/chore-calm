@echo off
setlocal
set "ROOT=%~dp0"
set "SILENT_MODE=0"
if /I "%~1"=="/s" set "SILENT_MODE=1"
if /I "%~1"=="--silent" set "SILENT_MODE=1"
if "%SILENT%"=="1" set "SILENT_MODE=1"

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$m = Get-Content -Raw -LiteralPath '%ROOT%build-manifest.json' | ConvertFrom-Json; if (@($m.dependencies).Count -ne 0) { throw 'The committed manifest is no longer dependency-free.' }"
if errorlevel 1 exit /b 1

if "%SILENT_MODE%"=="0" echo Dependencies: none. No network access or installation is required.
exit /b 0
