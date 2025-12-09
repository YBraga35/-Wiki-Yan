---
title: AP3 — Gerenciamento de Riscos (InfoPhysio)
tags: [InfoPhysio, AP3, riscos, gestão, LGPD, FHIR, RNDS]
---

# AP3 — Gerenciamento de Riscos (InfoPhysio)

> **Âncora de contexto**: sistema com **PE (clínico)** e **PWA (paciente)**, foco em **LGPD**, **acessibilidade**, **offline/sincronização**, **perfis FHIR** e migração/integração com **RNDS**; orçamento enxuto e piloto acadêmico‑clínico.

---

## 1) Escalas e Critérios
- **Probabilidade (1–5)**: 1 muito baixa (≤10%), 2 baixa (≈25%), 3 média (≈50%), 4 alta (≈75%), 5 muito alta (≥90%).  
- **Impacto (1–5)**: considerar o **pior caso** entre **Custo/Prazo/Escopo/Qualidade & Segurança**.  
- **Nível**: `P × I` → **Baixa (1–8)**, **Média (9–15)**, **Alta (16–25)**.  
- **Estratégias**: *Evitar, Mitigar, Transferir, Aceitar* (negativos) | *Explorar, Compartilhar, Melhorar, Aceitar* (oportunidades).

## 2) Registro de Riscos (preencha/ajuste)
> Dica: descreva sempre **Causa → Evento (risco) → Efeito** e inclua um **Trigger (disparo observável)**.

