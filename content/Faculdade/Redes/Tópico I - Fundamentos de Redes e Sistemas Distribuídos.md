---
share_link: https://share.note.sx/x951cq5p#DGpSeJM+eKCMlN/OGhrnsOg07RWQsgICBNNlU/8lIdA
share_updated: 2025-10-05T21:18:43-03:00
---
# 🧠 Mapa Mental — Fundamentos de Redes e Sistemas Distribuídos

**Prof. João Gluz — UFCSPA (Informática Biomédica)**

---

## 🌐 1. Conceitos Gerais da Disciplina

- **Objetivo:**
    
    - Compreender redes de computadores e sistemas distribuídos
        
    - Estudar modelos de referência (OSI e TCP/IP)
        
    - Aprender protocolos, camadas e aplicações
        
- **Abordagem:**
    
    - Aulas teóricas e práticas
        
    - Uso de simuladores e ambientes de programação em rede
        
- **Avaliação:**
    
    - Provas teórico-práticas
        
    - Trabalhos teóricos e práticos
        
    - Acompanhamento contínuo
        

---

## 🕰️ 2. Evolução das Redes de Computadores

### 🔸 Anos 1960 — Comutação de Circuitos

- Terminais conectados a mainframes
    
- Comunicação serial, síncrona, sem rede real
    

### 🔸 Anos 1970 — Comutação de Pacotes

- **ARPAnet (1969)** → origem da Internet
    
- Primeiros protocolos: **NCP**, **TCP/IP**
    
- E-mail como 1ª aplicação de rede
    

### 🔸 Anos 1980 — Padronização

- **Modelo OSI/ISO**
    
- **Ethernet**, **DNS**, **TCP/IP** como padrão
    

### 🔸 Anos 1990 — Internet Comercial

- HTML, HTTP, navegadores GUI
    
- “Killer apps”: Web, E-mail, P2P, IM
    

### 🔸 Anos 2000+ — Integração Global

- **Internet = A Rede**
    
- Wi-Fi, 4G/5G, fibra óptica, computação em nuvem
    

---

## 🧱 3. Modelos e Arquiteturas de Redes

### ⚙️ Componentes

- **Entidades:** nós físicos/lógicos (hosts, roteadores, processos)
    
- **Camadas:** abstrações funcionais (cada uma com seu papel)
    
- **Serviços:** funcionalidades oferecidas entre camadas
    
- **Protocolos:** regras de comunicação (formatos, ordem, encapsulamento)
    

### 🧩 Benefícios do Uso em Camadas

- Modularização → manutenção simples
    
- Alterações independentes entre camadas
    
- Clareza estrutural e padronização
    

---

## 🪜 4. Modelos de Referência

|Modelo|Camadas|Observações|
|---|---|---|
|**OSI (ISO)**|Física → Enlace → Rede → Transporte → Sessão → Apresentação → Aplicação|Teórico e completo|
|**TCP/IP**|Rede (Internet) → Transporte → Aplicação → Host/Rede|Base prática da Internet|
|**Modelo 5 camadas**|Física → Enlace → Rede → Transporte → Aplicação|Versão didática reduzida|

### 🏛️ Padrões e Organizações

- **ITU-T:** telecomunicações
    
- **ISO / IEEE / NIST:** padronização internacional
    
- **IETF / W3C:** padrões da Internet (RFCs, Web)
    

---

## 🧬 5. Sistemas Distribuídos

- **Definição:** conjunto de sistemas independentes cooperando via rede
    
- **Objetivo:** oferecer transparência, escalabilidade e interoperabilidade
    
- **Exemplos:**
    
    - Computação em nuvem
        
    - Aplicações Web
        
    - Prontuários eletrônicos em rede (HL7)
        

---

## 🩺 6. HL7 — Padrões de Interoperabilidade em Saúde

### 🧭 O Problema

- Sistemas hospitalares diversos e isolados
    
- Dificuldade de integração entre instituições e softwares
    

### 🧩 A Solução — **Health Level 7 (HL7)**

- Organização internacional (1987, ONG, certificada pela ANSI)
    
- Define **padrões de comunicação e estrutura de dados clínicos**
    
- Atua no **nível 7 do modelo OSI (Aplicação)**
    

### 🎯 Missão

> Permitir **interoperabilidade global de dados de saúde**  
> Melhorar fluxo de trabalho, reduzir ambiguidades e facilitar troca de conhecimento

---

## 🧱 7. Padrões HL7

|Padrão|Ano|Características|
|---|---|---|
|**HL7v2**|1988|Mensagens com separadores “pipes” (`|
|**HL7v3**|1998|Baseado em modelo de informação (RIM), usa XML; mais estruturado.|
|**CDA (Clinical Document Architecture)**|2001–2005|Troca de **documentos clínicos**; XML estruturado.|
|**FHIR (Fast Healthcare Interoperability Resources)**|2010+|Baseado em **REST**, **JSON/XML**, **SOA**; moderno e flexível.|

### 🔍 FHIR em detalhes

- Requisições HTTP (GET/POST)
    
- Recursos como **Pacientes, Consultas, Medicamentos**
    
- Estrutura JSON:
    

```json
{"resourceType":"Patient","id":"123","name":[{"family":"Silva","given":["Yan"]}]}
```

---

## ⚖️ 8. Integração dos Conceitos

```
[Redes de Computadores]
        ↓
 [Camadas OSI/TCP-IP]
        ↓
 [Protocolos e Serviços]
        ↓
 [Sistemas Distribuídos]
        ↓
 [Aplicações em Saúde]
        ↓
 [HL7 – Interoperabilidade]
```

---

## 🧾 9. Referências Principais

- **Tanenbaum, Feamster, Wetherall** – _Redes de Computadores_
    
- **Kurose & Ross** – _Redes de Computadores e a Internet_
    
- **Coulouris et al.** – _Sistemas Distribuídos_
    
- **Benson & Grieve** – _Principles of Health Interoperability_
    

---
