#!/bin/bash

set -e

echo "⚙️  Setting up FREEBUFF for Windows Build"
echo "=========================================="
echo ""

echo "Step 1: Install Electron and build tools..."
npm install --save-dev electron electron-builder electron-is-dev
echo "✓ Electron installed"
echo ""

echo "Step 2: Make scripts executable..."
chmod +x scripts/*.sh
echo "✓ Scripts ready"
echo ""

echo "Step 3: Create assets directory..."
mkdir -p assets
echo "✓ Assets directory created"
echo ""

echo "Step 4: Install backend dependencies..."
cd backend
npm ci || npm install
cd ..
echo "✓ Backend dependencies installed"
echo ""

echo "Step 5: Install frontend dependencies..."
cd frontend
npm ci || npm install
cd ..
echo "✓ Frontend dependencies installed"
echo ""

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. ./scripts/build-windows.sh (Linux/Mac)"
echo "2. .\\scripts\\build-windows.bat (Windows)"
echo ""
