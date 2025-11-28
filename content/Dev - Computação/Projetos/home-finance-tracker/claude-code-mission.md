# Claude Code - Backend Mission Brief

## 🎯 Sua Missão
Você é o **Arquiteto de Backend** responsável por toda a lógica de negócio, APIs, banco de dados e sistema de notificações do Home Finance Tracker.

## 📁 Propriedade Exclusiva de Arquivos

**VOCÊ E SOMENTE VOCÊ pode escrever nestes diretórios:**
- `/app/api/**/*` - Todas as rotas da API
- `/lib/db/**/*` - Schema do banco, queries e migrations
- `/lib/finance/**/*` - Lógica financeira e cálculos
- `/lib/notifications/**/*` - Sistema de alertas (email/telegram/whatsapp)
- `/.env.example` - Variáveis de ambiente necessárias
- `/middleware.ts` - Middleware de autenticação/validação

## 🎯 Tarefas Prioritárias

### 1. Setup do Banco de Dados (SQLite + Drizzle)
**Arquivos:** `/lib/db/schema.ts`, `/lib/db/index.ts`
- Tabelas: cards, transactions, income_sources, rpg_sessions, payment_schedules
- Schema para cartões com: limite, vencimento, gastos_credito, gastos_debito, parcelas
- Schema para mesas RPG: nacionais (PIX até dia 10) e internacionais (direto vs StartPlaying)
- Tracking de taxas de câmbio e fees da plataforma

### 2. API de Cartões
**Arquivos:** `/app/api/cards/*`
- POST /api/cards - Criar cartão (A, B, C personalizáveis)
- GET /api/cards - Listar todos com saldo disponível calculado
- PUT /api/cards/[id] - Atualizar limites e vencimentos
- POST /api/cards/[id]/transaction - Adicionar transação (débito/crédito/parcelado)
- GET /api/cards/[id]/forecast - Previsão de fatura futura

### 3. API de Receitas
**Arquivos:** `/app/api/income/*`
- POST /api/income/salary - Configurar salário fixo
- POST /api/income/rpg/national - Configurar mesas nacionais (jogadores × sessões × valor)
- POST /api/income/rpg/international - Configurar mesas internacionais
- GET /api/income/expected - Valores esperados até dia 10 (considera fins de semana)
- POST /api/income/rpg/startplaying - Registrar pagamento com delay de 5 dias úteis

### 4. Sistema de Cálculos Financeiros
**Arquivos:** `/lib/finance/calculator.ts`, `/lib/finance/exchange.ts`
- Cálculo de taxa de câmbio (USD 5.3x direto, GBP→BRL StartPlaying)
- Desconto de 15% do StartPlaying
- Cálculo de dias úteis para recebimento
- Projeção de saldo considerando recebimentos futuros
- Detecção de estouro de limite

### 5. Sistema de Notificações
**Arquivos:** `/lib/notifications/*`, `/app/api/alerts/*`
- Integração com email (nodemailer)
- Integração com Telegram Bot API
- Integração com WhatsApp (Twilio)
- POST /api/alerts/configure - Configurar preferências
- Trigger automático quando limite excedido
- Alerta de vencimento próximo

### 6. API de Dashboard
**Arquivos:** `/app/api/dashboard/*`
- GET /api/dashboard/summary - Total faturas, saldos, receitas esperadas
- GET /api/dashboard/next-month - Previsão próximo mês
- GET /api/dashboard/best-card - Cartão com maior limite após pagamento
- GET /api/dashboard/cash-flow - Fluxo de caixa projetado

## 📝 Protocolo Git

**Formato de commit:**
```
[CLAUDE] Descrição clara
Exemplo: [CLAUDE] Implementado schema de cartões e transações
```

**Handoff para outros agentes:**
```
[CLAUDE] API de cartões pronta, precisa de forms do COPILOT
```

**Sempre antes de começar:**
```bash
git pull --rebase
git log --oneline -20  # Ver trabalho dos outros
```

## 🔧 Configurações de Ambiente

Adicione ao `.env.example` com comentários:
```env
# Added by CLAUDE
# Database path para SQLite
DATABASE_URL=./database/home-finance.db

# Telegram notifications
TELEGRAM_BOT_TOKEN=required_for_alerts
TELEGRAM_CHAT_ID=your_chat_id

# Exchange rate API (optional but recommended)
EXCHANGE_RATE_API_KEY=for_real_time_rates
```

## 📊 Contratos de API

### Card Object
```typescript
{
  id: string,
  name: string, // "Cartão A", "Cartão B", etc
  limit: number,
  dueDate: number, // dia do mês
  currentBalance: number,
  availableCredit: number,
  debitTransactions: Transaction[],
  creditTransactions: Transaction[],
  installments: Installment[]
}
```

### RPG Session Income
```typescript
{
  type: 'national' | 'international',
  platform?: 'direct' | 'startplaying',
  sessions: number,
  players: number,
  pricePerSession: number,
  exchangeRate?: number,
  platformFee?: number,
  expectedDate: Date,
  actualReceiptDate?: Date
}
```

## ✅ Critérios de Sucesso
- [ ] Banco de dados modelando todos os cenários financeiros
- [ ] APIs calculando corretamente taxas e prazos
- [ ] Sistema de notificações funcionando para todos os canais
- [ ] Dashboard retornando dados agregados precisos
- [ ] Tratamento de fins de semana e feriados nos cálculos
- [ ] Logs detalhados para debug de cálculos financeiros

## 🚀 Comece por aqui:
1. `git pull --rebase`
2. Criar schema do banco em `/lib/db/schema.ts`
3. Implementar conexão em `/lib/db/index.ts`
4. Criar primeira API route `/app/api/cards/route.ts`
5. Commitar: `[CLAUDE] Setup inicial do banco e schema de cartões`

**LEMBRE-SE:** Você tem controle TOTAL sobre backend. Os outros dependem das suas APIs!
