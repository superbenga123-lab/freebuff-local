# FREEBUFF Development Guide

## Quick Start

### Option 1: Local Development (Recommended)

```bash
# Setup
chmod +x scripts/*.sh
./scripts/setup.sh

# Run
npm run dev

# Open
http://localhost:5173  # Frontend
http://localhost:3001  # Backend
```

### Option 2: Docker

```bash
# Build
./scripts/docker-build.sh

# Run
docker-compose up
```

## Project Structure

```
freebuff-local/
├── frontend/          # React + Vite
├── backend/           # Node.js + Express
├── models/            # LLM models (GGUF)
├── workspace/         # User projects
├── chromadb/          # Vector DB
├── docker/            # Docker configs
├── scripts/           # Utility scripts
└── tests/             # E2E tests
```

## Environment Variables

See `.env.example` for all available options:

```bash
cp .env.example .env
```

## Running Tests

```bash
# All tests
npm run test

# Backend only
npm run test:backend

# Frontend only
npm run test:frontend

# Watch mode
npm run test:watch
```

## Building

```bash
# Build all
npm run build

# Build frontend only
cd frontend && npm run build

# Build backend only
cd backend && npm run build
```

## Linting

```bash
# Lint all
npm run lint

# Type check
npm run type-check
```

## Database

```bash
# View database
sqlite3 .freebuff/state.db

# Reset database
npm run db:reset

# Migrate
npm run db:migrate
```

## Debugging

### Backend

```bash
# Debug with inspector
node --inspect src/server.js

# Chrome DevTools
chrome://inspect
```

### Frontend

```bash
# React DevTools browser extension
# Redux DevTools (if used)
```

## Common Issues

### Port already in use

```bash
# Change port in .env
PORT=3002

# Or kill the process
lsof -i :3001
kill -9 <PID>
```

### Database locked

```bash
# Reset database
npm run db:reset
```

### Module not found

```bash
# Reinstall dependencies
npm run install-all
```

## Contributing

1. Create feature branch
2. Make changes
3. Run tests
4. Submit PR

## Performance

Monitor performance with:

```bash
# Backend metrics
http://localhost:3001/metrics

# Chrome DevTools
F12 → Performance tab
```

---

**Need help?** Check ARCHITECTURE.md or open an issue.
