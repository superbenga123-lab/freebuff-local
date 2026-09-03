#!/bin/bash

set -e

echo "🚀 FREEBUFF Local - Full Stack Setup"
echo "======================================"
echo ""

# Check Node.js
echo "✓ Checking Node.js version..."
node --version
npm --version
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all
echo ""

# Create directories
echo "📁 Creating project directories..."
mkdir -p workspace models chromadb .freebuff logs backend/logs
echo ""

# Setup environment
echo "⚙️  Setting up environment..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env file from .env.example"
fi
echo ""

# Database
echo "💾 Initializing database..."
node backend/scripts/init-db.js 2>/dev/null || echo "⚠️  Database already initialized"
echo ""

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "  1. npm run dev              - Start development servers"
echo "  2. http://localhost:5173    - Open frontend"
echo "  3. http://localhost:3001    - Backend API"
echo ""
