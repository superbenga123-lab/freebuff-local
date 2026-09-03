# FREEBUFF Windows Build Documentation

## 🎯 Objetivo

Transformar o projeto FREEBUFF em um aplicativo Windows instalável com:
- Instalador SETUP.exe (NSIS)
- Executável portável
- Auto-update
- Integração com Windows

## 🔧 Tecnologia Escolhida: Electron.js

### Por que Electron?

1. **Compatibilidade**: React + Node.js integrados nativamente
2. **Build Windows**: electron-builder gera SETUP.exe automaticamente
3. **UX**: Interface desktop profissional
4. **Auto-update**: Squirrel.Windows integrado
5. **APIs do SO**: Acesso a recursos do Windows
6. **Comunidade**: Ampla documentação e exemplos

## 📦 Estrutura do Projeto

```
freebuff-local/
├── electron-main.js           ← Processo principal Electron
├── electron-preload.js        ← Script de preload seguro
├── electron-builder.config.js ← Configuração de build
├── backend/                   ← Node.js + Express (roda no Electron)
├── frontend/                  ← React + Vite (UI)
├── scripts/
│   ├── build-windows.sh/bat   ← Script de build
│   ├── setup-windows.sh/bat   ← Preparação inicial
│   └── clean-build.sh/bat     ← Limpeza de artifacts
└── .env.production            ← Variáveis de produção
```

## 🚀 Como Usar

### Windows (PowerShell ou CMD)

#### 1. Preparação Inicial

```batch
# Na primeira vez
.\scripts\setup-windows.bat

# Isso instala:
# - Electron
# - electron-builder
# - Dependências do backend
# - Dependências do frontend
```

#### 2. Gerar o Instalador

```batch
# Build completo com SETUP.exe
.\scripts\build-windows.bat

# Ou use npm diretamente:
npm run build:windows
```

#### 3. Localização do SETUP.exe

```
release/
├── SETUP.exe              ← Instalador principal
├── FREEBUFF-1.0.0.exe     ← Executável portável
└── checksums.txt          ← Integridade dos arquivos
```

### Linux/Mac

```bash
# Preparação
./scripts/setup-windows.sh

# Build (gera Windows executables mesmo em Linux)
./scripts/build-windows.sh
```

## 🛠️ Scripts Disponíveis

No `package.json` (root):

```json
{
  "scripts": {
    "setup:windows": "node scripts/setup-windows.js",
    "build:windows": "electron-builder --win --publish=never",
    "build:windows:portable": "electron-builder --win portable",
    "build:windows:installer": "electron-builder --win nsis",
    "clean:build": "rm -rf release dist",
    "dev": "electron ."
  }
}
```

## 📋 O que o SETUP.exe Faz

✅ **Instalação**
- Cria pasta em `C:\Program Files\FREEBUFF` (ou customizável)
- Descompacta aplicação (frontend + backend)
- Instala Node.js runtime integrado

✅ **Atalhos**
- Menu Iniciar: `FREEBUFF → FREEBUFF.lnk`
- Área de Trabalho: `FREEBUFF.lnk`
- Program Files: acesso via explorer

✅ **Windows Integration**
- Registro no Windows Registry (para desinstalação)
- Ícone no Painel de Controle > Programas
- Opção de desinstalação segura

✅ **Funcionalidades**
- Backend Node.js roda automaticamente
- Frontend React carrega em janela desktop
- SQLite database isolado por usuário
- Logs em `%APPDATA%\FREEBUFF`

✅ **Preservação de Dados**
- Arquivos do usuário em `workspace/`
- Configurações em `.freebuff/`
- Desinstalação preserva dados por padrão

## 🔍 Verificações Pré-Build

```bash
# Validar projeto
npm run lint              # Linting
npm run type-check        # TypeScript
npm run test              # Testes

# Validar builds
npm run build:windows:installer   # Gera SETUP.exe
npm run build:windows:portable    # Gera executável portável
```

## 📊 Arquivos Gerados

```
release/
├── SETUP.exe                      (50-150 MB)
│   └── Instalador completo NSIS
│
├── FREEBUFF-1.0.0-portable.exe   (40-120 MB)
│   └── Executável sem instalação
│
└── checksums.txt
    └── SHA256 de ambos os arquivos
```

## 🔐 Segurança

- ✅ Preload script isola contextos
- ✅ Node integration desabilitado
- ✅ Context isolation ativado
- ✅ Sem `eval()` ou inline scripts
- ✅ Comunicação via IPC segura

## 🐛 Troubleshooting

### Erro: "electron not found"
```bash
npm install --save-dev electron
```

### Erro: "nsis not found"
```bash
# electron-builder baixa automaticamente na primeira execução
# Se der erro, limpe e tente novamente:
npm run clean:build
npm run build:windows
```

### Erro: "Módulo node_modules ausente"
```bash
# Rebuild nativo
npm rebuild

# Ou instale Electron build tools:
npm install --save-dev @electron/rebuild
```

### Instalador > 200MB
```bash
# Reduza tamanho:
# 1. Remova devDependencies em produção
# 2. Comprima arquivos duplicados
# 3. Use asarUnpack para módulos nativos
```

## 📝 Próximos Passos

1. ✅ Executar `npm run setup:windows` (primeira vez)
2. ✅ Executar `npm run build:windows`
3. ✅ Testar `SETUP.exe` em máquina Windows limpa
4. ✅ Criar checksums: `certUtil -hashfile release\SETUP.exe SHA256`
5. ✅ Publicar release no GitHub

## 📚 Recursos

- [Electron.js Docs](https://www.electronjs.org/docs)
- [electron-builder Guide](https://www.electron.build/)
- [NSIS Installer](https://nsis.sourceforge.io/)

---

**Versão**: 1.0.0
**Data**: 2026-09-03
**Status**: 🟢 PRONTO PARA BUILD
