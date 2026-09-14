@echo off
setlocal EnableExtensions
set "ROOT=%~dp0"
if /I "%RUN_AFTER_BUILD%"=="1" (set "RUN_AFTER_BUILD=1") else (set "RUN_AFTER_BUILD=0")
if /I "%~1"=="--run" set "RUN_AFTER_BUILD=1"
if /I "%~1"=="/run" set "RUN_AFTER_BUILD=1"

call "%ROOT%download-dependencies.bat"
if errorlevel 1 exit /b 1

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%ROOT%scripts\validate-repository.ps1" -Mode Build
if errorlevel 1 exit /b 1

if exist "%ROOT%build\site" rmdir /s /q "%ROOT%build\site"
mkdir "%ROOT%build\site" >nul 2>&1
if errorlevel 1 exit /b 1

xcopy "%ROOT%docs\*" "%ROOT%build\site\" /E /I /Y /Q >nul
if errorlevel 1 exit /b 1
copy "%ROOT%README.md" "%ROOT%build\site\README.md" /Y >nul
copy "%ROOT%build-manifest.json" "%ROOT%build\site\build-manifest.json" /Y >nul

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%ROOT%scripts\count-lines.ps1" -Output "build/line-count.json" > "%ROOT%build\line-count.txt"
if errorlevel 1 exit /b 1
copy "%ROOT%build\line-count.json" "%ROOT%build\site\line-count.json" /Y >nul

if not exist "%ROOT%docs\index.html" echo Site entry point pending the page implementation lane. > "%ROOT%build\site\SITE-ENTRY-PENDING.txt"
echo Build staging complete: "%ROOT%build\site"
if "%RUN_AFTER_BUILD%"=="1" explorer.exe "%ROOT%build\site"
exit /b 0
