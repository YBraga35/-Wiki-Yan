# AP4 — Apresentação OpenProject (Estrutura Detalhada)

**Curso:** Gerência de Projetos (2025/2) — UFCSPA
**Professor:** Prof. Dr. Muriel Figueredo Franco
**Aluno:** Yan Braga da Silva
**Ferramenta:** OpenProject (Community Edition)
**Duração:** 15 min (incluindo Q&A)
**Total de slides:** 16

---

## 📋 Cronograma Geral

| Seção | Slides | Tempo | Acumulado |
|-------|--------|-------|-----------|
| Introdução | 1-4 | 3:00 | 3:00 |
| Justificativa | 5-8 | 3:30 | 6:30 |
| Demonstração | 9-12 | 5:00 | 11:30 |
| Aplicação Real | 13-15 | 3:00 | 14:30 |
| Encerramento | 16 | 0:30 | 15:00 |

---

## 🎯 SEÇÃO 1: INTRODUÇÃO (3 min)

### Slide 1 — Título e Contexto ⏱️ 30s

**Título do Slide:**
"OpenProject: planejamento e execução integrados na prática"

**Conteúdo:**
- Subtítulo: Gerência de Projetos — UFCSPA 2025/2
- Yan Braga da Silva
- Ferramenta: OpenProject Community Edition

**Elementos Visuais:**
- Logo do OpenProject (centralizado)
- Ícones pequenos: Gantt + Kanban + Wiki
- Fundo clean, cores institucionais

**Script de Narração:**
> "Boa tarde! Hoje vou apresentar o OpenProject, uma ferramenta open-source de gerenciamento de projetos. Escolhi ela por combinar planejamento robusto através de Gantt, execução ágil com Kanban, gestão de tempo e custos, tudo integrado com wiki e controles de governança. É uma alternativa menos comum nas empresas, mas com excelente fit para contextos acadêmicos e projetos com requisitos de privacidade, como o InfoPhysio que desenvolvemos na disciplina."

---

### Slide 2 — Sumário ⏱️ 30s

**Título do Slide:**
"Roteiro da Apresentação"

**Conteúdo (bullets):**
1. O que é o OpenProject e suas funcionalidades
2. Por que usar: benefícios, limitações e comparações
3. Demonstração prática (screenshots)
4. Aplicação no caso InfoPhysio (LGPD e boas práticas)
5. Diferenciais e Q&A

**Elementos Visuais:**
- Lista numerada com ícones para cada seção
- Barra de progresso visual (5 etapas)

**Script de Narração:**
> "A apresentação está dividida em 5 partes: primeiro vou contextualizar o que é o OpenProject, depois justificar por que escolhi ele, mostrando prós, contras e comparações com outras ferramentas. Em seguida, farei uma demonstração prática com screenshots, aplicarei isso ao nosso projeto InfoPhysio focando em LGPD, e encerro destacando os diferenciais antes das perguntas."

---

### Slide 3 — O que é OpenProject: Visão Geral ⏱️ 60s

**Título do Slide:**
"OpenProject: Visão Geral"

**Conteúdo:**

**O que é:**
- Plataforma open-source de gerenciamento de projetos
- Self-hostable (Community Edition) ou Cloud (paga)
- Foco em **planejamento + execução + governança** integrados

**Origem e Comunidade:**
- Projeto alemão (OpenProject GmbH)
- Comunidade ativa, documentação robusta
- Alternativa aos gigantes comerciais (Jira, MS Project)

**Público-alvo:**
- Equipes que precisam de controle total dos dados
- Projetos com requisitos regulatórios (GDPR/LGPD)
- Organizações acadêmicas e públicas

**Elementos Visuais:**
- Screenshot da interface principal do OpenProject
- Mapa mental: Open-source → Self-hosted → Privacidade → LGPD
- Bandeira da Alemanha (pequena) + logo OpenProject

