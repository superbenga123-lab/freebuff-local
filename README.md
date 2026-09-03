# FREEBUFF Local

IDE local estilo Cursor/VS Code com IA completamente offline.

## Características

- **IDE Completo**: Editor Monaco, Explorer, Tabs, Terminal integrado
- **IA Local**: Integração llama.cpp + modelos GGUF (Llama 3.1 8B)
- **RAG Local**: Embeddings Nomic + ChromaDB
- **Git Integrado**: Status, diff, commit
- **Chat IA**: Streaming em tempo real
- **AI Edit**: Sugestões de código com diff
- **Autocomplete**: Inteligente e local
- **Terminal**: Sandbox seguro
- **Preview**: Dev server integrado
- **Agents**: Multi-agent autonomous coding
- **Extensions**: Sistema de plugins seguro
- **Recovery**: Recuperação de falhas automática
- **Security**: Sandbox, permissões, auditoria

## Stack

### Frontend
- React 19
- Vite
- TypeScript
- Monaco Editor
- TailwindCSS
- Socket.io Client
- Zustand (estado)

### Backend
- Node.js + Express
- Socket.io
- SQLite3 + better-sqlite3
- Prisma ORM
- llama.cpp (via HTTP)
- ChromaDB Local
- Bull (Job queue)

### IA
- Modelo: Llama 3.1 8B GGUF
- Runtime: llama.cpp
- Embeddings: Nomic Embed Text
- Banco Vetorial: ChromaDB Local

## Instalação Rápida

### Pré-requisitos
- Node.js >= 18
- npm >= 9
- Git
- ~8GB RAM
- ~20GB disco

### Setup

```bash
# Clone
git clone https://github.com/superbenga123-lab/freebuff-local.git
cd freebuff-local

# Instale dependências
npm run install-all

# Crie arquivo .env
cp .env.example .env

# Dev
npm run dev

# Frontend: http://localhost:5173
# Backend: http://localhost:3001
```

## Estrutura

```
freebuff-local/
├── frontend/                # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── store/
│   │   ├── workbench/
│   │   └── extensions/
│   └── package.json
│
├── backend/                # Node.js + Express
│   ├── src/
│   │   ├── api/
│   │   ├── services/
│   │   ├── database/
│   │   ├── llama/
│   │   ├── rag/
│   │   ├── graph/
│   │   ├── jobs/
│   │   ├── agents/
│   │   ├── extensions/
│   │   ├── security/
│   │   ├── sandbox/
│   │   ├── recovery/
│   │   └── websocket/
│   └── package.json
│
├── models/                 # LLM models (GGUF)
├── workspace/              # Projetos do usuário
├── chromadb/               # Vector DB local
├── docker/                 # Docker configs
└── tests/                  # E2E tests
```

## Desenvolvimento

```bash
# Desenvolver frontend
npm run dev:frontend

# Desenvolver backend
npm run dev:backend

# Build
npm run build

# Testes
npm run test

# Lint
npm run lint

# Type check
npm run type-check
```

## Docker

```bash
docker-compose up -d
```

## Fluxo Principal

```
OPEN PROJECT
    ↓
BOOTSTRAP (Discovery + Stack Detection)
    ↓
BASIC_READY (Editor aberto)
    ↓
INDEX FILES (Async)
    ↓
RAG + GRAPH (Background)
    ↓
FULL_READY
    ↓
EDIT → SAVE → GIT → CHAT → @codebase → AI EDIT → TEST → DEBUG → AGENT → COMMIT → PREVIEW
```

## Status de Desenvolvimento

### ETAPA 65 - PROJECT BOOTSTRAP
- [ ] Project discovery
- [ ] Stack detection
- [ ] File indexing
- [ ] Graph building
- [ ] RAG initialization
- [ ] Memory loading
- [ ] Git initialization
- [ ] Readiness levels

### ETAPA 66 - WORKBENCH
- [ ] Unified workspace
- [ ] Editor integration
- [ ] Chat integration
- [ ] AI Edit pipeline
- [ ] Test intelligence
- [ ] Debug engine
- [ ] Git integration
- [ ] Terminal integration
- [ ] Preview integration

### ETAPA 67 - EXTENSIONS
- [ ] Extension registry
- [ ] Extension manifest
- [ ] Permission engine
- [ ] Sandbox isolation
- [ ] Extension loader
- [ ] Extension runtime

### ETAPA 68 - MARKETPLACE
- [ ] Marketplace client
- [ ] Package management
- [ ] Trust & supply chain
- [ ] Signature verification
- [ ] Security scanning

### ETAPA 69 - JOB ENGINE
- [ ] Job queue
- [ ] Scheduler
- [ ] Worker pool
- [ ] Resource manager
- [ ] Task dependencies
- [ ] Recovery

### ETAPA 70 - MULTI-AGENT
- [ ] Agent registry
- [ ] Task decomposition
- [ ] Agent coordination
- [ ] Conflict resolution
- [ ] Result aggregation

### ETAPA 71 - CODE GRAPH
- [ ] AST processing
- [ ] Symbol resolution
- [ ] Call graph
- [ ] Dependency graph
- [ ] Impact analysis

## Testes

```bash
# Unit tests
npm run test:backend

# Integration tests
npm run test:backend -- --grep integration

# E2E tests (Playwright)
cd tests/e2e
npx playwright test
```

## Performance

| Operação | Target |
|----------|--------|
| Startup | < 2s |
| File Open | < 100ms |
| Autocomplete | < 300ms |
| First AI Token | < 2s |
| AI Completion | ~10-30s |

## Segurança

- Frontend não acessa filesystem/banco/llama
- Backend é autoridade central
- Sandbox para terminal/preview/agentes
- Capability system para permissões
- Audit logging completo
- Extension sandbox

## Extensões

Criar em `~/.freebuff/extensions/`:

```json
{
  "name": "my-extension",
  "version": "1.0.0",
  "main": "index.js",
  "capabilities": ["commands", "panels"]
}
```

## Troubleshooting

### Llama.cpp não inicia
```bash
lsof -i :8080
LLAMA_PORT=8081 npm run dev
```

### Banco de dados corrompido
```bash
rm backend/.freebuff/state.db
npm run dev
```

## Suporte

- Issues: https://github.com/superbenga123-lab/freebuff-local/issues
- Discussions: https://github.com/superbenga123-lab/freebuff-local/discussions

## License

MIT

---

**Status**: Em desenvolvimento ativo (ETAPA 65-71)
