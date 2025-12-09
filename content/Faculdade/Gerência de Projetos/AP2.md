---
title: AP2 — EAP/WBS + Gestão de Custos (InfoPhysio)
tags: [InfoPhysio, AP2, gestão, custos, PERT, WBS, EAP]
---

# AP2 — EAP/WBS + Gestão de Custos (InfoPhysio)

## 1) EAP/WBS por entregáveis

> Regra: Pacotes de trabalho representam **resultados/entregas** (não atividades). Mantenha 5–9 pacotes.

### 1.0 Gestão do Projeto
**Objetivo:** planejamento, cerimônias (Scrum/Kanban), documentação, reporte.  
**Critérios de pronto:** cronograma atualizado; atas; indicadores (burndown/lead-time) publicados.

### 2.0 Portal Web do Clínico (PE)
**Objetivo:** prontuário eletrônico para cadastro, evolução, histórico longitudinal e exportações.  
**Escopo incluso:** CRUD de pacientes; evolução estruturada; histórico; filtros e exportação (CSV/PDF).  
**Critérios de pronto:** RBAC “clínico/admin”; trilha de auditoria; testes de usabilidade com 3 fisios.

### 3.0 PWA do Paciente
**Objetivo:** app leve com calendário de streaks, execução guiada, registro de dor e notificações.  
**Escopo incluso:** login por CPF+data nasc.; rotina diária com vídeos; registro de dor (escala/emoji); notificações.  
**Critérios de pronto:** **offline‑first** (cache), reenvio/sincronização, testes com ≥5 pacientes do piloto.

### 4.0 Interoperabilidade HL7 FHIR/RNDS
**Objetivo:** modelagem de recursos/perfis FHIR, mapeamentos e endpoints, com migração futura à RNDS.  
**Critérios de pronto:** validação com **FHIR validator**; mapeamentos documentados; prova de conceito com bundle.

### 5.0 Segurança & LGPD
**Objetivo:** autenticação, consentimento, criptografia e auditoria.  
**Critérios de pronto:** MFA; **críticas OWASP** tratadas; consentimento granular; **logs de auditoria** ativos.

### 6.0 Infra & DevOps
**Objetivo:** ambientes, CI/CD, backups, observabilidade e custos.  
**Critérios de pronto:** pipeline CI/CD; **backup 3‑2‑1** testado; monitoramento/alertas; custo estimado.

### 7.0 Validação Clínica, Usabilidade & Pesquisa
**Objetivo:** testes com fisioterapeutas e pacientes; coleta de feedback; anonimização de dados do piloto.  
**Critérios de pronto:** protocolo de teste; questionários; relatório de achados e ações (fast‑follow).

### 8.0 Treinamento & Implantação Piloto
**Objetivo:** materiais, oficinas, aceite clínico, go‑live e rollback.  
**Critérios de pronto:** guia rápido; vídeos curtos; **checklist go/no‑go**; termo de aceite do piloto.

> **Dica:** exporte seu diagrama (draw.io) com a **numeração 1.0…8.0** para anexar como **EAP_InfoPhysio.pdf**.

---

## 2) Estimativa de Custos com PERT (três pontos)

### Como preencher
Para cada pacote, estime **horas**:  
- **a (otimista)**, **m (mais provável)**, **b (pessimista)**;  
- defina **taxa R$/h** (pode variar por perfil) e **custos fixos** (ex.: hospedagem, assinaturas, equipamentos).

### Fórmulas (cole/comente no relatório)
- **Esforço esperado (horas)**: `E_horas = (a + 4m + b) / 6`  
- **Desvio-padrão (horas)**: `σ_horas = (b − a) / 6`  
- **Custo esperado (R$)**: `E_R$ = E_horas × taxa + custos_fixos`  
- **Desvio-padrão (R$)**: `σ_R$ = σ_horas × taxa`  
- **Agregação de incertezas**: `σ_total = √(Σ σ_R$²)` (soma quadrática)

| ID | Pacote | a (h) | m (h) | b (h) | Taxa (R$/h) | Fixo (R$) | **E_horas** | **σ_horas** | **E_R$** | **σ_R$** |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1.0 | Gestão do Projeto |  |  |  |  |  |  |  |  |  |
| 2.0 | Portal Web do Clínico (PE) |  |  |  |  |  |  |  |  |  |
| 3.0 | PWA do Paciente |  |  |  |  |  |  |  |  |  |
| 4.0 | Interop HL7 FHIR/RNDS |  |  |  |  |  |  |  |  |  |
| 5.0 | Segurança & LGPD |  |  |  |  |  |  |  |  |  |
| 6.0 | Infra & DevOps |  |  |  |  |  |  |  |  |  |
| 7.0 | Validação/Usabilidade |  |  |  |  |  |  |  |  |  |
| 8.0 | Treinamento & Piloto |  |  |  |  |  |  |  |  |  |
| **Totais** |  |  |  |  |  | **Σ fixos** | **Σ E_horas** | **√Σσ²** | **Σ E_R$** | **√Σσ²** |

### Como justificar no texto
- **Critérios para a/m/b**: complexidade técnica, dependências (ex.: RNDS/FHIR), riscos (ex.: adesão do paciente), experiência prévia.  
- **Taxas**: informe a fonte (bolsa/mercado/estimativa interna).  
- **Contingência**: defina **%** ou **≈ 1σ** do custo total e explique o porquê.

---

## 3) Entregáveis da AP2 (para anexar)
- **EAP_InfoPhysio.pdf** (diagrama com numeração 1.0…8.0)  
- **Tabela PERT** (esta seção preenchida)  
- **Método/Justificativas** (2–4 parágrafos com as fórmulas e decisões)

---

## 4) Checklist rápido (AP2)
- [ ] EAP por entregáveis (≥5 pacotes)  
- [ ] Tabela PERT por pacote com **a/m/b, taxa, fixo, E e σ**  
- [ ] Totais + **contingência** definidos  
- [ ] Critérios de pronto por pacote  
- [ ] Texto de método/assunções