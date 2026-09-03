@echo off
echo 🗑️  Cleaning build artifacts...

if exist release rmdir /s /q release
if exist dist rmdir /s /q dist
if exist frontend\dist rmdir /s /q frontend\dist
if exist backend\dist rmdir /s /q backend\dist
if exist electron-builder-cache rmdir /s /q electron-builder-cache
if exist .electron-builder rmdir /s /q .electron-builder

echo ✓ Clean complete

pause
