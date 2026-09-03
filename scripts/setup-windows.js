#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('⚙️  Setting up FREEBUFF for Windows Build');
console.log('=========================================');
console.log('');

const isWindows = process.platform === 'win32';
const shell = isWindows ? 'cmd.exe' : '/bin/bash';
const args = isWindows ? ['/c', 'npm install --save-dev electron electron-builder electron-is-dev'] : ['-c', 'npm install --save-dev electron electron-builder electron-is-dev'];

const proc = spawn(shell, args, { stdio: 'inherit' });

proc.on('close', (code) => {
  if (code === 0) {
    console.log('✓ Setup complete!');
    console.log('');
    console.log('Next steps:');
    console.log('  1. npm run build:windows');
    console.log('  2. Find SETUP.exe in ./release/');
  } else {
    console.error('Setup failed');
    process.exit(1);
  }
});
