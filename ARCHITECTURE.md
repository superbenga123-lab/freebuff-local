# FREEBUFF Architecture

Documento de arquitetura técnica completa do FREEBUFF.

## Princípios Fundamentais

### 1. Segurança em Camadas

```
FRONTEND (UI)
    ↓ [API/Socket]
BACKEND (Autoridade)
    ↓ [Service]
SECURITY LAYER
    ↓ [Policy Check]
SANDBOX / RESOURCE
    ↓
EXECUTION
```

**Nunca**:
- Frontend → filesystem
- Frontend → banco
- Frontend → llama.cpp
- Frontend → processos

### 2. Project Isolation

Cada projeto é completamente isolado por `projectId`:
- Files
- Graph
- RAG
- Memory
- Tasks
- Extensions

### 3. Job-Oriented

Toda operação é um **Job**:
- CHAT → Job(AI_CHAT)
- EDIT → Job(FILE_WRITE)
- TEST → Job(TEST_RUN)
- AGENT → Job(AGENT_TASK)

Jobs têm:
- Priority queue
- Dependencies
- Resource limits
- Cancellation
- Retry logic
- Checkpoints
- Recovery

### 4. Event-Driven

Arquitetura centrada em eventos com ordering garantido.

## Sistema de Camadas

### CAMADA 1: Workbench (Frontend)

```
┌─────────────────────────────────────┐
│         FREEBUFF WORKBENCH          │
├──────────────┬──────────────────────┤
│   EDITOR     │    PREVIEW           │
│   EXPLORER   │    TERMINAL          │
│   TABS       ├──────────────────────┤
│   GIT        │         CHAT         │
└──────────────┴──────────────────────┘
```

### CAMADA 2: API Gateway (Backend)

```
SOCKET.IO / REST
    ↓
API ROUTER
    ├─ /api/files
    ├─ /api/projects
    ├─ /api/ai
    ├─ /api/jobs
    ├─ /api/agents
    ├─ /api/extensions
    ├─ /api/git
    ├─ /api/terminal
    ├─ /api/preview
    └─ /api/control
```

### CAMADA 3: Service Layer

- PROJECT SERVICE
- AI SERVICE
- JOB SERVICE
- AGENT SERVICE
- SECURITY SERVICE
- EXTENSION SERVICE
- FILE SERVICE
- GIT SERVICE
- TERMINAL SERVICE
- PREVIEW SERVICE

### CAMADA 4: Intelligence Layer

- CODE GRAPH (AST, symbols, calls, dependencies)
- RAG ENGINE (embeddings, ChromaDB, search)
- MEMORY ENGINE (facts, context, consolidation)
- DEBUG ENGINE (stack analysis, root cause)

### CAMADA 5: Runtime Layer

- LLAMA.CPP SERVER
- TERMINAL SESSION
- PREVIEW SERVER
- GIT INTEGRATION

### CAMADA 6: Persistence Layer

- SQLITE DATABASE
- CHROMADB
- FILE SYSTEM

## Fluxos Principais

### Fluxo 1: Abrir Projeto

```
USER SELECT FOLDER
    ↓
POST /api/projects/open
    ↓
PROJECT DISCOVERY
    ├─ Scan directory
    ├─ Detect stack
    ├─ Detect Git
    └─ Create project.json
    ↓
BOOTSTRAP JOB
    ├─ FILE_INDEX
    ├─ GRAPH_BUILD
    ├─ RAG_BUILD
    ├─ MEMORY_LOAD
    └─ GIT_LOAD
    ↓
WebSocket PROGRESS
    ↓
BASIC_READY → AI_READY → FULL_READY
```

### Fluxo 2: Editar Arquivo

```
MONACO CHANGE
    ↓
MARK DIRTY
    ↓
CTRL+S (SAVE)
    ↓
POST /api/files/write
    ↓
SECURITY CHECK
    ↓
ATOMIC WRITE
    ↓
FILE WATCHER EVENT
    ↓
BROADCAST file:changed
    ↓
UPDATE:
    ├─ Git status
    ├─ RAG index
    ├─ Graph
    └─ Memory
```

### Fluxo 3: Chat + AI

```
USER MESSAGE
    ↓
POST /api/ai/chat
    ↓
ORCHESTRATOR
    ├─ Context broker (RAG, graph, memory)
    └─ Model manager
    ↓
JOB(AI_CHAT)
    ├─ Queue
    ├─ Token accounting
    └─ Inference
    ↓
STREAMING
    WebSocket ai:token events
    ↓
COMPLETION
```

