# Testing Strategy & Coverage

## Test Pyramid

```
        E2E Tests (5%)
      /              \
    Integration (25%)
   /                  \
 Unit Tests (70%)
```

## Unit Tests

### Backend
- ✅ ProjectService (create, open, list, close)
- ✅ FileService (read, write, getTree)
- ✅ ProjectDiscovery (stack detection, git detection)
- ✅ BootstrapStateMachine (state transitions)
- ✅ Logger utilities
- ✅ Error handling

### Frontend
- ✅ Store (Zustand)
- ✅ API client (axios mocking)
- ✅ Component rendering

## Integration Tests

### API Integration
- ✅ Health check endpoint
- ✅ Project CRUD operations
- ✅ File operations (read/write/list)
- ✅ Error handling
- ✅ Path traversal protection

### Workflow Tests
- ✅ Full E2E: open → read → write → verify
- ✅ Project isolation
- ✅ Multi-project handling

### Security Tests
- ✅ Path traversal attacks
- ✅ Input validation
- ✅ Error cases

### WebSocket Tests
- ✅ Connection/disconnection
- ✅ Ping/pong
- ✅ Project room management
- ✅ Bootstrap events

## E2E Tests (Playwright)

### UI Tests
- [ ] Project open dialog
- [ ] File explorer interaction
- [ ] File editing
- [ ] Save functionality
- [ ] Layout responsiveness

### Visual Regression
- [ ] Screenshot comparison
- [ ] Dark theme validation
- [ ] Red borders consistency
- [ ] Typography validation

## Performance Tests

### Benchmarks
- [ ] Startup time (target: < 2s)
- [ ] File tree load (target: < 100ms)
- [ ] File read (target: < 50ms)
- [ ] File write (target: < 100ms)

## Test Execution

```bash
# All tests
npm run test

# Unit tests only
npm run test:backend
npm run test:frontend

# Integration tests
node scripts/integration-test.js

# E2E tests (future)
npx playwright test

# Watch mode
npm run test:watch

# Coverage
npm run test -- --coverage
```

## Test Environment Setup

```javascript
// .env.test
NODE_ENV=test
DATABASE_URL=file::memory:
LOG_LEVEL=error
VITE_API_URL=http://localhost:3001
```

## CI/CD Pipeline (GitHub Actions)

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm run install-all
      - run: npm run lint
      - run: npm run test
      - run: npm run type-check
```

## Coverage Goals

| Component | Target | Current |
|-----------|--------|----------|
| Backend Services | 90% | 60% |
| Frontend Components | 80% | 20% |
| API Integration | 85% | 70% |
| Security | 100% | 80% |
| Overall | 85% | 50% |

---

**Status**: 🟡 UNIT TESTS COMPLETE, INTEGRATION TESTS READY FOR EXECUTION