| ID | Categoria | Descrição (Evento) | Causa | Efeito | P | I | **Nível** | **Criticidade** | Responsável | Trigger | Estratégia | Plano de Resposta | Status |
|---|---|---|---|---|---:|---:|---:|---|---|---|---|---|---|
| R01 | Segurança/LGPD | Vazamento de dados de pacientes | Falhas de acesso/criptografia ou erro humano | Multas ANPD, notificação, imagem institucional | 4 | 5 | **20** | **Alta** | Líder de Segurança | Alertas anômalos, logs suspeitos | Mitigar | MFA, RBAC mínimo, criptografia at‑rest/in‑transit, DLP, simulado de incidente | Aberto |
| R02 | Técnico/Dados | Perda de dados por backup falho | Configuração incorreta / restore não testado | Retrabalho e perda de confiança | 3 | 5 | **15** | Média | DevOps | Falha em teste de restauração | Mitigar | Política **3‑2‑1** + testes mensais de restore + verificação de integridade | Aberto |
| R03 | Integração | Incompatibilidade com perfis **FHIR/RNDS** | Diferenças de perfil/versão | Atraso de integração e retrabalho | 3 | 4 | **12** | Média | Eng. Interop | 4xx/5xx RNDS, validação FHIR falha | Mitigar | Prototipar bundles, usar validators e fallback local | Aberto |
| R04 | Cronograma | Atraso na entrega de requisitos clínicos | Baixa disponibilidade das fisios | Replanejamento e impacto em escopo | 4 | 3 | **12** | Média | PO | Reuniões canceladas / sem quorum | Mitigar | Agenda quinzenal fixa + canal assíncrono + protótipos para elicitar | Aberto |
| R05 | Produto/Adoção | Baixa adesão dos pacientes ao PWA | Barreiras de uso / notificações fracas | Eficácia clínica reduzida | 3 | 4 | **12** | Média | UX/Produto | Queda em streaks e retorno | Mitigar | UX acessível, nudges/notifs, apoio familiar; entrevistas no piloto | Aberto |
| R06 | RH/Stakeholders | Resistência de adoção pelos clínicos | Curva de aprendizado/tempo | Subutilização do sistema | 3 | 4 | **12** | Média | PO/Treinamento | Feedback negativo pós‑teste | Mitigar | Oficinas curtas + champions na clínica + melhorias fast‑follow | Aberto |
| R07 | Usabilidade/Acessibilidade | Interface pouco acessível para idosos | Fonte/contraste inadequados | Abandono/erros de registro | 3 | 4 | **12** | Média | UX | Relatos de dificuldade por >20% | Mitigar | Diretrizes **WCAG**; fontes grandes; emojis de dor; testes 60+ | Aberto |
| R08 | Recursos | Equipe insuficiente / turnover | Conflitos de agenda e prazos acadêmicos | Atraso de entregas chaves | 3 | 4 | **12** | Média | GP | Queda de throughput no sprint | Mitigar | Fatiar por valor, priorizar **MoSCoW**, onboarding contínuo | Aberto |
| R09 | Infra | Indisponibilidade do ambiente (hosting) | Configuração/nuvem instável | Interrupção do atendimento | 2 | 4 | **8** | Baixa | DevOps | Picos de erro/latência | Mitigar | Monitoramento, auto‑rollback, CDN, redundância quando viável | Aberto |
| R10 | Dados/Sync | Conflitos na sincronização offline | Deltas não aplicados / merge falho | Dados incorretos | 3 | 4 | **12** | Média | Eng. PWA | Erros de merge / duplicatas | Mitigar | IDs determinísticos, timestamps, regras de merge, fila background sync | Aberto |
| R11 | Tecnologia | Retrabalho por mudança de stack | Migração mal planejada | Atrasos e bugs | 2 | 3 | **6** | Baixa | Arquiteto | Burndown fora da meta após spike | Mitigar | RFC + spikes de arquitetura + feature flags | Aberto |
| R12 | Custos | Custos ocultos de serviços/assinaturas | Uso acima do free tier | Estouro de orçamento | 3 | 3 | **9** | Média | GP/DevOps | Cobranças acima do previsto | Mitigar | Alertas de orçamento, alternativas OSS, revisão mensal | Aberto |
| R13 | Regulatório | Mudanças regulatórias (COFFITO/LGPD) | Novas exigências | Ajustes urgentes | 2 | 4 | **8** | Baixa | PO/Legal | Novas resoluções/ANPD | Aceitar/Mitigar | Monitoramento regulatório + buffer de escopo | Aberto |
| R14 | Segurança | Vulnerabilidades OWASP não tratadas | Falhas em validação/headers | Exploração/indisponibilidade | 3 | 4 | **12** | Média | Segurança | Achados críticos em scan | Mitigar | CI com SAST/DAST, revisão de código e pentest leve | Aberto |
| R15 | Processo | Perda de documentação/conhecimento | Falta de versionamento/backups | Retrabalho e inconsistência | 3 | 3 | **9** | Média | GP | Docs desatualizados | Mitigar | Git + PRs, backups e Wiki/README claros | Aberto |
| R16 | Alinhamento Estratégico | Desalinhamento com RNDS/ESD‑28 | Decisões fora do padrão nacional | Integração futura inviável | 2 | 4 | **8** | Baixa | PO/Arquiteto | Feedback negativo de pares | Mitigar | Adoção FHIR desde o início; revisão de perfis BR | Aberto |
| R17 | Ético/Consentimento | Falhas no fluxo de consentimento | Coleta sem base legal | Risco legal/reputacional | 2 | 5 | **10** | Média | PO/Legal | Ausência de consentimento/logs | Mitigar | Consentimento granular, trilha de auditoria, UX clara | Aberto |
| R18 | Qualidade | Bug crítico no piloto | Testes insuficientes | Interrupção do piloto | 3 | 4 | **12** | Média | QA | Erro P0 em produção | Mitigar | E2E tests, rollback e janela de hotfix | Aberto |

### Oportunidades
| ID | Categoria | Descrição | Racional | P | I | Estratégia | Plano |
|---|---|---|---|---:|---:|---|---|
| O01 | Financiamento | Edital/bolsa externa | Alavancar recursos e escopo | 3 | 4 | Explorar | Submeter proposta curta com entregáveis já prontos |
| O02 | Parcerias | Integração com telessaúde | Aumentar cobertura/validação | 2 | 4 | Explorar | PoC limitada e segura + termo de cooperação |

