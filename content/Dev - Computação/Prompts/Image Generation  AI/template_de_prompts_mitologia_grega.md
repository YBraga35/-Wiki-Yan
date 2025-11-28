# Template Universal de Prompts – Campanha Mitologia Grega (Odyssey of the Dragonlords)

Use este arquivo como base. Em cada bloco, você só precisa **substituir os trechos entre [COLCHETES]** com o que quiser – texto descritivo ou link/imagem de referência.

Você pode copiar o bloco inteiro, colar no gerador de imagens e editar só o necessário.

---

## 1. Núcleo de Estilo – Painterly Épico (realista)

Use sempre que quiser manter o visual padrão das artes oficiais.

**BASE_STYLE_PAINTERLY:**
> digital painting, semi-realistic fantasy art inspired by ancient Greek mythology and Odyssey of the Dragonlords, heroic composition, character centered, dramatic lighting, detailed bronze and leather armor, flowing greek robes and drapery, laurel wreaths and mythic symbols, warm gold and red tones contrasted with cool blues and greens, ancient marble ruins or wild landscapes in the background, soft painterly brushstrokes, high detail, no visible lineart, no modern objects, no technology

**NEGATIVE (opcional):**
> no modern clothing, no guns, no sci-fi, no neon, no anime, no chibi, no low detail

---

## 2. Núcleo de Estilo – Cartoon Limpo (Kyrah / Narsus / Loreus)

Use quando quiser algo mais leve e estilizado, tipo arte de ficha de personagem.

**BASE_STYLE_CARTOON:**
> full-body character illustration in a clean cartoon style, sharp lineart, smooth cel shading, bold shapes and clear silhouette, ancient Greek fantasy clothing, laurel wreaths, flowing robes and cloaks, simple but elegant details, saturated colors with gentle gradients, expressive face and posture, no heavy textures, no realism, no modern elements

**NEGATIVE (opcional):**
> no realistic rendering, no photo, no 3d, no gritty textures

---

## 3. Prompt-Modelo – NPC Corpo Inteiro (Painterly)

Use este modelo para qualquer NPC em pose heroica.

>[OPCIONAL: reference image of the character in Odyssey of the Dragonlords style]
>full-body illustration of [DESCRIÇÃO RÁPIDA DO NPC: ex: a young male champion of the sun god], standing in a [POSE / ATITUDE: ex: heroic pose, one foot on a broken marble step].
>He/She/They wear(s) [ROUPA/ARMADURA: ex: bronze breastplate with sun emblem, red leather skirt, greaves and sandals], carry(ies) [ARMA/ITEM: ex: a blazing sword in one hand and a round bronze shield in the other], and has/have [TRAÇOS FÍSICOS E EXPRESSÃO: ex: long golden hair, determined expression].
>Background: [CENÁRIO: ex: ancient marble temple in ruins, distant mountains and a bright sky].
>STYLE: BASE_STYLE_PAINTERLY.
>[OPCIONAL: NEGATIVE]


---

## 4. Prompt-Modelo – Retrato / Meio Corpo (Painterly)

> [OPCIONAL: reference portrait image]
> portrait of [NOME OU PAPEL DO NPC: ex: Kyrah the Poet], from the waist up, facing the viewer.[TRAÇOS FÍSICOS: ex: young woman with short dark curly hair, green eyes].
> [ROUPA/ACESSÓRIOS: ex: simple white greek dress, laurel leaves in her hair, scrolls and feather quill on her back].
> Expression: [ex: gentle smile, thoughtful gaze].
> 
> Subtle background hint of [CENÁRIO: ex: parchment patterns and soft warm light].
> STYLE: BASE_STYLE_PAINTERLY.
> [OPCIONAL: NEGATIVE]

---

## 5. Prompt-Modelo – NPC Corpo Inteiro (Cartoon)

```text
[OPCIONAL: reference image in cartoon greek fantasy style]

full-body illustration of [DESCRIÇÃO DO NPC],
standing in a relaxed and expressive pose.

Design: [ROUPA/CORES: ex: orange and teal greek robes, laurel wreath, sandals].
Accessories: [ex: lyre in one hand, small birds perched on arm].
Expression: [ex: cheerful, playful].

STYLE: BASE_STYLE_CARTOON.
[OPCIONAL: NEGATIVE]
```

---

