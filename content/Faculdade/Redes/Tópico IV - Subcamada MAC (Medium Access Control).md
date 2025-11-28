---
share_link: https://share.note.sx/db4to3si#gFt5y5wQNeibJIrz24/cF0rUgdo9p6vOW3mTt5I0K5k
share_updated: 2025-10-05T21:20:19-03:00
---
# 🧠 Mapa Mental — Subcamada MAC (Medium Access Control)

## 🎯 Problema & Contexto (Enlaces Multiponto)

- **Meio compartilhado (broadcast)** → risco de **colisões**
    
- **Funções da MAC**:
    
    - **Endereçamento** no enlace (origem/destino)
        
    - **Controle de acesso** ao meio (quem transmite, quando)
        
    - **Delimitação/encapsulamento** (em conjunto com L2)
        
    - **Detecção/mitigação** de colisões
        

---

## 🧭 Famílias de Soluções MAC

- **Acesso controlado/centralizado**
    
    - Ex.: **Polling/Select** (mestre interroga nós), **token** (passe de permissão)
        
    - - Ordenado / previsível | − Overhead, latência, ponto único de falha
            
- **Particionamento de canal**
    
    - **TDMA** (tempo), **FDMA** (frequência), **CDMA** (código)
        
    - - Sem colisão por construção | − Subutilização se nós ociosos
            
- **Acesso aleatório (contenção)**
    
    - **ALOHA**, **CSMA**, **CSMA/CD**, **CSMA/CA**
        
    - - Simplicidade / elasticidade | − Colisões e backoff
            

---

## ⚙️ Protocolos de Contenção (Essência)

- **ALOHA (puro/slotted)**: transmite quando pronto → colisão → espera aleatória → retransmite
    
- **CSMA** (Carrier Sense Multiple Access): **ouve antes** de transmitir
    
    - variantes: **1-persistente**, **não-persistente**, **p-persistente**
        
- **CSMA/CD** (detecção de colisão, típico Ethernet half-duplex)
    
    - transmite se livre → **colisão?** envia **JAM**, **aborta**, aplica **backoff exponencial** → tenta de novo
        
- **CSMA/CA** (evitar colisão, típico Wi-Fi)
    
    - ouve canal → espera **DIFS** livre → **backoff** aleatório → transmite → receptor envia **ACK** após **SIFS**
        

---

## 🖧 Ethernet (IEEE 802.3) — visão MAC

- **Enlace com fio**, hoje majoritariamente **comutado full-duplex** (sem CSMA/CD)
    
- Em **half-duplex legado**: **CSMA/CD**, **JAM**, **backoff exponencial**
    
- **Quadro Ethernet (campos principais)**:
    
    - **Preâmbulo + SFD** (sincronismo)
        
    - **MAC Destino** | **MAC Origem**
        
    - **Tipo/Comprimento**
        
    - **Payload**
        
    - **FCS/CRC** (detecção de erro)
        
- **Chaveamento (switching)**:
    
    - Segmenta domínio de colisão
        
    - **Full-duplex** elimina colisões → **CSMA/CD não é usado**
        

---

## 📶 Wi-Fi (IEEE 802.11) — visão MAC

- **Topologias**: **BSS** com **AP** (infraestrutura) | **Ad hoc**
    
- **DCF (padrão)**: **CSMA/CA** com **ACK**
    
    - Temporizações: **SIFS** (ACK/controle), **DIFS** (dados)
        
    - **Backoff** aleatório; **CW** aumenta quando há contenção
        
    - **NAV** (Network Allocation Vector): “reserva virtual” do meio
        
    - **RTS/CTS** (opcional): mitiga **nó oculto**
        
- **PCF (opcional/legado)**: **polling** coordenado pelo AP (controle centralizado)
    

---

## 🆚 Comparações-chave

- **Ethernet (fio)**: pode **detectar** colisão (**CD**) em half-duplex; hoje **full-duplex** com switches (sem colisões)
    
- **Wi-Fi (rádio)**: não consegue **detectar** colisão no ar com confiabilidade → **evita** (**CA**) + **ACK** obrigatório
    
- **Particionamento** (TDMA/FDMA/CDMA) vs **contenção**: previsibilidade vs elasticidade
    

---

## 📝 Padrões de Endereçamento (L2)

- **MAC 48 bits** (unicast/multicast/broadcast)
    
- **Origem/Destino** no cabeçalho do quadro
    
- Aprendizagem por **switches** (tabelas MAC) para encaminhamento local
    

---

## ✅ Essência para Memorização

- Três classes MAC: **centralizado**, **particionado**, **contenção**
    
- **Ethernet**: **CSMA/CD** (legado half-duplex) → **switch + full-duplex** (sem colisões)
    
- **Wi-Fi**: **CSMA/CA**, **DIFS/SIFS/ACK**, **NAV**, **RTS/CTS** para **nó oculto**
    
- **Quadro Ethernet**: preâmbulo/SFD, endereços, tipo, payload, **CRC**
    
- **Backoff exponencial** como mecanismo de estabilidade sob contenção