# 🛡️ **Wiki: Estilo e Arquitetura do Ultros**

**Ultros – Manual de Estilo, Estrutura e Ambientes Internos**

> _Um artefato vivo de madeira dríadica, construído com magia ancestral e usado como navio de guerra e de destino — a embarcação lendária de Thylea._

---

# 1. Visão Geral do Estilo do Ultros

## 1.1. Identidade Visual

- Madeira dríadica viva (carvalho ancestral com **veios luminosos dourados**).
    
- Arcos, pilares e vigas com **entalhes druidicos** e **curvaturas orgânicas**.
    
- Mescla de luz natural abafada com:
    
    - **tochas** de tom âmbar
        
    - brilho **mágico interno verde-azulado**
        

## 1.2. Paleta

- Ouro envelhecido
    
- Verde etéreo
    
- Ocre, âmbar e bronze
    
- Tons marítimos (azul profundo, cinza salgado)
    

## 1.3. Estética Artística

- “**Hand-painted semi-realistic fantasy**”
    
- Linhas limpas e nítidas
    
- Texturas fortes de madeira
    
- Alta legibilidade
    
- Nada moderno, sci-fi ou metálico brilhante
    
- Composição **simétrica, arrumada, funcional**
    

## 1.4. Conceito Central

O navio é um **ser vivo**.

- Paredes parecem ter crescido, não sido construídas.
    
- Algumas áreas têm pulsos sutis de luz.
    
- Madeira reage à presença de magia ou emoções fortes.
    

---

# 2. Estrutura Geral do Navio

## 2.1. Pavimentos

- Convés superior
    
- Convés de comando
    
- Convés dos remadores
    
- Cabines internas
    
- SantUário do Casco (parte mágica central)
    
- Armeria
    
- Armazém
    
- Baía de rituais
    
- Câmaras da tripulação
    
- Câmara do Capitão
    
- Câmara do Oráculo (se houver em sua versão)
    

## 2.2. Elementos Estruturais Comuns

- **Mastro central** sempre talhado com espirais vivas
    
- Vigas arqueadas
    
- Portinholas, escotilhas e janelas com molduras naturais
    
- Reforços metálicos discretos com runas
    

---

# 3. Style Guide de Prompt

Página dedicada para copiar e colar o estilo padrão.

## 3.1. Prompt Base do Ultros

```text
[OPCIONAL: reference image of previous Ultros interior]

wide shot of the interior of the [NOME DO CÔMODO] aboard the Ultros,
a legendary magical trireme of Thylea built from ancient dryad-oak.

Architecture carved in living druidic wood: glowing golden veins in the grain,
arched supports with swirling motifs, reinforced beams with subtle magical metal bands.
Soft warm light from wall-mounted oil lamps; faint greenish arcane luminescence
emanating from within the wooden structure.

The room’s layout is functional, symmetrical, with clean composition:
[DESCRIÇÃO DO CÔMODO EM SI]

Materials: dryad-oak planks, organic curved shapes,
polished edges, aged surfaces with salt and time.

Atmosphere evokes myth, discipline, and silent magical power.

STYLE: BASE_STYLE_PAINTERLY.
Hand-painted semi-realistic textures; clean lines; high readability;
no clutter unless explicitly described.

[NEGATIVE: avoid clutter, incorrect geometry, cartoon style, plastic textures,
modern objects, warped oars, low rowing ports, benches with no leg-space,
anamorphic distortions, fisheye, washed-out colors, sci-fi glow]
```

---

# 4. Style Guide Específico: Convés dos Remadores

Página dedicada exclusivamente para consistência anatômica.

## 4.1. Regras Anatômicas

- Bancos a **altura ergonômica**
    
- Espaço de pernas **profundo e livre**
    
- Portas dos remos na **altura do peito**
    
- Remos **longos**, inclinados para fora
    
- Fileiras **intercaladas**
    
- Corredor central sempre livre
    

## 4.2. Prompt dedicado

```text
Interior of the rowers’ deck aboard the Ultros.

Correct anatomical rowing layout:
- benches at ergonomic height;
- ample forward leg space;
- rowing ports at chest-height;
- long outward-angled oars;
- staggered bench rows;
- clean central corridor.

Dryad-oak structure with glowing veins; carved support pillars;
warm torchlight plus subtle green magical resonance.
Symmetrical, functional, mythic.

STYLE: BASE_STYLE_PAINTERLY.

[NEGATIVE: low oar ports, benches too high or tight, oars too short,
leg-space obstructions, messy layout]
```

---

# 5. Biblioteca de Ambientes

Crie uma página para cada ambiente com:

1. **Descrição narrativa curta**
    
2. **Função no navio**
    
3. **Elementos característicos**
    
4. **Prompt oficial do local**
    
5. **Negative específico** (se preciso)
    
6. **Tags** (Foundry/Obsidian)
    

Exemplo de template:

---

## [Cômodo X]

### 1. Descrição narrativa

Texto breve da sua wiki.

### 2. Função

O que esse cômodo faz no Ultros.

### 3. Elementos Visuais Característicos

- lista do que deve aparecer
    
- reforços arquitetônicos específicos
    
- objetos essenciais
    

### 4. Prompt oficial

```text
[Prompt baseado no Style Guide adaptado ao cômodo]
```

### 5. Negative dedicado

Problemas comuns para evitar.

### 6. Tags

Ultros, interior, naval, Thylea, OotD

---

# 6. Páginas Sugeridas da Wiki

(para adicionar no seu sidebar)

```
Ultros/
   ├── 1. Lore e História do Ultros
   ├── 2. Estilo Visual do Ultros (Style Bible)
   ├── 3. Estrutura Arquitetônica
   ├── 4. Conjuntos de Cômodos
   │        ├── Convés Superior
   │        ├── Convés dos Remadores
   │        ├── Câmara do Capitão
   │        ├── Câmara da Tripulação
   │        ├── Armeria
   │        ├── Baía de Rituais
   │        ├── Cofre do Casco
   │        ├── Armazém
   │        ├── Cabines Var diversas
   │        └── Santuário da Dríade
   └── 5. Kit de Prompts
            ├── Prompt Base
            ├── Prompt por Ambiente
            ├── Negative Universal
            └── Estrutura de “Como o modelo pensa”
```

---

# 7. Se quiser, posso gerar agora:

1. **Os arquivos Markdown completos** já formatados para colar na sua wiki.
    
2. Criar **todas as páginas iniciais** do Ultros com placeholders.
    
3. Criar **templates exportáveis** para que você sempre adicione novos cômodos.
    

Qual dessas opções você prefere que eu construa agora?