**Script de Narração:**
> "OpenProject é uma plataforma open-source alemã de gerenciamento de projetos. Diferente de ferramentas SaaS como Jira ou Asana, você pode hospedar ela nos seus próprios servidores, o que dá controle total sobre os dados — crítico para LGPD e contextos acadêmicos. A versão Community Edition é gratuita e cobre todas as funcionalidades essenciais que vou demonstrar. O público-alvo principal são equipes que precisam de rastreabilidade, auditoria e privacidade."

---

### Slide 4 — O que é OpenProject: Funcionalidades Core ⏱️ 60s

**Título do Slide:**
"Funcionalidades Principais"

**Conteúdo (grid 2x3):**

| 📦 **Work Packages** | 📋 **Boards (Kanban)** |
|---------------------|----------------------|
| Unidade de trabalho: User Stories, Tasks, Bugs | Planejamento visual por Status/Sprint/Assignee |
| Campos customizados (WBS, RiskID, Priority) | Drag & drop para mudança de estado |

| 📊 **Gantt (Timeline)** | ⏱️ **Time & Cost** |
|------------------------|-------------------|
| Cronograma com dependências e marcos | Registro de esforço e custos por pacote |
| Baseline e critical path | Relatórios básicos de budget |

| 📚 **Wiki & Meetings** | 🔒 **Governança** |
|-----------------------|------------------|
| Documentação embutida (DoR/DoD, políticas) | Permissões granulares + histórico de alterações |
| Atas de reunião linkadas a pacotes | Rastreamento e auditoria completos |

**Elementos Visuais:**
- Ícones para cada funcionalidade
- Screenshot pequeno de cada módulo (6 mini-prints)

**Script de Narração:**
> "As funcionalidades core são: Work Packages, que são a unidade de trabalho — podem ser histórias, tarefas, bugs, com campos totalmente customizados. Boards Kanban para planejamento visual e acompanhamento ágil. Gantt robusto com dependências, marcos e baseline. Time & Cost para registrar esforço e custos em cada pacote. Wiki e Meetings para documentação centralizada. E governança com permissões e histórico completo de auditoria. Tudo isso integrado numa única plataforma."

---

## 🎯 SEÇÃO 2: JUSTIFICATIVA (3,5 min)

### Slide 5 — Por que usar OpenProject ⏱️ 90s

**Título do Slide:**
"Por que escolher OpenProject?"

**Conteúdo (6 pilares):**

1. **🎓 Aderência Acadêmica/LGPD**
   - Dados sob controle institucional
   - Separação entre gestão do trabalho e dados sensíveis
   - Compliance com regulações brasileiras

2. **📊 Planejamento Forte**
   - Gantt com dependências e marcos
   - Baseline para comparação com planejado
   - Critical path integrado

3. **⚡ Execução Visual**
   - Boards Kanban integrados aos mesmos itens do Gantt
   - Transição suave entre planejamento e execução

4. **🔍 Transparência**
   - Histórico de alterações completo
   - Wiki e meetings no mesmo espaço
   - Permissões granulares

5. **💰 Custo-Benefício**
   - Community Edition gratuita
   - Sem vendor lock-in
   - Escalável conforme necessidade

6. **🌱 Sustentabilidade**
   - Comunidade ativa
   - Documentação clara e atualizada
   - Roadmap público

**Elementos Visuais:**
- Grid 2x3 com ícones e bullets concisos
- Destaque visual para "LGPD" e "Gratuita"

**Script de Narração:**
> "Por que escolher OpenProject? Primeiro, pela aderência acadêmica: como nosso projeto InfoPhysio lida com dados de saúde, hospedar a ferramenta de GP nos dá controle total e compliance com LGPD. Segundo, planejamento forte com Gantt robusto. Terceiro, execução visual com Kanban integrado. Quarto, transparência total com histórico e wiki. Quinto, custo zero na versão Community. E sexto, sustentabilidade — a comunidade é ativa e o projeto tem roadmap claro. Para projetos com requisitos regulatórios, essa combinação é um diferencial."

---

### Slide 6 — Benefícios (Prós) ⏱️ 60s

**Título do Slide:**
"Benefícios Principais"

**Conteúdo:**

✅ **Gantt Nativo Sólido**
- Timeline com dependências (predecessoras/sucessoras)
- Marcos e milestones para gates de aprovação
- Baseline para comparar planejado vs executado

