@echo off
setlocal enabledelayedexpansion

REM Save the root directory
set "ROOT_DIR=%CD%"


REM === Main Logic ===
echo Building all applications...

if "%~1"=="" (
    REM No argument: build all
    call :build_app infobench-partdata-ui
  
) else (
    REM Build specified application
    call :build_app %~1
)


REM Function to build individual app
:build_app
set "APP=%~1"
echo Building %APP%...

if "%APP%"=="infobench-partdata-ui" (
    cd /d "%ROOT_DIR%\Frontend\infobench-partdata-ui"
    call npm run build
)else (
    echo Unknown application: %APP%
)

cd /d "%ROOT_DIR%"
exit /b

echo Build process completed.
pause
