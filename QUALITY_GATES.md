# FREEBUFF - Quality Gates & Testing

## Pre-Commit Checklist

- [ ] Code builds without errors
- [ ] No console errors/warnings
- [ ] All tests pass
- [ ] Linting passes
- [ ] TypeScript strict mode passes
- [ ] No hardcoded credentials
- [ ] No TODO comments in final commits

## Test Coverage Requirements

### Backend
- [ ] ProjectService tests
- [ ] FileService tests
- [ ] ProjectDiscovery tests
- [ ] API endpoint tests
- [ ] Database tests
- [ ] Error handling tests

### Frontend
- [ ] Component unit tests
- [ ] Store tests
- [ ] API client tests
- [ ] Integration tests
- [ ] Visual regression tests

## Performance Benchmarks

| Operation | Target | Status |
|-----------|--------|--------|
| Startup | < 2s | ⏳ |
| File Open | < 100ms | ⏳ |
| File Save | < 500ms | ⏳ |
| Autocomplete | < 300ms | ⏳ |
| First AI Token | < 2s | ⏳ |
| RAG Index | < 30s | ⏳ |
| Graph Build | < 10s | ⏳ |

## Security Checklist

- [ ] No path traversal vulnerabilities
- [ ] Input validation on all endpoints
- [ ] CORS properly configured
- [ ] No hardcoded secrets
- [ ] SQL injection protection
- [ ] Rate limiting (TODO)
- [ ] HTTPS in production (TODO)

## Browser Compatibility

- [ ] Chrome 120+
- [ ] Firefox 121+
- [ ] Safari 17+
- [ ] Edge 120+

## Platform Support

- [ ] Linux (Ubuntu 22+)
- [ ] macOS (13+)
- [ ] Windows 11

## Accessibility

- [ ] WCAG 2.1 Level AA
- [ ] Screen reader compatible
- [ ] Keyboard navigation
- [ ] Color contrast ✓

---

**Status**: 🟡 Foundation Phase - Core infrastructure in place, tests pending integration