---

## 3) Matriz de Riscos (IDs por célula)

> Preencha com os **IDs** (R01, R02…). Linhas = **Probabilidade** (5 topo), colunas = **Impacto** (1–5).

| P\I | 1 | 2 | 3 | 4 | 5 |
|---:|---|---|---|---|---|
| **5** |  |  |  |  |  |
| **4** |  |  |  |  |  |
| **3** |  |  |  |  |  |
| **2** |  |  |  |  |  |
| **1** |  |  |  |  |  |

---

## 4) Plano de Gerenciamento de Riscos

### 4.1 Objetivo e Escopo
Definir **como** riscos serão planejados, identificados, analisados, respondidos, **implementados** e **monitorados** no InfoPhysio. Cobre riscos técnicos, cronograma, custos, RH, legais/regulatórios, segurança/LGPD, usabilidade, dados/sync, infraestrutura e oportunidades.

### 4.2 Papéis e Responsabilidades
- **GP/PO:** manter plano e priorização; reporte por sprint.  
- **Líder de Segurança/Legal:** LGPD/segurança e conformidade.  
- **DevOps:** infra, backup e observabilidade.  
- **Arquiteto/Interop:** FHIR/RNDS; padrões e validação.  
- **UX/QA:** usabilidade, acessibilidade, qualidade.  
- **Stakeholders clínicos:** validação de requisitos e adoção.

### 4.3 Categorias (RBS) e Métricas
RBS: Técnico, Integração, Cronograma, Custos, RH, Legais/Regulatório, Segurança, Usabilidade, Dados/Sync, Infra, Oportunidades.  
Escalas: as definidas na **Seção 1**; **Nível = P×I**; **Criticidade**: Baixa (1–8), Média (9–15), Alta (16–25).

### 4.4 Processo
1. **Planejar** (uma vez, revisões quando necessário).  
2. **Identificar** (contínuo): registrar riscos com **Causa→Evento→Efeito**, dono e trigger.  
3. **Análise Qualitativa**: P/I, Matriz 5×5, priorização.  
4. **Análise Quantitativa (quando aplicável)**: EMV para riscos financeiros e simulações simples.  
5. **Planejar Respostas**: Evitar, Mitigar, Transferir, Aceitar (negativos) | Explorar, Compartilhar, Melhorar, Aceitar (oportunidades).  
6. **Implementar Respostas**: abrir tarefas com prazos/owners.  
7. **Monitorar**: revisão a cada sprint; reclassificação; encerramento quando o risco ficar aceitável.

### 4.5 Limiares & Reporte
- **Alta**: plano imediato e acompanhamento semanal.  
- **Média**: plano no próximo sprint e acompanhamento quinzenal.  
- **Baixa**: acompanhamento mensal.  
**Relatórios:** top‑10 riscos; tendência do nível médio; itens vencidos.

### 4.6 Reservas
- **Contingência**: baseada nos riscos aceitos/mitigados (EMV) e/ou no **σ agregado** do orçamento (AP2).  
- **Gerencial**: margem para desconhecidos‑desconhecidos (decisão da coordenação).

### 4.7 Artefatos
Registro de Riscos, Matriz 5×5, Atas de revisão, Issues, Checklist de Go/No‑Go, Playbook de incidente.

---

## 5) Checklist rápido (AP3)
- [ ] Escalas de P e I definidas + critério de **criticidade**  
- [ ] Registro com **Causa→Evento→Efeito**, trigger, owner e plano  
- [ ] Matriz 5×5 com **IDs** por célula  
- [ ] Plano descrevendo **processo, limiares, reservas e reporte**  
- [ ] Top‑riscos priorizados e ações em execução