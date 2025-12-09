# 📜 Contratos de API - Home Finance Tracker v1.0

## 🎯 Sobre Este Documento

Este é o **CONTRATO CENTRAL** que TODOS os agentes devem seguir. Define todas as APIs, tipos, e regras de negócio ANTES de começar o desenvolvimento.

## 📊 Tipos Base (TypeScript)

```typescript
// Enums Globais
type TransactionType = 'debit' | 'credit_full' | 'credit_installment'
type AlertChannel = 'email' | 'telegram' | 'whatsapp'
type AlertSeverity = 'info' | 'warning' | 'critical'
type Currency = 'BRL' | 'USD' | 'GBP' | 'EUR'
type RPGPlatform = 'direct' | 'startplaying' | 'pix'
type RPGType = 'national' | 'international'
type IncomeStatus = 'confirmed' | 'expected' | 'late' | 'received'

// Tipos Complexos
interface Money {
  amount: number
  currency: Currency
  exchangeRate?: number
  effectiveRate?: number // após taxas
}

interface DateRange {
  start: Date
  end: Date
  businessDaysOnly?: boolean
}

interface BankAccount {
  id: string
  name: string
  bank: string
  agency: string
  account: string
  balance: number
  type: 'checking' | 'savings'
}
```

## 🔌 Endpoints de API

### 1. CARDS API

#### POST /api/v1/cards

```yaml
request:
  body:
    name: string # "Cartão A", "Cartão B", etc
    limit: number
    dueDate: number # 1-31
    closingDate: number # 1-31
    brand: string # "Visa", "Mastercard", etc
    bankAccountId: string
    color?: string # Para UI

response:
  201:
    id: string
    name: string
    limit: number
    currentBalance: number
    availableCredit: number
    futureInstallments: Array<{
      month: string # "2024-11"
      amount: number
    }>
    created_at: Date

example:
  request:
    name: "Cartão Itaú"
    limit: 5000
    dueDate: 5
    closingDate: 25
    brand: "Mastercard"
    bankAccountId: "acc_001"
    
  response:
    id: "card_abc123"
    name: "Cartão Itaú"
    limit: 5000
    currentBalance: 1200
    availableCredit: 3800
    futureInstallments: [
      { month: "2024-11", amount: 300 },
      { month: "2024-12", amount: 300 }
    ]
```

#### GET /api/v1/cards

```yaml
response:
  200:
    cards: Array<Card>
    summary:
      totalLimit: number
      totalUsed: number
      totalAvailable: number
      nextDueDate: Date
      nextDueAmount: number
```

#### GET /api/v1/cards/{id}/forecast

```yaml
parameters:
  months: number # quantos meses projetar

response:
  200:
    forecasts: Array<{
      month: string
      expectedBill: number
      committedInstallments: number
      availableAfterPayment: number
    }>
```

### 2. TRANSACTIONS API

#### POST /api/v1/transactions

```yaml
request:
  body:
    cardId: string
    type: TransactionType
    amount: number
    description: string
    category: string
    date: Date
    installments?: {
      total: number
      value: number # valor por parcela
    }
    tags?: string[]

response:
  201:
    id: string
    cardId: string
    type: TransactionType
    amount: number
    installmentInfo?: {
      current: number
      total: number
      remaining: number
    }
    
example:
  request:
    cardId: "card_abc123"
    type: "credit_installment"
    amount: 1200
    description: "TV Samsung"
    category: "Eletrônicos"
    installments: {
      total: 12
      value: 100
    }
```

### 3. INCOME API

#### POST /api/v1/income/salary

```yaml
request:
  body:
    amount: number
    payDay: number # dia do mês
    bankAccountId: string
    description: string

response:
  201:
    id: string
    type: "salary"
    amount: number
    nextPayment: Date
    bankAccountId: string
```

#### POST /api/v1/income/rpg/session

