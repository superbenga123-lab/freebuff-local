#!/bin/bash

set -e

echo "🔨 FREEBUFF Windows Build Script"
echo "=================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
node --version
npm --version
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
if [ ! -d "node_modules" ]; then
  npm install
else
  npm ci
fi
echo ""

# Build backend
echo "🔨 Building backend..."
cd backend
npm ci
cd ..
echo "✓ Backend ready"
echo ""

# Build frontend
echo "🔨 Building frontend..."
cd frontend
npm ci
npm run build
cd ..
echo "✓ Frontend built"
echo ""

# Build with electron-builder
echo "🔨 Building Windows installer (NSIS)..."
npm run electron-builder -- --win --publish=never
echo ""

echo "✅ Build complete!"
echo "📍 Installers available in: ./release/"
echo ""
echo "Files generated:"
ls -lh release/*.exe 2>/dev/null || echo "No executables found (check build log)"
