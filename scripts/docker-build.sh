#!/bin/bash

set -e

echo "🐳 Building Docker images"
echo "========================="
echo ""

docker-compose build

echo ""
echo "✅ Build complete!"
echo ""
echo "To start: docker-compose up"