```yaml
request:
  body:
    name: string # "Mesa D&D Quinta"
    type: RPGType
    platform: RPGPlatform
    players: number
    sessionsPerMonth: number
    pricePerSession: Money
    paymentDay?: number # para nacionais
    processingDays?: number # para startplaying
    platformFee?: number # porcentagem
    
response:
  201:
    id: string
    name: string
    monthlyExpected: Money
    nextPayment: {
      date: Date
      amount: Money
      status: IncomeStatus
    }
    
example:
  request:
    name: "Mesa Internacional StartPlaying"
    type: "international"
    platform: "startplaying"
    players: 4
    sessionsPerMonth: 4
    pricePerSession: {
      amount: 25
      currency: "USD"
    }
    processingDays: 5
    platformFee: 0.15
    
  response:
    monthlyExpected: {
      amount: 400
      currency: "USD"
      effectiveRate: 4.505 # 5.3 * 0.85
    }
    nextPayment: {
      date: "2024-11-15"
      amount: { amount: 1802, currency: "BRL" }
      status: "expected"
    }
```

#### GET /api/v1/income/calendar

```yaml
parameters:
  month: string # "2024-11"
  
response:
  200:
    calendar: Array<{
      date: Date
      incomes: Array<{
        id: string
        type: string
        amount: Money
        status: IncomeStatus
        source: string
      }>
    }>
    summary:
      confirmed: Money
      expected: Money
      late: Money
      total: Money
```

### 4. DASHBOARD API

#### GET /api/v1/dashboard

```yaml
response:
  200:
    cards:
      totalLimit: number
      totalUsed: number
      totalAvailable: number
      bestNextMonth: {
        cardId: string
        cardName: string
        availableCredit: number
      }
    
    bankAccounts:
      total: number
      accounts: Array<{
        name: string
        balance: number
      }>
    
    income:
      thisMonth:
        received: number
        expected: number
        late: number
      nextMonth:
        projected: number
    
    alerts: Array<{
      severity: AlertSeverity
      message: string
      action?: string
    }>
    
    cashFlow:
      projection: Array<{
        date: Date
        balance: number
        ins: number
        outs: number
      }>
```

### 5. ALERTS API

#### POST /api/v1/alerts/settings

```yaml
request:
  body:
    channels: AlertChannel[]
    thresholds:
      limitWarning: number # 0.8 = 80%
      limitCritical: number # 0.95 = 95%
      dueDateWarning: number # dias antes
    schedule:
      immediate: string[] # tipos de alerta
      daily: string[]
      weekly: string[]
    contacts:
      email?: string
      phone?: string
      telegramChatId?: string

response:
  200:
    settings: AlertSettings
    testSent: boolean
```

#### GET /api/v1/alerts/history

```yaml
parameters:
  limit: number
  offset: number
  
response:
  200:
    alerts: Array<{
      id: string
      timestamp: Date
      severity: AlertSeverity
      message: string
      channels: AlertChannel[]
      delivered: boolean
      error?: string
    }>
    total: number
```

### 6. REPORTS API

#### GET /api/v1/reports/tax

```yaml
parameters:
  year: number
  
response:
  200:
    income:
      national: Money
      international: Money
      salary: Money
      total: Money
    
    internationalDetails: Array<{
      month: string
      amount: Money
      originalCurrency: Currency
      exchangeRate: number
      brlAmount: number
      source: string
    }>
    
    suggestedTax: {
      carneLeao: number
      message: string
    }
```

## 🔒 Regras de Negócio

### Cálculo de Dias Úteis

```javascript
function calculateBusinessDays(startDate, days) {
  // Considera:
  // - Fins de semana
  // - Feriados nacionais brasileiros
  // - Feriados bancários
  // Fonte: API do Banco Central ou tabela hardcoded
}
```

### Conversão de Moeda

