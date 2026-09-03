@echo off
REM FREEBUFF Windows Build Script

echo 🔨 FREEBUFF Windows Build Script
echo ==================================
echo.

REM Check Node.js
echo ✓ Checking Node.js...
node --version
npm --version
echo.

REM Install root dependencies
echo 📦 Installing root dependencies...
if not exist node_modules (
  call npm install
) else (
  call npm ci
)
echo.

REM Build backend
echo 🔨 Building backend...
cd backend
call npm ci
cd ..
echo ✓ Backend ready
echo.

REM Build frontend
echo 🔨 Building frontend...
cd frontend
call npm ci
call npm run build
cd ..
echo ✓ Frontend built
echo.

REM Build with electron-builder
echo 🔨 Building Windows installer (NSIS)...
call npm run electron-builder -- --win --publish=never
echo.

echo ✅ Build complete!
echo 📍 Installers available in: .\release\
echo.

echo Files generated:
dir release\*.exe 2>nul || echo No executables found ^(check build log^)

pause
