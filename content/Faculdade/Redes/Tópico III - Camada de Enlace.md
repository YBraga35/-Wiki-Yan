---
share_link: https://share.note.sx/911ost42#JtJuEynraffQhGe4eu45SCLySvfjcNtO9nMYCcYv4Sw
share_updated: 2025-10-05T21:19:35-03:00
---
# 🧠 Mapa Mental — Camada de Enlace (Data Link)

## 🎯 Papel da Camada

- **Encapsular** datagramas (Rede) em **quadros (frames)**
    
- **Delimitar** quadros + **transparência** do conteúdo
    
- **Detecção de erros** (e eventual recuperação por retransmissão)
    
- **Controle de fluxo** entre nós vizinhos
    
- **Acesso ao meio** (quando compartilhado) e **endereçamento de enlace**
    

---

## 🧱 Serviços Clássicos

- **Framing (enquadramento)**
    
- **Detecção de erros** (+ descarte ou sinalização)
    
- **Controle de fluxo** (compatibilizar transmissor/receptor)
    
- **Acesso ao enlace** (disciplina de uso do meio)
    
- **Endereçamento L2** (origem/destino no cabeçalho, quando aplicável)
    

---

## 🧩 Enquadramento & Transparência

- **Orientado a caractere (byte)**
    
    - _Contagem de caracteres_ (sensível a erro no campo)
        
    - _Byte-stuffing_ com **ESC** (escapa **FLAG**/ESC no payload)
        
- **Orientado a bit**
    
    - _Bit-stuffing_ com **FLAG 0x7E (01111110)**  
        → insere 0 após **cinco 1’s** no payload
        
- **Out-of-band (violações de codificação)**
    
    - Usa combinações **inválidas** do código físico para marcar início/fim
        

---

## 🧪 Integridade: Detecção (e Correção) de Erros

- **Paridade 1 bit** (detecta 1 erro); **Paridade 2D** (detecta/corrige 1 bit)
    
- **Checksum** (soma em complemento-de-um; típico “Internet”)
    
- **CRC** (polinomial) — alta detecção de **rajadas** de erro
    
- **Estratégias de recuperação**
    
    - **ARQ** (retransmissão com ACK/NAK + **timer**)
        
    - **FEC** completo é raro em L2 (casos especiais/links longos)
        

---

## 🔁 Controle de Fluxo & ARQ (Janela Deslizante)

- **Numeração de quadros** + **temporizadores** + **ACK**
    
- **Stop-and-Wait / Simplex com ruído**: envia 1, espera **ACK**
    
- **Sliding Window (janela)**
    
    - **Vários frames pendentes** sem ACK imediato
        
    - **ACK cumulativo** (reconhece até N)
        
    - **Piggybacking** (ACK vai “de carona” em dados de retorno)
        
- **Go-Back-N (GBN)**
    
    - Ao erro: retransmite **do perdido em diante**
        
    - Simples, **mais retransmissões** em perdas
        
- **Selective Repeat (SR)**
    
    - Retransmite **apenas** os faltantes
        
    - Exige **bufferização/reordenação** no receptor
        
    - **Melhor eficiência** em links ruidosos/RTT alto
        

---

## 🧰 Exemplos de Protocolos de Enlace

- **HDLC (ISO)** / **LAPB (X.25/ITU-T)**
    
    - Flag **0x7E** + **bit-stuffing**, campos de **controle** (numeração/ACK)
        
- **PPP (Point-to-Point Protocol) — IETF**
    
    - **Fornece**: enquadramento, detecção de erros, **negociação** (LCP/NCP), autenticação
        
    - **Não fornece**: correção por erro (ARQ), controle de fluxo, ordenação, suporte multiponto
        
    - **Uso típico**: links ponto-a-ponto (dial-up, túneis)
        

---

## 🔗 Integração com Outras Camadas

- **↓ Física**: mapeia quadros em **fluxo de bits** e usa o meio (sincronismo, recuperação de clock)
    
- **↑ Rede**: extrai **datagrama** válido e **entrega** à camada de rede (IP)
    

---

## ✅ Essência para Memorização

- **Framing + Transparência**: byte/bit-stuffing, OOB
    
- **Integridade**: **CRC** (rei da detecção em L2), checksum/paridade
    
- **ARQ + Janela**: **GBN vs. SR**, ACK cumulativo, timers, piggybacking
    
- **PPP**: o que **faz** e o que **não faz** em L2
    
- **Endereçamento/Acesso ao meio** quando o enlace é **compartilhado**