### Fluxo 4: AI Edit

```
SELECTION → Ctrl+K
    ↓
POST /api/ai/edit
    ↓
ANALYSIS
    ├─ Code understanding
    ├─ Impact analysis
    └─ Related tests
    ↓
PATCH GENERATION
    ↓
DIFF VIEW
    ↓
USER REVIEW + APPROVE
    ↓
TEST + SECURITY CHECK
    ↓
APPLY (SNAPSHOT + WRITE)
```

### Fluxo 5: Multi-Agent Task

```
USER REQUEST → PLANNER
    ↓
DECOMPOSE INTO SUBTASKS
    ↓
AGENT DAG
    ├─ Architect
    ├─ Coder
    ├─ Tester
    ├─ Security
    └─ Reviewer
    ↓
PARALLEL EXECUTION
    ↓
CONSENSUS
    ↓
FINAL VALIDATION
    ↓
USER REVIEW
    ↓
APPLY + COMMIT
```

## Segurança - Detalhes

### Capability Model

```json
{
  "files.read": {},
  "files.write": {
    "path_patterns": ["src/**"],
    "reject_patterns": ["node_modules/**"]
  },
  "terminal.run": {
    "allowed_commands": ["npm", "node"],
    "timeout_seconds": 60
  }
}
```

### Policy Evaluation

```
CAPABILITY REQUIRED
    ↓
LOAD POLICY (Global → Project → Task)
    ↓
IF NOT FOUND: DENY (default deny)
    ↓
IF FOUND:
    ├─ Check conditions
    ├─ Verify patterns
    ├─ Check approval
    └─ Check budget
    ↓
RESULT: GRANT or DENY
```

### Sandbox

```
PROCESS LAUNCH
    ↓
CREATE SANDBOX
    ├─ cwd: workspace
    ├─ env: allowlist
    ├─ capabilities: drop all
    ├─ ulimits: resource limits
    └─ timeout: 60s
    ↓
MONITOR (CPU, Memory, Files)
    ↓
ON ABUSE: SIGKILL + Cleanup
```

## Job Queue & Scheduler

```
MULTIPLE QUEUES:
    ├─ interactive (priority: 80) - Chat, Edit
    ├─ foreground (priority: 60) - Tests, Debug
    └─ background (priority: 20) - Index, Agent
    ↓
SCHEDULER
    ├─ Pick highest priority
    ├─ Check dependencies
    ├─ Allocate worker
    └─ Set timeout
    ↓
WORKER EXECUTE
    ├─ Track resource use
    ├─ Allow cancellation
    ├─ Checkpoint regularly
    └─ Stream progress
    ↓
COMPLETE / FAIL / TIMEOUT
```

## Recovery & Resilience

### Bootstrap Recovery

```
PROJECT OPEN
    ├─ Check metadata.json
    ├─ Load project version
    └─ Validate index
    ↓
IF VALID: Resume from checkpoint
    ↓
IF CORRUPTED:
    ├─ Invalidate parts
    ├─ Restart async
    └─ BASIC_READY immediately
```

### Task Recovery

```
BACKEND CRASH
    ↓
ON RESTART
    ├─ Load active jobs
    ├─ Check state
    └─ Resume or retry
```

## Performance Targets

| Operação | Target |
|----------|--------|
| Startup | < 2s |
| File Open | < 100ms |
| File Save | < 500ms |
| Autocomplete | < 300ms |
| First AI Token | < 2s |
| AI Completion (8B) | ~10-30s |
| Test Run (small) | < 5s |
| Terminal Command | < 1s |
| Preview Refresh | < 1s |

## Observabilidade

### Logs Estruturados

```json
{
  "timestamp": "2026-09-03T12:00:00.000Z",
  "level": "info",
  "module": "job-engine",
  "jobId": "job-001",
  "projectId": "project-001",
  "message": "Job started"
}
```

### Traceamento

Cada operação tem:
- `requestId` (API call)
- `taskId` (user action)
- `jobId` (background work)
- `projectId` (scope)
- `sessionId` (workspace)
- `agentId` (agent work)

## Testing Strategy

- **Unit Tests**: Individual services
- **Integration Tests**: API endpoints, DB, services
- **Security Tests**: Path traversal, capability bypass
- **Recovery Tests**: Crash simulation, state consistency
- **E2E Tests**: Real browser, backend, AI
- **Performance Tests**: Latency, memory, CPU
- **Visual Regression**: UI consistency

---

**Versão**: 1.0
**Data**: 2026-09-03
**Status**: Em desenvolvimento ativo