## 6. Prompt-Modelo – Cômodo / Sala Interna

### 6.1. Templo ou Sala Sagrada

```text
[OPCIONAL: reference image of a greek temple interior]

wide shot of the interior of an ancient Greek fantasy temple dedicated to [DIVINDADE OU TEMA].
Tall marble columns, statues of [DESCRIÇÃO], braziers with warm firelight, hanging vines and carved reliefs.
The floor is [MATERIAL/DETALHE], an altar at the center with [OBJETO IMPORTANTE].
Magical light streams in from above, mixing with torchlight, dust particles in the air.

STYLE: BASE_STYLE_PAINTERLY.
[OPCIONAL: NEGATIVE]
```

### 6.2. Taverna / Quarto / Sala Mundana

```text
[OPCIONAL: reference image of a rustic room]

interior of a [TIPO DE CÔMODO: ex: cozy tavern] in an ancient Greek fantasy setting.
Details: wooden tables and benches, clay jugs of wine, oil lamps, rough stone walls,
simple woven carpets, shields and spears hanging as decoration.
A soft warm golden light fills the room, with cooler shadows in the corners.

STYLE: BASE_STYLE_PAINTERLY.
[OPCIONAL: NEGATIVE]
```

---

## 7. Prompt-Modelo – Cenário Externo

### 7.1. Costa / Penhasco Tempestuoso

```text
[OPCIONAL: reference image of stormy coast]

epic landscape of an ancient Greek fantasy coastline during a storm.
Jagged rocks, roaring waves, distant marble temples on the cliffs.
[OPCIONAL PERSONAGEM: ex: a tall storm goddess with flowing white and gold robes stands on a rock, lightning crackling around her].

STYLE: BASE_STYLE_PAINTERLY.
[OPCIONAL: NEGATIVE]
```

### 7.2. Floresta / Selva Mítica

```text
[OPCIONAL: reference image of lush forest]

lush ancient jungle in a Greek fantasy world, with towering trees, hanging vines and shafts of sunlight cutting through the canopy.
A narrow stone path and fragments of old marble statues half-buried in moss.
[OPCIONAL PERSONAGEM: ex: winged warrior perched on a branch with bronze armor and feathered helm].

STYLE: BASE_STYLE_PAINTERLY.
[OPCIONAL: NEGATIVE]
```

### 7.3. Caverna Cristalina / Antro Sombrio

```text
[OPCIONAL: reference image of crystal cave]

mysterious underground crystal cavern in an ancient Greek fantasy setting.
Jagged turquoise crystals grow from the walls and floor, casting an eerie teal light.
At the center stands [TRONO/ALTAR/PERSONAGEM: ex: a shadowy queen in black dress on a stone throne with skulls and serpents].
Deep shadows in the background, soft mist on the ground.

STYLE: BASE_STYLE_PAINTERLY.
[OPCIONAL: NEGATIVE]
```

---

## 8. Usando Referência de Imagem (texto padrão)

Sempre que o gerador aceitar imagem de referência, você pode adicionar uma frase pronta:

**Em inglês:**
> in the same visual style, level of detail, armor design, color palette and mood as the reference image

**Em português:**
> no mesmo estilo visual, nível de detalhe, design de armadura, paleta de cores e clima da imagem de referência

---

## 9. Versão Ultra-Resumida (para colar rápido)

### NPC Heroico (painterly)
```text
full-body illustration of [NPC], heroic pose, ancient Greek fantasy armor and clothing, dramatic lighting, [CENÁRIO]. STYLE: BASE_STYLE_PAINTERLY.
```

### Retrato (painterly)
```text
portrait of [NPC], waist up, [TRAÇOS], subtle [CENÁRIO] background. STYLE: BASE_STYLE_PAINTERLY.
```

### Cômodo
```text
interior of [TIPO DE SALA] in an ancient Greek fantasy setting, [DETALHES]. STYLE: BASE_STYLE_PAINTERLY.
```

### Cenário Externo
```text
epic landscape of [LOCAL] in an ancient Greek fantasy world, [DETALHES + OPCIONAL PERSONAGEM]. STYLE: BASE_STYLE_PAINTERLY.
```

### NPC Cartoon
```text
full-body illustration of [NPC] in clean cartoon Greek fantasy style, expressive pose, [CORE/ROUPA]. STYLE: BASE_STYLE_CARTOON.
```