✅ **Kanban e Work Packages Customizáveis**
- Campos personalizados: WBS, Sprint, RiskID, Priority, Owner, Effort
- Templates reutilizáveis (User Story, Bug OWASP, Spike FHIR, Task DevOps)
- Múltiplos tipos de pacote para diferentes workflows

✅ **Time & Cost Integrado**
- Registro de horas por membro da equipe
- Tracking de custos sem add-ons pagos
- Relatórios básicos nativos

✅ **Open-source e Self-hostable**
- Controle total da infraestrutura
- Auditoria de código-fonte
- Privacidade e conformidade regulatória

**Elementos Visuais:**
- Check marks verdes
- Screenshot do Gantt com dependências
- Screenshot de Work Package com campos customizados

**Script de Narração:**
> "Os benefícios principais são: Gantt nativo super sólido com dependências, marcos e baseline. Work Packages totalmente customizáveis — no InfoPhysio, por exemplo, criamos campos para WBS, RiskID e Sprint, além de templates para User Stories e Bugs OWASP. Time & Cost vem integrado, sem precisar de plugins pagos. E por ser open-source e self-hostable, temos controle total para atender requisitos de privacidade."

---

### Slide 7 — Limitações e Mitigações ⏱️ 60s

**Título do Slide:**
"Limitações (e como mitigar)"

**Conteúdo:**

| ⚠️ Limitação | ✅ Mitigação |
|-------------|-------------|
| **Curva de setup maior** que boards simples (Trello/Notion) | • Usar **modelos de projeto** prontos<br>• Criar **vistas salvas** reutilizáveis<br>• Guia de onboarding para time |
| **Relatórios complexos limitados** nativamente | • Export **CSV** para Excel/Power BI<br>• Dashboards externos (Metabase/Grafana)<br>• API REST para integrações customizadas |
| **Integração com repositórios/CI** depende de plugins | • Links padronizados (commit → work package)<br>• Webhooks para automação enxuta<br>• Usar GitHub/GitLab como fonte de verdade para código |

**Elementos Visuais:**
- Tabela com cores: vermelho (limitação) → verde (mitigação)
- Ícone de ferramenta (wrench) em cada mitigação

**Script de Narração:**
> "Claro que tem limitações. A curva de setup é maior que ferramentas super simples como Trello — mitigamos isso com modelos de projeto e vistas salvas. Relatórios complexos são limitados nativamente — mas você pode exportar CSV e processar no Excel ou Power BI. E integrações com GitHub ou CI/CD precisam de configuração manual — a solução é padronizar links entre commits e work packages, e usar webhooks para automação básica. No geral, são limitações contornáveis."

---

### Slide 8 — Matriz Comparativa ⏱️ 60s

**Título do Slide:**
"OpenProject vs Concorrentes"

**Conteúdo (tabela comparativa):**

| Critério | OpenProject | Jira | GitHub Projects | Trello/Asana | MS Project |
|----------|-------------|------|-----------------|--------------|------------|
| **Gantt Nativo** | ✅✅ Robusto | ⚠️ Via apps | ❌ Básico | ❌ Sem | ✅✅ Poderoso |
| **Kanban** | ✅ Integrado | ✅ Forte | ✅ Nativo | ✅✅ Core | ⚠️ Limitado |
| **Time/Cost** | ✅ Nativo | ⚠️ Add-ons | ❌ Sem | ❌ Sem | ✅ Completo |
| **Self-hosted** | ✅ Sim (CE) | ⚠️ Data Center (caro) | ❌ Não | ❌ Não | ⚠️ On-prem |
| **Custo (pequeno time)** | ✅✅ Grátis | ⚠️ $7-14/user/mês | ✅ Grátis | ⚠️ $10-25/user/mês | ❌ Caro |
| **Curva de Aprendizado** | ⚠️ Média | ❌ Alta | ✅ Baixa | ✅✅ Muito baixa | ❌ Alta |
| **LGPD/Privacidade** | ✅✅ Controle total | ⚠️ Depende | ⚠️ Cloud GitHub | ❌ SaaS | ⚠️ Configurável |

