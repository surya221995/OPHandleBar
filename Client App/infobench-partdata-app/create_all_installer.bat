@echo off
setlocal

:: Path to Inno Setup Compiler
set ISCC="C:\Program Files (x86)\Inno Setup 6\ISCC.exe"

:: Compile each installer script

echo Compiling deploy\ui\infobench-partdata-ui\ui.iss...
%ISCC% "deploy\ui\infobench-partdata-ui\ui.iss"

echo.
echo ✅ All installers compiled (check for any errors above).
pause
