#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🧪 Running backend tests...');
console.log();

try {
  execSync('vitest run backend/tests', { stdio: 'inherit' });
  console.log();
  console.log('✅ All backend tests passed!');
} catch (error) {
  console.error('❌ Tests failed');
  process.exit(1);
}