**Legenda:**
- ✅✅ Excelente | ✅ Bom | ⚠️ Limitado | ❌ Fraco/Ausente

**Elementos Visuais:**
- Tabela com cores (verde → amarelo → vermelho)
- Destaques em negrito para OpenProject nos pontos fortes

**Script de Narração:**
> "Comparando com concorrentes: Jira é muito completo, mas o custo e a complexidade são altos, e o Gantt depende de apps. GitHub Projects é ótimo para times code-centric, mas não tem Gantt robusto nem time tracking. Trello e Asana são super simples, mas faltam recursos de planejamento formal. MS Project tem Gantt poderoso, mas é menos colaborativo e caro. OpenProject se destaca no equilíbrio: Gantt forte + Kanban + Time/Cost + Self-hosted gratuito. Para o InfoPhysio, foi a melhor escolha."

---

## 🎯 SEÇÃO 3: DEMONSTRAÇÃO (5 min)

### Slide 9 — Setup e Work Packages ⏱️ 75s

**Título do Slide:**
"Demo Parte 1: Setup e Work Packages"

**Conteúdo (passo a passo com screenshots):**

**1. Criar Projeto "InfoPhysio"**
- Screenshot: tela de criação de projeto
- Nome: InfoPhysio
- Descrição: Sistema web para gestão de fichas fisioterapêuticas
- Visibilidade: Privado

**2. Configurar Campos Customizados**
- Screenshot: painel de custom fields
- Campos criados:
  - `WBS` (text) — Ex: 1.2.3
  - `RiskID` (text) — Ex: R07
  - `Sprint` (list) — Ex: Sprint 1, Sprint 2, MVP
  - `Priority` (list) — High, Medium, Low
  - `Owner` (user) — Responsável
  - `Effort` (integer) — Esforço em horas

**3. Criar Work Package (User Story)**
- Screenshot: formulário de criação
- Template: User Story
- Título: "Como fisioterapeuta, quero cadastrar pacientes para iniciar atendimento"
- Campos preenchidos:
  - WBS: 2.1
  - Sprint: MVP
  - Priority: High
  - Effort: 8h

**Elementos Visuais:**
- 3 screenshots lado a lado (criar projeto | custom fields | work package)
- Setas indicando o fluxo

**Script de Narração:**
> "Demonstração prática. Primeiro, criamos o projeto InfoPhysio com visibilidade privada. Segundo, configuramos campos customizados: WBS para estrutura analítica, RiskID para mapear riscos da AP3, Sprint para organizar entregas, Priority, Owner e Effort. Terceiro, criamos uma User Story usando template padronizado, preenchendo os campos — por exemplo, WBS 2.1, Sprint MVP, 8 horas de esforço. Essa User Story vira um Work Package rastreável."

---

### Slide 10 — Planejamento: Gantt e Marcos ⏱️ 75s

**Título do Slide:**
"Demo Parte 2: Planejamento com Gantt"

**Conteúdo (passo a passo com screenshots):**

**1. Abrir Vista Gantt (Timeline)**
- Screenshot: timeline completa do projeto
- Work Packages dispostos cronologicamente
- Barras coloridas por tipo (Story, Task, Bug)

**2. Adicionar Dependências**
- Screenshot: seta de dependência entre tasks
- Exemplo:
  - "Modelar banco de dados" (WBS 1.1) → predecessora
  - "Implementar API de pacientes" (WBS 2.1) → sucessora
  - Tipo: Finish-to-Start (FS)

**3. Criar Marco (Milestone)**
- Screenshot: marco no Gantt
- Nome: "Piloto de Usabilidade"
- Data: 15/12/2025
- Vinculado aos Work Packages de testes

**Elementos Visuais:**
- Screenshot grande do Gantt com zoom em dependências
- Destaque visual no marco (ícone de bandeira)
- Legenda de cores (Story=azul, Task=verde, Bug=vermelho)

