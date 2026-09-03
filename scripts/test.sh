#!/bin/bash

set -e

echo "🧪 Running test suite"
echo "====================="
echo ""

echo "Backend unit tests:"
npm run test:backend
echo ""

echo "Frontend unit tests:"
npm run test:frontend
echo ""

echo "✅ All tests passed!"
