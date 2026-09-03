#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
from 'fs';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

console.log('🧪 Running Integration Tests...');
console.log('================================\n');

// Start backend
console.log('📦 Starting backend server...');
const backend = spawn('node', ['src/server.js'], {
  cwd: path.join(rootDir, 'backend'),
  env: { ...process.env, NODE_ENV: 'test' }
});

// Wait for backend to start
await new Promise((resolve) => setTimeout(resolve, 2000));

console.log('✅ Backend started\n');

// Run tests
const test = spawn('npm', ['run', 'test'], {
  cwd: rootDir,
  stdio: 'inherit'
});

test.on('close', (code) => {
  // Kill backend
  backend.kill();

  console.log('\n✅ Integration tests complete');
  process.exit(code);
});
