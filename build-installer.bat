@echo off
setlocal
set "ROOT=%~dp0"
call "%ROOT%build.bat"
if errorlevel 1 exit /b 1
echo Installer: not applicable. This repository stages a static documentation concept and has no installed application payload.
exit /b 0