```javascript
function convertCurrency(amount, from, to) {
  const rates = {
    'USD_BRL_DIRECT': 5.3,      // Transferência direta
    'USD_BRL_PLATFORM': 4.505,  // 5.3 * 0.85 (StartPlaying)
    'GBP_BRL_PLATFORM': 5.406,  // 6.36 * 0.85
  }
  // Armazena taxa usada para declaração de imposto
}
```

### Detecção de Limite

```javascript
function checkLimitStatus(card) {
  const used = card.currentBalance + card.futureInstallments
  const available = card.limit - used
  
  if (available < 0) return 'EXCEEDED'
  if (available < card.limit * 0.1) return 'CRITICAL'
  if (available < card.limit * 0.2) return 'WARNING'
  return 'OK'
}
```

### Projeção de RPG

```javascript
function projectRPGIncome(session, month) {
  let amount = session.players * session.sessions * session.price
  
  // Ajustes
  if (session.platform === 'startplaying') {
    amount *= 0.85 // Platform fee
    paymentDate = addBusinessDays(sessionDate, 5)
  }
  
  if (session.type === 'national') {
    paymentDate = min(dayjs().date(10), nextBusinessDay)
  }
  
  return { amount, paymentDate, confidence }
}
```

## 🧪 Mock Responses

### Mock Dashboard Response

```json
{
  "cards": {
    "totalLimit": 15000,
    "totalUsed": 4500,
    "totalAvailable": 10500,
    "bestNextMonth": {
      "cardId": "card_002",
      "cardName": "Cartão B",
      "availableCredit": 4000
    }
  },
  "bankAccounts": {
    "total": 8750.32,
    "accounts": [
      { "name": "Itaú Corrente", "balance": 5500.00 },
      { "name": "Nubank", "balance": 3250.32 }
    ]
  },
  "income": {
    "thisMonth": {
      "received": 6000,
      "expected": 2400,
      "late": 0
    }
  },
  "alerts": [
    {
      "severity": "warning",
      "message": "Cartão A: 85% do limite utilizado",
      "action": "review_transactions"
    }
  ]
}
```

## 📐 Validações

### Validação de Cartão

```javascript
const cardSchema = {
  name: { required: true, minLength: 1, maxLength: 50 },
  limit: { required: true, min: 100, max: 1000000 },
  dueDate: { required: true, min: 1, max: 31 },
  closingDate: { required: true, min: 1, max: 31 }
}
```

### Validação de Transação

```javascript
const transactionSchema = {
  amount: { required: true, min: 0.01 },
  description: { required: true, maxLength: 200 },
  installments: {
    total: { min: 2, max: 48 },
    value: { min: 0.01 }
  }
}
```

## 🎮 Estados e Transições

### Estados de Pagamento RPG

```
CONFIGURED → EXPECTED → LATE → RECEIVED
                ↓
            CANCELLED
```

### Estados de Alerta

```
TRIGGERED → SENT → DELIVERED → ACKNOWLEDGED
                ↓       ↓
            FAILED   IGNORED
```

## 📝 Notas Importantes

1. **Todas as datas/horas em UTC** - Frontend converte para timezone local
2. **Valores monetários em centavos** - Evita problemas de float
3. **Soft delete sempre** - Nunca deletar dados, apenas marcar como deleted_at
4. **Versionamento obrigatório** - Todas as APIs em /v1/
5. **Rate limiting** - 100 requests/minute por IP
6. **Cache headers** - Dashboard: 60s, Transactions: 0s
7. **Paginação padrão** - limit=20, offset=0

## ✅ Checklist de Implementação

Cada agente DEVE:

- [ ] Ler este contrato COMPLETO antes de começar
- [ ] Implementar EXATAMENTE estas interfaces
- [ ] Usar os mock responses para desenvolvimento
- [ ] Validar TODOS os inputs
- [ ] Retornar EXATAMENTE estes formatos
- [ ] Documentar qualquer desvio

**ESTE CONTRATO É LEI! Mudanças apenas via consenso de TODOS os agentes.**