**Script de Narração:**
> "No Gantt, visualizamos todo o cronograma. Podemos adicionar dependências entre pacotes — por exemplo, 'Modelar banco de dados' precisa terminar antes de 'Implementar API de pacientes'. O OpenProject calcula automaticamente o critical path. Também criamos marcos, como 'Piloto de Usabilidade', que marcam gates de aprovação. Isso integra planejamento formal com execução ágil."

---

### Slide 11 — Execução: Kanban e Time/Cost ⏱️ 75s

**Título do Slide:**
"Demo Parte 3: Execução com Kanban e Time Tracking"

**Conteúdo (passo a passo com screenshots):**

**1. Abrir Board Kanban**
- Screenshot: board com colunas por Status
- Colunas: Backlog | Planejado | Em Progresso | Em Revisão | Concluído
- Cards são os mesmos Work Packages do Gantt

**2. Mover Item entre Colunas**
- Screenshot: arrastar card de "Planejado" → "Em Progresso"
- Work Package: "Cadastrar pacientes"
- Status muda automaticamente

**3. Registrar Time & Cost**
- Screenshot: formulário de time logging
- Trabalho realizado: 6h (de 8h estimadas)
- Custo: R$ 300 (6h × R$ 50/h taxa padrão)
- Comentário: "Implementação inicial do CRUD"

**4. Visualizar Relatório Básico**
- Screenshot: summary de horas e custos por Work Package
- Total logged: 24h / 40h planejadas
- Budget: R$ 1.200 / R$ 2.000

**Elementos Visuais:**
- 4 screenshots em grid 2x2
- Destaque nos valores de tempo/custo (bold, cor diferente)

**Script de Narração:**
> "Na execução, usamos o Board Kanban. Os cards são os mesmos Work Packages do Gantt — total integração. Movemos 'Cadastrar pacientes' de Planejado para Em Progresso, e o status atualiza automaticamente. Depois, registramos tempo: 6 horas trabalhadas das 8 estimadas, com custo de 300 reais. O OpenProject gera relatórios básicos mostrando horas totais e budget consumido. Isso fecha o ciclo de planejamento e execução."

---

### Slide 12 — Governança: Riscos e Wiki ⏱️ 75s

**Título do Slide:**
"Demo Parte 4: Governança e Rastreabilidade"

**Conteúdo (passo a passo com screenshots):**

**1. Filtrar por RiskID**
- Screenshot: filtro aplicado
- Filtro: `RiskID = R07` (Risco de Acessibilidade da AP3)
- Resultado: 3 Work Packages relacionados
  - "Implementar leitores de tela"
  - "Teste de contraste WCAG 2.1"
  - "Auditoria de acessibilidade"

**2. Criar Vista Salva: "Riscos em Mitigação"**
- Screenshot: saved query
- Nome: Riscos em Mitigação
- Filtros combinados:
  - RiskID: não vazio
  - Status: Em Progresso ou Em Revisão
- Reutilizável para reuniões de governança

**3. Documentar no Wiki**
- Screenshot: página Wiki "Política LGPD"
- Conteúdo:
  - Diretrizes de privacidade
  - Checklist de compliance
  - Linkado a Work Packages de implementação (consentimento, anonimização)

**4. Histórico de Alterações**
- Screenshot: audit log de um Work Package
- Mostra: quem mudou, quando, o quê (status, assignee, effort)

**Elementos Visuais:**
- 4 screenshots em grid 2x2
- Ícone de escudo (governança) e lupa (rastreabilidade)

**Script de Narração:**
> "Por fim, governança. Podemos filtrar Work Packages por RiskID — por exemplo, R07 de Acessibilidade da AP3 — e visualizar todos os itens de mitigação. Criamos vistas salvas reutilizáveis, como 'Riscos em Mitigação', para monitoramento contínuo. O Wiki embute documentação como políticas LGPD, linkando às implementações. E o histórico de alterações registra cada mudança — quem, quando, o quê — essencial para auditoria. Essa rastreabilidade é um diferencial para projetos regulados."

---

## 🎯 SEÇÃO 4: APLICAÇÃO REAL (3 min)

