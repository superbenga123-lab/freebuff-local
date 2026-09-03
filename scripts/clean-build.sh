#!/bin/bash

echo "🗑️  Cleaning build artifacts..."

rm -rf release/
rm -rf dist/
rm -rf frontend/dist/
rm -rf backend/dist/
rm -rf electron-builder-cache/
rm -rf .electron-builder/

echo "✓ Clean complete"
