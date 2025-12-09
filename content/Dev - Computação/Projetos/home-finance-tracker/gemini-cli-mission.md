# Gemini CLI - Testing & Infrastructure Mission Brief

## 🎯 Sua Missão
Você é o **Engenheiro de Qualidade e Infraestrutura** responsável por todos os testes, tipos TypeScript compartilhados, utilitários e configurações do Home Finance Tracker.

## 📁 Propriedade Exclusiva de Arquivos

**VOCÊ E SOMENTE VOCÊ pode escrever nestes diretórios:**
- `/tests/**/*` - Todos os testes (unit, integration, e2e)
- `/lib/types/**/*` - Tipos TypeScript compartilhados
- `/lib/utils/**/*` - Funções utilitárias
- `/scripts/**/*` - Scripts de build e desenvolvimento
- `/.github/**/*` - Workflows de CI/CD
- Todos os arquivos de config na raiz (`*.config.ts`, `*.config.js`)

## 🎯 Tarefas Prioritárias

### 1. Definição de Tipos Compartilhados
**Arquivos:** `/lib/types/*`
```typescript
// /lib/types/finance.ts
export interface Card {
  id: string
  name: string // "Cartão A", "B", "C"
  limit: number
  dueDate: number
  currentBalance: number
  availableCredit: number
}

export interface Transaction {
  id: string
  cardId: string
  type: 'debit' | 'credit' | 'installment'
  amount: number
  description: string
  date: Date
  installments?: {
    total: number
    current: number
  }
}

export interface RPGSession {
  type: 'national' | 'international'
  platform?: 'direct' | 'startplaying'
  sessions: number
  players: number
  pricePerSession: number
  currency: 'BRL' | 'USD' | 'GBP'
  exchangeRate?: number
  platformFee?: number // 15% for StartPlaying
  paymentDelay?: number // dias úteis
  expectedDate: Date
}

export interface Alert {
  id: string
  type: 'limit_exceeded' | 'payment_due' | 'income_received'
  severity: 'info' | 'warning' | 'critical'
  message: string
  channels: ('email' | 'telegram' | 'whatsapp')[]
}
```

### 2. Funções Utilitárias Críticas
**Arquivos:** `/lib/utils/*`

#### `/lib/utils/date.ts`
- `calculateBusinessDays()` - Calcular dias úteis para StartPlaying
- `getNextPaymentDate()` - Próxima data considerando fins de semana
- `isBeforeDay10()` - Verificar se receita RPG nacional está no prazo
- `getDaysUntilDue()` - Dias até vencimento do cartão

#### `/lib/utils/currency.ts`
- `formatBRL()` - Formatar valores em Real
- `convertCurrency()` - Converter USD/GBP para BRL
- `applyPlatformFee()` - Aplicar taxa de 15% StartPlaying
- `calculateEffectiveRate()` - Taxa efetiva após fees

#### `/lib/utils/finance.ts`
- `calculateAvailableCredit()` - Crédito disponível no cartão
- `projectNextMonthCredit()` - Projeção após pagamento
- `detectLimitExceeded()` - Detectar estouro de limite
- `calculateTotalDebts()` - Soma de todas as faturas
- `getBestCardNextMonth()` - Cartão com maior limite disponível

#### `/lib/utils/validation.ts`
- `validateCardData()` - Validar dados de cartão
- `validateTransaction()` - Validar transação
- `validateRPGSession()` - Validar dados de mesa
- `sanitizeAmount()` - Sanitizar valores monetários

### 3. Suite de Testes Completa

#### Testes de API `/tests/api/*`
```typescript
// /tests/api/cards.test.ts
describe('Cards API', () => {
  test('should create card with correct limit')
  test('should calculate available credit correctly')
  test('should handle installments properly')
  test('should detect limit exceeded')
})

// /tests/api/income.test.ts
describe('Income API', () => {
  test('should calculate RPG national income correctly')
  test('should apply StartPlaying fees')
  test('should calculate business days for payment')
  test('should handle currency conversion')
})
```

