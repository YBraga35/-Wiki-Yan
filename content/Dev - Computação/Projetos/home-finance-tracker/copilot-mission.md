# GitHub Copilot - Frontend Mission Brief

## 🎯 Sua Missão
Você é o **Arquiteto de UI/UX** responsável por toda a interface, componentes React, hooks customizados e gerenciamento de estado do Home Finance Tracker.

## 📁 Propriedade Exclusiva de Arquivos

**VOCÊ E SOMENTE VOCÊ pode escrever nestes diretórios:**
- `/app/(app)/**/*` - Todas as páginas e layouts da aplicação
- `/components/**/*` - Todos os componentes React
- `/hooks/**/*` - Hooks customizados
- `/lib/store/**/*` - Stores do Zustand
- `/styles/**/*` - Estilos customizados além do Tailwind

## 🎯 Tarefas Prioritárias

### 1. Layout Principal e Navegação
**Arquivos:** `/app/(app)/layout.tsx`, `/components/navigation/*`
- Sidebar com navegação: Dashboard, Cartões, Receitas, Transações, Alertas
- Header com saldo total visível sempre
- Indicador de alertas/notificações
- Design responsivo mobile-first
- Tema escuro/claro com Radix UI

### 2. Dashboard Principal
**Arquivos:** `/app/(app)/dashboard/page.tsx`, `/components/dashboard/*`
- Card de resumo: Total faturas do mês
- Card de saldos: Soma de todas as contas com breakdown
- Card de receitas esperadas até dia 10
- Gráfico de fluxo de caixa (Recharts)
- Widget "Melhor cartão próximo mês" com barra de progresso
- Alertas urgentes em destaque

### 3. Gestão de Cartões
**Arquivos:** `/app/(app)/cards/*`, `/components/cards/*`
- Lista de cartões com barras de uso (usado/disponível)
- Modal para adicionar novo cartão (A, B, C...)
- Form de transação rápida: tipo (débito/crédito/parcelado)
- Visualização de parcelas ativas
- Editor de limite e data de vencimento inline
- Previsão de fatura com breakdown de gastos

### 4. Controle de Receitas RPG
**Arquivos:** `/app/(app)/income/*`, `/components/income/*`
- Configuração de salário fixo com data
- **Seção Mesas Nacionais:**
  - Form: número de sessões × jogadores × valor
  - Indicador "Pago até dia 10 via PIX"
- **Seção Mesas Internacionais:**
  - Toggle: Pagamento direto vs StartPlaying
  - Calculadora de conversão em tempo real
  - Timeline mostrando delay de 5 dias úteis
  - Comparativo de taxas (direto 5.3x vs StartPlaying -15%)

### 5. Centro de Transações
**Arquivos:** `/app/(app)/transactions/*`, `/components/transactions/*`
- Lista filtrada por cartão/período
- Quick add com autocomplete de descrições frequentes
- Categorização com ícones (Lucide React)
- Editor de parcelas (alterar número de parcelas restantes)
- Busca e filtros avançados
- Export para CSV/PDF

### 6. Configuração de Alertas
**Arquivos:** `/app/(app)/settings/*`, `/components/settings/*`
- Toggle para cada canal: Email/Telegram/WhatsApp
- Configuração de thresholds (% do limite para alertar)
- Test de notificação por canal
- Histórico de alertas enviados
- Preferências de frequência

## 🎨 Componentes Reutilizáveis Essenciais

### `/components/ui/*`
- `MoneyInput` - Input formatado para valores em BRL
- `CardProgress` - Barra de progresso para uso do cartão
- `DatePicker` - Seletor de data de vencimento
- `CurrencyDisplay` - Display com conversão USD/GBP/BRL
- `StatusBadge` - Badges para status de pagamento
- `QuickAction` - Botões de ação rápida

### `/components/charts/*`
- `CashFlowChart` - Gráfico de fluxo de caixa
- `CardUsageChart` - Pizza de uso por cartão
- `IncomeTimeline` - Timeline de receitas esperadas
- `MonthlyComparison` - Comparativo mês a mês

## 🏪 Gerenciamento de Estado (Zustand)

### `/lib/store/finance-store.ts`
```typescript
interface FinanceStore {
  // Estado
  cards: Card[]
  transactions: Transaction[]
  incomes: Income[]
  alerts: Alert[]
  
  // Actions
  fetchDashboard: () => Promise<void>
  addTransaction: (transaction) => Promise<void>
  updateCard: (id, data) => Promise<void>
  
  // Computed
  totalBalance: number
  totalDebts: number
  expectedIncome: number
}
```

## 🪝 Hooks Customizados

### `/hooks/useFinance.ts`
- `useCards()` - Gerenciar cartões
- `useTransactions()` - Gerenciar transações
- `useRPGIncome()` - Cálculos específicos de RPG
- `useCurrencyConversion()` - Conversão em tempo real
- `useNotifications()` - Estado de alertas

## 📝 Protocolo Git

**Formato de commit:**
```
[COPILOT] Descrição clara
Exemplo: [COPILOT] Implementado dashboard com cards de resumo
```

**Solicitações para backend:**
```
[COPILOT] Preciso da API de forecast do CLAUDE
```

**Sempre antes de começar:**
```bash
git pull --rebase
git log --oneline -20  # Ver APIs disponíveis do Claude
```

## 🎯 UX Guidelines

1. **Feedback Visual Imediato**
   - Loading states em todos os forms
   - Toast notifications para ações
   - Skeleton loaders durante fetch

2. **Mobile First**
   - Drawer navigation no mobile
   - Touch-friendly buttons (min 44px)
   - Swipe actions em listas

3. **Cores Semânticas**
   - Verde: Receitas e saldo positivo
   - Vermelho: Dívidas e alertas
   - Amarelo: Warnings e vencimentos próximos
   - Azul: Ações principais

4. **Acessibilidade**
   - Todos os forms com labels
   - Navegação por teclado
   - Aria labels em gráficos

## ✅ Critérios de Sucesso
- [ ] Dashboard carregando em < 2 segundos
- [ ] Forms com validação em tempo real
- [ ] Responsivo em todos os tamanhos de tela
- [ ] Gráficos interativos e informativos
- [ ] Fluxo de adição de transação em < 3 cliques
- [ ] Notificações visuais claras de limites excedidos

## 🚀 Comece por aqui:
1. `git pull --rebase`
2. Verificar APIs disponíveis: `git log --grep=CLAUDE`
3. Criar layout base em `/app/(app)/layout.tsx`
4. Implementar dashboard em `/app/(app)/dashboard/page.tsx`
5. Commitar: `[COPILOT] Layout base e estrutura do dashboard`

**LEMBRE-SE:** A UX é crucial! O usuário precisa entender rapidamente sua situação financeira.
