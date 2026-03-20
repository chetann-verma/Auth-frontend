@echo off
REM Vercel Deployment Quick Start Script for Windows
REM This script helps verify your project is ready for Vercel deployment

echo.
echo ======================================
echo ^> Vercel Deployment Pre-Flight Check
echo ======================================
echo.

REM Check Node version
echo ^> Checking Node.js installation...
node --version
npm --version
echo.

REM Check if .env file exists
echo ^> Checking .env file...
if exist ".env" (
    echo   √ .env file exists
) else (
    echo   ! .env file not found (create from .env.example)
)
echo.

REM Check if .env.example exists
echo ^> Checking .env.example...
if exist ".env.example" (
    echo   √ .env.example exists
) else (
    echo   ! .env.example not found
)
echo.

REM Check package.json
echo ^> Checking package.json...
if exist "package.json" (
    echo   √ package.json exists
) else (
    echo   X package.json not found!
)
echo.

REM Check vite.config.js
echo ^> Checking vite.config.js...
if exist "vite.config.js" (
    echo   √ vite.config.js exists
) else (
    echo   X vite.config.js not found!
)
echo.

REM Check vercel.json
echo ^> Checking vercel.json...
if exist "vercel.json" (
    echo   √ vercel.json exists
) else (
    echo   X vercel.json not found!
)
echo.

REM Check .vercelignore
echo ^> Checking .vercelignore...
if exist ".vercelignore" (
    echo   √ .vercelignore exists
) else (
    echo   X .vercelignore not found!
)
echo.

REM Check node_modules
echo ^> Checking dependencies...
if exist "node_modules" (
    echo   √ node_modules exists
) else (
    echo   ! node_modules not found. Run: npm install
)
echo.

REM Try to build
echo ^> Testing build process...
echo   Running: npm run build
call npm run build
if "%ERRORLEVEL%" EQU "0" (
    echo   √ Build successful!
) else (
    echo   X Build failed! Fix errors before deploying
)
echo.

REM Check dist folder
echo ^> Checking build output...
if exist "dist\" (
    echo   √ dist/ folder created
    for /f %%A in ('dir /b /s dist ^| find /c /v ""') do echo   Files: %%A files
) else (
    echo   X dist/ folder not found!
)
echo.

REM Check Git status
echo ^> Checking Git status...
git rev-parse --git-dir >nul 2>&1
if "%ERRORLEVEL%" EQU "0" (
    echo   √ Git repository initialized
) else (
    echo   ! Not a Git repository. Initialize with: git init
)
echo.

echo ======================================
echo √ Pre-flight check complete!
echo.
echo Next steps:
echo 1. Verify all checks passed
echo 2. Fix any warnings shown above
echo 3. Commit changes: git add . ^&^& git commit -m "Deploy ready"
echo 4. Push to GitHub: git push origin main
echo 5. Deploy to Vercel: vercel --prod
echo.
pause