### Slide 13 — Caso InfoPhysio: Estrutura do Projeto ⏱️ 60s

**Título do Slide:**
"Aplicação Prática: InfoPhysio"

**Conteúdo:**

**Contexto do Projeto:**
- Sistema web para gestão de fichas fisioterapêuticas
- Requisitos: LGPD, acessibilidade WCAG 2.1, integração FHIR
- Equipe: 4 pessoas (dev, UX, QA, PO)
- Duração: 16 semanas (4 sprints de 4 semanas)

**Mapeamento no OpenProject:**

**1. EAP/WBS (Estrutura Analítica do Projeto)**
```
1.0 Planejamento
  1.1 Modelagem de dados (LGPD by design)
  1.2 Definição de arquitetura
2.0 Desenvolvimento Backend
  2.1 API de pacientes
  2.2 API de sessões fisioterapêuticas
  2.3 Módulo de consentimento LGPD
3.0 Desenvolvimento Frontend
  3.1 Cadastro de pacientes
  3.2 Agendamento de sessões
  3.3 Dashboard acessível (WCAG)
4.0 Testes e Qualidade
  4.1 Testes de segurança (OWASP)
  4.2 Testes de acessibilidade
5.0 Implantação
  5.1 Ambiente de homologação
  5.2 Piloto com 5 fisioterapeutas
```

**2. Riscos Mapeados (da AP3)**
- R07 (Acessibilidade) → Vista: 8 work packages
- R12 (Privacidade LGPD) → Vista: 12 work packages
- R03 (Performance) → Vista: 5 work packages

**3. Sprints e Marcos**
- Sprint 1 (MVP): Cadastro + CRUD básico
- Sprint 2: Integração FHIR + Consentimento
- Marco: "Piloto de Usabilidade" (semana 12)
- Sprint 3-4: Refinamento + Produção

**Elementos Visuais:**
- Diagrama WBS visual (árvore)
- Linha do tempo com sprints e marco destacado
- Badges dos riscos (R07, R12, R03)

**Script de Narração:**
> "Aplicando ao InfoPhysio: mapeamos a EAP completa em campos WBS — de 1.0 Planejamento até 5.0 Implantação. Os riscos da AP3 viraram filtros: R07 de Acessibilidade tem 8 work packages de mitigação, R12 de LGPD tem 12. Organizamos em 4 sprints com marco de Piloto na semana 12. Essa estruturação permite rastrear cada entrega contra requisitos regulatórios."

---

### Slide 14 — Caso InfoPhysio: LGPD e Boas Práticas ⏱️ 90s

**Título do Slide:**
"Governança LGPD no OpenProject"

**Conteúdo:**

**🔒 Princípio: Separação de Dados Sensíveis**

**O QUE NÃO FAZER:**
❌ Registrar dados de pacientes reais em Work Packages
❌ Incluir PHI (Protected Health Information) em comentários
❌ Usar nomes reais de usuários em exemplos

**O QUE FAZER:**
✅ Usar **placeholders**: "Paciente XYZ-001"
✅ Vincular Work Package ao ID do sistema clínico externo
✅ Documentar fluxos de consentimento, não dados pessoais

**Exemplo Prático:**
```
❌ ERRADO:
Work Package: "Corrigir cadastro de Maria Silva, CPF 123.456.789-00"

✅ CORRETO:
Work Package: "Corrigir validação de CPF no formulário de cadastro"
RiskID: R12 (LGPD)
Link: https://sistema-clinico.local/patient/UUID-ABC-123
```

**🛡️ Boas Práticas Implementadas:**

1. **Templates Padronizados**
   - User Story (com critérios DoR/DoD)
   - Bug OWASP (com checklist de segurança)
   - Spike FHIR (para pesquisa de integração)
   - Task DevOps (para deploy e config)

2. **Perfis de Acesso**
   - Admin: full access
   - Dev: read/write em work packages de desenvolvimento
   - QA: read/write em bugs e testes
   - Stakeholders: read-only

3. **Wiki de Governança**
   - Política de Privacidade
   - DoR (Definition of Ready)
   - DoD (Definition of Done)
   - Checklist LGPD para cada User Story

