---
share_link: https://share.note.sx/69kz1g3r#CJQvHx9Fg6QXwowWOGw4eWxW8yRNjnXYh9GEe6MoFhA
share_updated: 2025-10-05T21:20:44-03:00
---
# Resumo — Camada de Rede (Introdução + Internet)

## 1) Papel e posição no modelo

- A **Camada de Rede** conecta origem→destino **entre múltiplas redes**, encapsulando segmentos da camada de transporte em **datagramas** e entregando-os ao próximo salto até o destino. Implementa-se em **hosts e roteadores**.
    

## 2) Funções centrais

- **Roteamento (routing):** escolher **rotas** de ponta a ponta (algoritmos/protocolos constroem tabelas).
    
- **Encaminhamento (forwarding):** mover cada pacote da **entrada** do roteador para a **saída** correta (best-prefix match).
    
- **Interconexão de redes heterogêneas** (tecnologias distintas sob um mesmo protocolo de rede).
    

## 3) Modelos de serviço de rede

- Possíveis serviços: entrega garantida, atraso limitado, ordenação, banda mínima, jitter, segurança.
    
- **Internet/IP oferece “melhor esforço (best-effort)”**: sem garantia de entrega/atraso, sem reserva de recursos; descarta em congestionamento.
    

## 4) Datagramas × Circuitos Virtuais

- **Datagramas (Internet):** sem estabelecimento de conexão na L3; roteadores **não mantêm estado**; pacotes do mesmo fluxo podem seguir **rotas diferentes**.
    
- **Circuitos Virtuais (ATM/Frame-Relay/X.25):** há **sinalização** para estabelecer o CV; cada enlace tem um **ID de CV**; roteadores mantêm **estado** e podem **alocar recursos**.
    

## 5) Arquitetura de roteadores (visão de dentro)

- **Portas de entrada:** recepção física/enlace, lookup na tabela, **comutação descentralizada**; filas se a matriz/barramento não acompanha a taxa de chegada.
    
- **Matriz de comutação:** três famílias → **memória** (1ª geração), **barramento** (contensão no bus), **crossbar** (reduz contensão, disputa por porta de saída).
    
- **Portas de saída:** buffers e **escalonador**; filas por mismatch de taxa → **retardo** e **perdas** (transbordo); pode haver **head-of-line blocking** em entradas.
    

---

## 6) Internet (IPv4/IPv6) — componentes e formato

### 6.1 Pilha de protocolos na L3 da Internet

- **IP (IPv4/IPv6):** formato de datagrama, endereçamento, manuseio.
    
- **ICMP/ICMPv6:** mensagens de controle/erro, eco (ping), TTL excedido (traceroute).
    
- **Roteamento:** **RIP, OSPF, BGP** configuram rotas nas tabelas.
    

### 6.2 IPv4 — cabeçalho e fragmentação

- **Cabeçalho IPv4** contém: versão, IHL, TOS/DS, **comprimento total**, **identificação/flags/offset (fragmentação)**, TTL, **Protocolo superior**, **Checksum**, end. **origem/destino**, **opções**.
    
- **Fragmentação:** ocorre na rede quando datagrama > **MTU** do enlace; re-montagem **apenas no destino** usando ID/offset/flags.
    

### 6.3 Endereçamento IPv4, sub-redes e CIDR

- Endereço **de 32 bits é da interface**, não do host como entidade abstrata.
    
- **Sub-rede:** dispositivos que compartilham a mesma parte de rede; tráfego local não precisa de roteador.
    
- **CIDR:** a.b.c.d/**x** (comprimento de prefixo arbitrário, substitui classes A/B/C).
    

### 6.4 Atribuição dinâmica (DHCP)

- Descoberta/Oferta/Requisição/ACK; além do IP, pode entregar **gateway**, **DNS** e **máscara**.
    

### 6.5 Encaminhamento na prática

- O host verifica se o destino está **na mesma rede**: se sim, envia diretamente no enlace local; se não, envia ao **roteador padrão** (next hop) conforme tabela de rotas.
    

### 6.6 ICMP (exemplos)

- **Tipo/código**: rede/host/protocolo/porta inalcançáveis, **eco/eco-reply**, **TTL excedido**, **erro de cabeçalho**; usado por **ping** e **traceroute**.
    

### 6.7 NAT (IPv4)

- **Tradução de endereços** no roteador de borda: (IP/porta origem) ↔ (IP público/porta mapeada).
    
- Permitiu prolongar o IPv4, mas **fere o argumento fim-a-fim**; impacto em **P2P**; até ~60k mapeamentos por IP público (16 bits de porta).
    

### 6.8 IPv6 — motivações, cabeçalho, diferenças

- **Endereços 128 bits**; cabeçalho **fixo de 40 bytes**, **sem checksum** e **sem fragmentação na rede** (apenas na fonte via cabeçalho de extensão); **Next Header** encadeia extensões e indica protocolo superior; **Flow Label** para tratamento de fluxo/QoS; suporte nativo a **autenticação/privacidade**.
    
- **Representação:** oito grupos hex (X:X:…:X).
    
- **Transição:** **pilha dupla (dual-stack)** é a abordagem prática (tunelamento existe mas pouco adotado).
    

---

## 7) Essência para prova

- Distinguir **roteamento** × **encaminhamento** e o porquê do **best-effort** no IP.
    
- Contrastar **datagramas** × **circuitos virtuais** (estado, sinalização, alocação de recursos).
    
- Saber o **cabeçalho IPv4**, **MTU/fragmentação**, e o fluxo **CIDR → DHCP → tabela de rotas**.
    
- **ICMP**: finalidade e exemplos de tipo/código; **NAT**: funcionamento e limitações.
    
- **IPv6**: razões, **cabeçalho (40B, Next Header, Flow Label)**, remoções (checksum), e **transição dual-stack**.
    

Se quiser, transformo este resumo em **mapa mental em Markdown** pronto para colar no caderno (com ramificações para IPv4/IPv6, NAT, ICMP, DHCP, CIDR, roteamento/forwarding).