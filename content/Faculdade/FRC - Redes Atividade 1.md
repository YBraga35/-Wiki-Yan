# Resolução da Questão 10

  

## Dados do problema:

  

- Taxa de dados: 10 Mbps = 10 × 10⁶ bps

- Distância A-C: 2.000 m

- Velocidade de propagação: 2 × 10⁸ m/s

- t₁ = 0 (A inicia transmissão)

- t₂ = 3 µs (C inicia transmissão)

  
  

## Cálculo do tempo de propagação:

  

\$ t_{prop} = \frac{d}{v} = \frac{2.000}{2 × 10^8} = 10^{-5} s = 10 µs \$

  

## Resolução:

  

**a) Instante em que a estação C ouve a colisão (t₃):**

  

C detecta colisão quando o sinal de A chega até ela:

\$ t_3 = t_1 + t_{prop} = 0 + 10 = 10 µs \$

  

**b) Instante em que a estação A ouve a colisão (t₄):**

  

A detecta colisão quando o sinal de C chega até ela:

\$ t_4 = t_2 + t_{prop} = 3 + 10 = 13 µs \$

  

**c) Número de bits que A enviou antes de detectar a colisão:**

  

A transmite de t = 0 até t = 13 µs:

\$ Bits_A = taxa × tempo = 10 × 10^6 × 13 × 10^{-6} = 130 bits \$

  

**d) Número de bits que C enviou antes de detectar a colisão:**

  

C transmite de t = 3 µs até t = 10 µs (duração: 7 µs):

\$ Bits_C = taxa × tempo = 10 × 10^6 × 7 × 10^{-6} = 70 bits \$

  

## Respostas:

  

- a) t₃ = 10 µs

- b) t₄ = 13 µs

- c) 130 bits

- d) 70 bits

<span style="display:none">[^1]</span>

  

<div style="text-align: center">⁂</div>

  

[^1]: Ativ1CamadasFisicaEnlace-atual.pdf