4. **Histórico e Auditoria**
   - Rastreamento de mudanças em work packages sensíveis
   - Branch policies (se integrado com Git)
   - Revisão de permissões trimestral

**Elementos Visuais:**
- Box vermelho (erros) vs verde (corretos)
- Tabela de templates com ícones
- Diagrama de perfis de acesso (Admin → Dev → QA → Stakeholder)

**Script de Narração:**
> "Governança LGPD: o princípio fundamental é **nunca registrar dados sensíveis no OpenProject**. Usamos placeholders e linkamos ao sistema clínico externo via UUID. Por exemplo, ao invés de 'Corrigir cadastro de Maria Silva, CPF X', escrevemos 'Corrigir validação de CPF', marcamos RiskID R12, e linkamos ao UUID do paciente no sistema real. Também padronizamos templates — User Story com DoR/DoD, Bug OWASP, Spike FHIR. Definimos perfis de acesso granulares. E documentamos tudo no Wiki: política de privacidade, checklists LGPD. O histórico de alterações garante auditoria. Isso transforma o OpenProject em ferramenta de governança, não em risco de compliance."

---

### Slide 15 — Diferenciais-Chave ⏱️ 60s

**Título do Slide:**
"Diferenciais do OpenProject"

**Conteúdo (3 pilares destacados):**

**🎯 1. Equilíbrio Planejamento–Execução**
- Gantt robusto para planejamento formal
- Kanban integrado para execução ágil
- **Mesma base de dados** — sem duplicação, sem sincronização

**🛡️ 2. Governança e Auditoria Integradas**
- Histórico completo de alterações
- Permissões granulares por projeto/módulo
- Wiki para políticas e DoR/DoD
- Meetings linkadas a work packages
- **Rastreabilidade end-to-end**

**🔓 3. Autonomia Institucional**
- Open-source: código auditável
- Self-hosted: controle total de dados
- Community Edition gratuita
- **Zero vendor lock-in**

**Elementos Visuais:**
- 3 colunas com ícones grandes
- Screenshot pequeno de cada pilar
- Destaque visual em "Mesma base de dados", "Rastreabilidade end-to-end", "Zero vendor lock-in"

**Script de Narração:**
> "Recapitulando os diferenciais: primeiro, equilíbrio entre planejamento e execução — Gantt e Kanban compartilham a mesma base de dados, sem duplicação. Segundo, governança integrada — histórico, permissões, wiki e meetings em um só lugar, rastreabilidade completa. Terceiro, autonomia — open-source, self-hosted, gratuito, sem ficar preso a fornecedor. Para o InfoPhysio, isso significou gerenciar um projeto complexo com LGPD sem comprometer privacidade nem estourar budget."

---

## 🎯 SEÇÃO 5: ENCERRAMENTO (30s)

### Slide 16 — Síntese e Q&A ⏱️ 30s + perguntas

**Título do Slide:**
"Síntese e Perguntas"

**Conteúdo:**

**📌 Resumo da Apresentação:**

**POR QUÊ:** Planejamento forte + Execução ágil + Governança + LGPD
**COMO:** Gantt + Kanban + Time/Cost + Wiki integrados
**APLICAÇÃO:** InfoPhysio com WBS, Riscos, Sprints e boas práticas
**DIFERENCIAIS:** Open-source, self-hosted, gratuito, rastreável

**🙋 Perguntas?**

Contato: yan.silva@ufcspa.edu.br
Repositório (demo): github.com/yanbraga/infophysio-openproject-demo

**Elementos Visuais:**
- Layout minimalista com os 4 pontos do resumo
- QR code para o repositório de demo
- Ícone de interrogação grande (call to action para perguntas)

**Script de Narração:**
> "Resumindo: escolhi OpenProject pelo equilíbrio entre planejamento formal, execução ágil, governança e compliance LGPD. Demonstrei como Gantt, Kanban, Time/Cost e Wiki trabalham integrados. Apliquei isso ao InfoPhysio mapeando WBS, riscos e boas práticas de privacidade. Os diferenciais são autonomia, custo zero e rastreabilidade. Agora estou à disposição para perguntas!"