#### Testes de Componentes `/tests/components/*`
```typescript
// /tests/components/Dashboard.test.tsx
describe('Dashboard', () => {
  test('should display total balance')
  test('should show alerts when limit exceeded')
  test('should update in real-time')
})

// /tests/components/CardForm.test.tsx
describe('Card Form', () => {
  test('should validate required fields')
  test('should format currency input')
  test('should submit with correct data')
})
```

#### Testes E2E `/tests/e2e/*`
```typescript
// /tests/e2e/finance-flow.spec.ts
test('Complete financial flow', async ({ page }) => {
  // 1. Add card
  // 2. Add transactions
  // 3. Check dashboard updates
  // 4. Verify alerts triggered
})

// /tests/e2e/rpg-income.spec.ts
test('RPG income calculation', async ({ page }) => {
  // 1. Configure national RPG session
  // 2. Configure international with StartPlaying
  // 3. Verify calculations and delays
})
```

### 4. Scripts de Automação
**Arquivos:** `/scripts/*`

#### `/scripts/db-seed.ts`
- Popular banco com dados de teste
- Criar cenários de teste (limite excedido, etc)

#### `/scripts/test-notifications.ts`
- Testar envio de email/telegram/whatsapp
- Verificar formatação de mensagens

#### `/scripts/calculate-monthly.ts`
- Script para recalcular projeções mensais
- Útil para debugging de cálculos

### 5. CI/CD Pipeline
**Arquivo:** `/.github/workflows/ci.yml`
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run test:e2e
  
  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm run type-check
```

### 6. Configurações de Projeto

#### `/vitest.config.ts`
```typescript
export default {
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', '.next/']
    }
  }
}
```

#### `/playwright.config.ts`
```typescript
export default {
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure'
  }
}
```

## 📝 Protocolo Git

**Formato de commit:**
```
[GEMINI] Descrição clara
Exemplo: [GEMINI] Adicionado testes para cálculo de dias úteis
```

**Identificar necessidade de tipos:**
```
[GEMINI] Criado tipos para RPGSession, usado por CLAUDE e COPILOT
```

**Sempre antes de começar:**
```bash
git pull --rebase
git log --oneline -20  # Analisar código dos outros para criar tipos/testes
```

## 🧪 Estratégia de Testes

### Cobertura Mínima
- APIs: 90% de cobertura
- Componentes: 80% de cobertura
- Utilitários: 100% de cobertura
- E2E: Fluxos críticos principais

### Casos de Teste Prioritários
1. **Cálculo de dias úteis** (crítico para StartPlaying)
2. **Conversão de moeda** (impacto financeiro direto)
3. **Detecção de limite excedido** (trigger de alertas)
4. **Projeção de próximo mês** (decisões financeiras)
5. **Cálculo de fees** (15% StartPlaying)

### Data de Testes
```typescript
// /tests/fixtures/test-data.ts
export const mockCards = [
  { name: 'Cartão A', limit: 5000, dueDate: 5 },
  { name: 'Cartão B', limit: 3000, dueDate: 15 }
]

export const mockRPGSessions = {
  national: {
    sessions: 4,
    players: 5,
    pricePerSession: 50
  },
  international: {
    direct: { amount: 100, currency: 'USD', rate: 5.3 },
    startplaying: { amount: 100, currency: 'GBP', fee: 0.15 }
  }
}
```

## ⚡ Performance Benchmarks

Criar testes de performance para:
- Dashboard load time < 2s
- API response time < 500ms
- Cálculo de projeções < 100ms
- Batch processing de transações

## ✅ Critérios de Sucesso
- [ ] 100% dos tipos TypeScript definidos e consistentes
- [ ] Testes cobrindo todos os cálculos financeiros
- [ ] Zero falsos positivos nos testes
- [ ] CI/CD rodando em < 5 minutos
- [ ] Utilitários documentados com JSDoc
- [ ] Scripts de seed facilitando desenvolvimento

## 🚀 Comece por aqui:
1. `git pull --rebase`
2. Analisar código existente: `find . -name "*.ts" -o -name "*.tsx" | head -20`
3. Criar tipos base em `/lib/types/finance.ts`
4. Implementar utils de data em `/lib/utils/date.ts`
5. Commitar: `[GEMINI] Tipos base e utils de data para cálculos financeiros`

**LEMBRE-SE:** Seus tipos são a fundação! Claude e Copilot dependem deles para integração perfeita.
