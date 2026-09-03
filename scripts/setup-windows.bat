@echo off

echo ⚙️  Setting up FREEBUFF for Windows Build
echo =========================================
echo.

echo Step 1: Install Electron and build tools...
call npm install --save-dev electron electron-builder electron-is-dev
echo ✓ Electron installed
echo.

echo Step 2: Create assets directory...
if not exist assets mkdir assets
echo ✓ Assets directory created
echo.

echo Step 3: Install backend dependencies...
cd backend
call npm ci || call npm install
cd ..
echo ✓ Backend dependencies installed
echo.

echo Step 4: Install frontend dependencies...
cd frontend
call npm ci || call npm install
cd ..
echo ✓ Frontend dependencies installed
echo.

echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. .\scripts\build-windows.bat (Windows)
echo 2. Or: npm run build:windows
echo.

pause
