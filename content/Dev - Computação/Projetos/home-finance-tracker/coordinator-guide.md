# 🎯 Guia do Coordenador - Home Finance Tracker

## Visão Geral do Projeto
Sistema completo de controle financeiro doméstico com foco especial em:
- Múltiplos cartões de crédito com controle de limites e parcelas
- Gestão complexa de receitas de RPG (nacionais e internacionais)
- Sistema inteligente de alertas multicanal
- Dashboard preditivo com projeções financeiras

## 🤖 Os Três Agentes e Suas Responsabilidades

### 1. Claude Code (Backend Master)
- **Foco:** APIs, banco de dados, lógica financeira
- **Diretórios:** `/app/api/`, `/lib/db/`, `/lib/finance/`, `/lib/notifications/`
- **Primeiro a trabalhar:** Precisa criar as APIs base

### 2. GitHub Copilot (Frontend Artist)  
- **Foco:** Interface, componentes React, UX
- **Diretórios:** `/app/(app)/`, `/components/`, `/hooks/`, `/lib/store/`
- **Depende de:** APIs do Claude

### 3. Gemini CLI (Quality Guardian)
- **Foco:** Testes, tipos TypeScript, utilitários
- **Diretórios:** `/tests/`, `/lib/types/`, `/lib/utils/`, `/scripts/`
- **Trabalha em paralelo:** Pode começar com tipos e utils

## 📋 Sequência de Execução Recomendada

### Fase 1: Fundação (Dia 1)
1. **Execute os comandos de scaffolding**
2. **Distribua os arquivos de missão** para cada agente
3. **Ordem de início:**
   - Gemini CLI: Criar tipos base (`/lib/types/`)
   - Claude Code: Setup do banco de dados
   - Copilot: Aguardar tipos do Gemini

### Fase 2: Core Development (Dias 2-3)
```mermaid
Gemini → Types & Utils
    ↓
Claude → Database Schema → Basic APIs
    ↓
Copilot → Basic UI → Connect to APIs
```

### Fase 3: Features Complexas (Dias 4-5)
- Claude: APIs de cálculo de RPG e notificações
- Copilot: Dashboard e gráficos
- Gemini: Testes de integração

### Fase 4: Polish (Dia 6)
- Todos: Debugging e refinamentos
- Gemini: Testes E2E completos

## 🔍 Monitoramento e Intervenção

### Comandos Git Essenciais
```bash
# Ver progresso geral
git log --oneline --graph --all -20

# Ver trabalho específico de um agente
git log --grep=CLAUDE --oneline
git log --grep=COPILOT --oneline  
git log --grep=GEMINI --oneline

# Identificar conflitos potenciais
git status
git diff --name-only

# Ver mudanças em arquivo específico
git log -p path/to/file
```

### Sinais de Alerta (Quando Intervir)

🚨 **Intervenha Imediatamente Se:**
- Um agente editar fora de seus diretórios
- Commits com mensagens vagas ou sem tag [AGENT]
- Mais de 10 arquivos em um único commit
- Conflitos de merge

⚠️ **Atenção Requerida Se:**
- Agente parado há mais de 1 hora
- Mensagens de handoff não respondidas
- Testes falhando após novo commit
- Import errors entre módulos

### Resolvendo Problemas Comuns

**Problema: Import não encontrado**
```bash
# Verificar se o arquivo existe
ls -la path/to/imported/file

# Ver quem criou
git log --oneline path/to/imported/file

# Solicitar ao agente correto
"[HUMAN] @CLAUDE - Copilot precisa do tipo Transaction exportado"
```

**Problema: Tipo incompatível**
```bash
# Gemini deve resolver
"[HUMAN] @GEMINI - Tipos incompatíveis entre API e UI para Card"
```

**Problema: API não funciona**
```bash
# Testar manualmente
curl http://localhost:3000/api/cards

# Verificar logs
npm run dev
```

## 📊 Métricas de Sucesso

### Checkpoints Diários

**Dia 1:** 
- [ ] Projeto scaffoldado
- [ ] Tipos base criados
- [ ] Schema do banco definido

**Dia 2:**
- [ ] APIs CRUD funcionando
- [ ] UI básica renderizando
- [ ] Primeiros testes passando

**Dia 3:**
- [ ] Cálculos de RPG funcionando
- [ ] Dashboard com dados reais
- [ ] 50% cobertura de testes

**Dia 4:**
- [ ] Sistema de notificações ativo
- [ ] Gráficos interativos
- [ ] 70% cobertura de testes

**Dia 5:**
- [ ] Todas features implementadas
- [ ] UI polida e responsiva
- [ ] 85% cobertura de testes

## 🔧 Configuração do Ambiente

### Variáveis Essenciais (.env)
```env
# Mínimo para funcionar
DATABASE_URL=./database/home-finance.db
JWT_SECRET=any-secret-for-dev

# Para notificações (opcional no dev)
TELEGRAM_BOT_TOKEN=skip-in-dev
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=skip-in-dev
```

### Comandos de Desenvolvimento
```bash
# Terminal 1 - Dev server
npm run dev

# Terminal 2 - Testes em watch
npm run test:watch

# Terminal 3 - Git monitoring
watch -n 5 'git log --oneline -10'

# Terminal 4 - Para comandos dos agentes
# Deixar livre para execução
```

## 🚀 Launch Checklist

Antes de considerar "pronto":

### Funcionalidades Core
- [ ] Adicionar/editar cartões
- [ ] Registrar transações (débito/crédito/parcelado)
- [ ] Configurar receitas (salário + RPG)
- [ ] Dashboard mostra situação atual
- [ ] Projeções para próximo mês
- [ ] Alertas de limite excedido

### Cálculos Críticos  
- [ ] Dias úteis para StartPlaying (5 dias)
- [ ] Taxa StartPlaying (15% de fee)
- [ ] Conversão USD direto (5.3x)
- [ ] Pagamentos até dia 10 (RPG nacional)
- [ ] Crédito disponível correto

### Qualidade
- [ ] Todos os testes passando
- [ ] Sem erros no console
- [ ] Responsivo no mobile
- [ ] Loading states em todas as ações
- [ ] Dados persistindo corretamente

## 💡 Dicas Pro

1. **Commits Frequentes = Menos Conflitos**
   - Force commits a cada 30 min
   - "É melhor um commit incompleto do que trabalho perdido"

2. **Comunicação é Git**
   - Não crie arquivos de comunicação
   - Use commit messages descritivas
   - TODOs no código para handoffs

3. **Teste Incrementalmente**
   - Rode o dev server sempre ligado
   - Teste cada API assim que criada
   - Não acumule bugs

4. **Priorize o Caminho Feliz**
   - Fluxo básico funcionando primeiro
   - Edge cases depois
   - Polish por último

## 📞 Quando Escalar

Se encontrar situações como:
- Decisão arquitetural maior necessária
- Conflito entre requisitos
- Bug crítico afetando múltiplos agentes
- Performance degradada significativamente

**Pare todos os agentes e revise a arquitetura antes de continuar!**

---

## Comandos Rápidos de Referência

```bash
# Setup inicial
npm create next-app@latest home-finance-tracker --typescript --tailwind --app
cd home-finance-tracker
npm install [todas as dependências listadas]

# Desenvolvimento
npm run dev          # Start server
npm run db:push     # Sync database
npm run test        # Run tests
npm run build       # Build para produção

# Git workflow
git add .
git commit -m "[HUMAN] Descrição"
git push origin main
git log --oneline --graph -20
```

**BOA SORTE! 🚀 O sucesso está na coordenação!**