---

## 📋 CHECKLIST DE PREPARAÇÃO

### Antes da Apresentação:

**Screenshots Necessários (12 total):**
- [ ] Interface principal OpenProject
- [ ] Criação de projeto
- [ ] Painel de custom fields
- [ ] Formulário de Work Package (User Story)
- [ ] Vista Gantt com dependências
- [ ] Marco no timeline
- [ ] Board Kanban com colunas
- [ ] Formulário de Time Logging
- [ ] Relatório de Time/Cost
- [ ] Filtro por RiskID + Vista Salva
- [ ] Página Wiki (Política LGPD)
- [ ] Histórico de alterações (audit log)

**Material de Backup:**
- [ ] Vídeo curto da demo (2 min) — caso falhe o acesso
- [ ] Prints alternativos de todas as telas
- [ ] Link para demo online (OpenProject Cloud trial)

**Validação de Timing:**
- [ ] Ensaiar apresentação completa cronometrada
- [ ] Garantir que cada seção cabe no tempo estimado
- [ ] Preparar respostas para 3-5 perguntas prováveis

### Perguntas Prováveis (e Respostas Sugeridas):

**1. "Por que não usar Jira, que é mais conhecido?"**
> "Jira é excelente, mas para o contexto acadêmico e com requisitos LGPD, o custo e a necessidade de Cloud são barreiras. OpenProject oferece 90% das funcionalidades core com custo zero e controle total dos dados."

**2. "OpenProject é difícil de instalar e configurar?"**
> "A versão Cloud tem setup em minutos. Para self-hosted, há containers Docker oficiais. A curva de aprendizado é média — maior que Trello, menor que Jira."

**3. "Como OpenProject se integra com GitHub/GitLab?"**
> "Há plugins oficiais para vincular commits a work packages. Também é possível usar webhooks e a API REST. No InfoPhysio, padronizamos links manuais entre PRs e work packages."

**4. "E se a equipe crescer muito?"**
> "A Community Edition suporta projetos grandes. Se precisar de recursos enterprise (SSO, SLA, suporte premium), há a versão paga. Mas sem vendor lock-in — você pode migrar dados via API."

**5. "Quais são as limitações reais no dia a dia?"**
> "Relatórios complexos precisam de export CSV + BI externo. Automações avançadas exigem scripting. Mas para 80% dos casos de uso, a CE atende bem."

---

## 🎯 TIMING FINAL VALIDADO

| Seção | Slides | Tempo Planejado | Tempo Real (ensaio) |
|-------|--------|----------------|---------------------|
| Introdução | 1-4 | 3:00 | ______ |
| Justificativa | 5-8 | 3:30 | ______ |
| Demonstração | 9-12 | 5:00 | ______ |
| Aplicação Real | 13-15 | 3:00 | ______ |
| Encerramento | 16 | 0:30 | ______ |
| **Total Apresentação** | | **15:00** | ______ |
| Q&A | | ~3:00 | ______ |
| **Total com Q&A** | | **~18:00** | ______ |

**Nota:** Se ultrapassar 15 min, cortar:
- Slide 7 (Limitações) — mencionar brevemente em Slide 6
- Slide 12 (Governança demo) — focar só em Riscos, remover Wiki

---

## 📚 REFERÊNCIAS E RECURSOS

**Documentação Oficial:**
- https://www.openproject.org/docs/
- https://www.openproject.org/docs/user-guide/
- https://www.openproject.org/docs/system-admin-guide/

**Comparações:**
- OpenProject vs Jira: https://www.openproject.org/jira-alternative/
- OpenProject vs MS Project: https://www.openproject.org/microsoft-project-alternative/

**Demo Online:**
- https://start.openproject.com/ (trial gratuito 14 dias)

**Comunidade:**
- GitHub: https://github.com/opf/openproject
- Fórum: https://community.openproject.org/

---

**Versão do documento:** 1.0
**Data:** 2025-10-30
**Última atualização:** Estrutura completa de 16 slides com timing, scripts e checklist