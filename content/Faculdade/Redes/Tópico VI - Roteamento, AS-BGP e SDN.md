---
share_link: https://share.note.sx/qn1p9nbu#jGvOQ+ztvnyzovjVZDyLJfqEWX8c2wDvXL3yyLJsc2I
share_updated: 2025-10-05T21:35:05-03:00
---
# 🧠 Mapa Mental — Camada de Rede: Roteamento, AS/BGP e SDN

## 🎯 Papel & Planos

- **Encaminhamento (forwarding)**: decide **porta de saída** por pacote (local, rápido).
    
- **Roteamento (routing)**: calcula **rotas fim-a-fim** (configura tabelas).
    
- **Plano de dados**: executa encaminhamento nos roteadores/comutadores.
    
- **Plano de controle**: constrói rotas (distribuído nos roteadores ou **centralizado** em **SDN**).
    

---

## 📐 Modelo por Grafos

- Rede = **G(N,E)**; custo de enlace **c(x,y)**; objetivo: **menor custo**.
    
- Métricas típicas: **saltos**, **largura de banda**, **atraso**, **custo administrativo**.
    

---

## 🧭 Famílias de Algoritmos de Roteamento

### 1) **Estado de Enlace (Link-State) — Dijkstra**

- Cada nó conhece **topologia+custos** (flooding de LSAs).
    
- Calcula **árvore de menores caminhos** localmente (Dijkstra).
    
- - Convergência rápida; − Mais overhead de estado e flooding.
        

### 2) **Vetor de Distâncias — Bellman-Ford**

- Nós trocam **vetores de custo** com vizinhos.
    
- Atualização: **Dx(y) ← minᵥ { c(x,v) + Dv(y) }**.
    
- - Simples, escalável por vizinhança; − **Contagem ao infinito**, loops.
        

### 3) **Comparação**

- **Mensagens**: LS flooda rede; DV só vizinhos.
    
- **Estabilidade**: LS tende a convergir mais rápido; DV pode oscilar.
    
- **Robustez**: erro local em LS isola melhor; em DV pode propagar.
    

---

## 🌍 Escalabilidade: Sistemas Autônomos (AS)

- Internet = **rede de redes** → dividir em **AS** (domínios administrativos).
    
- **Intra-AS** (dentro do AS): todos usam o **mesmo protocolo**.
    
- **Inter-AS** (entre AS): gateways trocam **acessibilidade** a prefixos.
    

### Intra-AS (exemplos)

- **RIP** (DV; métrica = saltos; máx ≈ 15).
    
- **OSPF / IS-IS** (LS; **Dijkstra**; **áreas** + **backbone**; autenticação).
    
- **EIGRP** (DV com DUAL; múltiplas métricas; rápida convergência).
    

### Inter-AS: **BGP**

- “Cola da Internet”: anuncia **prefixos** e **caminhos de AS**.
    
- **eBGP** (entre AS) e **iBGP** (distribuição interna do AS).
    
- **Seleção por políticas** (não apenas menor custo): atributos como **LOCAL_PREF**, **AS_PATH**, **MED**, **eBGP > iBGP**, **custo IGP** até o next-hop, etc.
    

---

## 🧪 Inside do Roteador (visão rápida)

- **Portas de entrada**: recepção + lookup (best-prefix match).
    
- **Comutação**: memória, barramento ou **crossbar**.
    
- **Portas de saída**: filas/buffers + **escalonamento** (atraso, perdas).
    

---

## 🧰 SDN (Software-Defined Networking)

- **Separação**: **control plane** lógico **centralizado** (controlador) × **data plane** simples/rápido.
    
- **Tabelas de Fluxo (flow tables)**: regras **match→action** (campos L2/L3/L4), **prioridade**, **contadores**, **timeouts**.
    
- **Vantagens**: programabilidade, automação, visão global (DCs, nuvem).
    

### OpenFlow (exemplo de protocolo SDN)

- **Switch → Controller**: `packet-in`, `flow-removed`, `port-status`.
    
- **Controller → Switch**: `modify-state` (CRUD de fluxos), `packet-out`, config.
    
- **Pipeline**: pacote compara regras (mais específicas e prioritárias primeiro) → ações (encaminhar, dropar, modificar, enviar ao controlador).
    

---

## 🚦 Noções de Congestionamento (extra)

- **Detectar → sinalizar → ajustar** (controle de taxa).
    
- Mecanismos: **choke packets**, **leaky bucket**, políticas de filas, ECN.
    

---

## ✅ Essência para Memorização

- **Forwarding ≠ Routing**; **dados ≠ controle**.
    
- **Dijkstra (LS)** vs **Bellman-Ford (DV)**: como funcionam e limitações.
    
- **AS**: **RIP/OSPF/IS-IS/EIGRP** (intra) × **BGP** (inter) com **políticas**.
    
- **SDN/OpenFlow**: **match–action**, prioridade, controladora central.