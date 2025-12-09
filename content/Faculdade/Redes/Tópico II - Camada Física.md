---
share_link: https://share.note.sx/4zjrsn7f#67Dw1Bn0A/jX+Pf+d8Op/WZv2rS5c7TkaEdaVZnii14
share_updated: 2025-10-05T21:19:15-03:00
---

# 🧠 Mapa Mental — Camada Física

**Fundamentos de Redes e Sistemas Distribuídos — Prof. João Gluz (UFCSPA, 2025)**

---

## ⚙️ 1. Função da Camada Física

- Responsável por:
    
    - Transmitir **bits (0 e 1)** entre dispositivos
        
    - Converter **dados digitais → sinais físicos**
        
    - Controlar o **meio físico** de transmissão
        
- Principais serviços:
    
    - Codificação de sinais
        
    - Direção e controle do fluxo
        
    - Sincronização e sinalização
        

---

## 🌊 2. Meios Físicos e Transmissão

- Comunicação feita por **ondas** (geralmente eletromagnéticas)
    
- **Etapas de comunicação:**
    
    1. Geração da informação
        
    2. Codificação em símbolos (dados)
        
    3. Conversão em sinais físicos
        
    4. Transmissão e recepção
        
    5. Decodificação e reconstrução
        

---

## 💡 3. Conceitos Fundamentais

### 🔸 Dados, Informação e Sinais

|Termo|Definição|
|---|---|
|**Informação**|Conteúdo ou significado dos dados|
|**Dados**|Representação simbólica da informação|
|**Sinais**|Alterações no meio físico que carregam os dados|

### 🔸 Tipos

- **Analógicos:** contínuos (voz, som)
    
- **Digitais:** discretos (0/1)
    
- **Sinais Analógicos:** variação contínua no tempo
    
- **Sinais Digitais:** variação discreta, níveis fixos
    

---

## 📈 4. Características dos Sinais

### 🔹 Sinais Senoidais

- **Amplitude (A):** valor máximo do sinal
    
- **Frequência (f):** ciclos por segundo (Hz)
    
- **Fase (φ):** ponto inicial do ciclo
    
- **Período (P):** tempo para completar 1 ciclo  
    [  
    f = \frac{1}{P}  
    ]
    

### 🔹 Distorções

|Tipo|Descrição|
|---|---|
|Atenuação|Perda de energia ao longo do meio|
|Delay|Atraso na transmissão|
|Jitter|Variação do atraso|
|Eco|Reflexão por diferença de impedância|
|Ruído térmico|Agitação dos elétrons (ruído branco)|
|Crosstalk|Interferência entre fios|
|Ruído impulsivo|Pulsos irregulares, imprevisíveis|

---

## 📡 5. Banda Passante e Largura de Banda

- **Banda Passante (BW):** intervalo de frequências que passam com baixa atenuação  
    [  
    BW = f_{max} - f_{min}  
    ]
    
- Todo meio tem uma **faixa de frequências úteis**
    
- Determina **quantos sinais** podem ser transmitidos simultaneamente
    
- Sinais também possuem uma **banda própria** (Fourier)
    

---

## ⚖️ 6. Taxas e Capacidade do Canal

### 🔹 Taxas

|Conceito|Definição|Unidade|
|---|---|---|
|**Bitrate**|Bits transmitidos por segundo|bps|
|**Baudrate**|Sinais discretos por segundo|bauds|

**Relação:**  
[  
baud = \frac{bitrate}{bits_por_sinal}  
]

Exemplo:

- 2 níveis → baud = bit
    
- 4 níveis → baud = bit/2
    
- 8 níveis → baud = bit/3
    

---

## 📏 7. Limites Teóricos de Transmissão

### 🔸 Teorema de Nyquist (canal sem ruído)

[  
C = 2W \cdot \log_2(L)  
]

- _C:_ taxa máxima (bps)
    
- _W:_ largura de banda (Hz)
    
- _L:_ níveis de sinal
    

🧮 Exemplo:  
W = 3 kHz, L = 16 →  
C = 2×3000×log₂(16) = **24 kbps**

---

### 🔸 Teorema de Shannon (canal com ruído)

[  
C = W \cdot \log_2(1 + \frac{S}{N})  
]

- _S/N:_ relação sinal/ruído
    
- Em **dB:**  
    [  
    dB = 10 \cdot \log_{10}(S/N)  
    ]
    

🧮 Exemplo:  
W = 3 kHz, S/N = 30 dB →  
S/N = 1000 →  
C ≈ **30 kbps**

---

## 🧩 8. Técnicas de Transmissão

### 🔹 1. **Banda-Base**

- Sinal digital transmitido diretamente (sem modulação)
    
- Requer meio “passa-baixa” (cabos metálicos, Ethernet)
    
- Simples e eficiente em curtas distâncias
    

### 🔹 2. **Modulação (Banda-Larga)**

- Conversão do sinal digital → analógico
    
- Usa **sinal portador** com variação de propriedades
    

#### Tipos de Modulação:

|Tipo|Nome|Característica|
|---|---|---|
|**AM**|Amplitude Modulation|varia a amplitude|
|**FM**|Frequency Modulation|varia a frequência|
|**PM**|Phase Modulation|varia a fase|

- Usada em **rádio, fibra ótica, Wi-Fi, satélites**
    

---

## 🧮 9. Fórmulas Importantes

|Conceito|Fórmula|Descrição|
|---|---|---|
|Frequência–Período|f = 1/P|Relação entre tempo e ciclos|
|Nyquist|C = 2W·log₂(L)|Capacidade sem ruído|
|Shannon|C = W·log₂(1+S/N)|Capacidade com ruído|
|Conversão dB → S/N|S/N = 10^(dB/10)|Ruído em forma linear|
|Bitrate–Baudrate|baud = bitrate / bits_por_sinal|Eficiência da codificação|

---

## 🔚 10. Conclusão

- A **Camada Física** define o **nível fundamental da comunicação**.
    
- Converte dados binários em sinais físicos.
    
- A eficiência depende da:
    
    - **Banda disponível**
        
    - **Qualidade do meio**
        
    - **Nível de ruído**
        
    - **Técnica de modulação**
        
- É a base para todas as **camadas superiores** (Enlace, Rede, Transporte, Aplicação).
    
