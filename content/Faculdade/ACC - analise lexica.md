---
title: ACC - analise lexica
draft: true
date: 2024-10-30
---

# Análise Léxica e Sintática em um Compilador

## 1. Análise Léxica

A **análise léxica** é a primeira fase do processo de compilação. Seu objetivo é ler o código-fonte e convertê-lo em uma sequência de **tokens**, que são as menores unidades de significado. Esses tokens podem ser palavras reservadas, identificadores, operadores, números, etc. O **analisador léxico** (ou *scanner*) varre o código, reconhecendo padrões usando **expressões regulares** e os convertendo em tokens.

### Mecanismos Utilizados:
- **Autômatos Finitos Determinísticos (AFDs)**: São usados para reconhecer padrões específicos no código-fonte, como números, operadores e palavras reservadas. As expressões regulares que descrevem esses padrões são transformadas em AFDs, que então processam o código caractere por caractere.

### Exemplo Prático:
Vamos supor que temos a seguinte expressão em uma linguagem de programação:

```cpp
x = a + 10;
```

O trabalho do analisador léxico é converter isso em tokens, como:

| Token   | Tipo            |
|---------|-----------------|
| `x`     | Identificador    |
| `=`     | Operador Atribuição |
| `a`     | Identificador    |
| `+`     | Operador Soma    |
| `10`    | Número           |
| `;`     | Delimitador      |

#### Padrões Léxicos (Expressões Regulares):
- Identificadores: `[a-zA-Z_][a-zA-Z0-9_]*`
- Números: `[0-9]+`
- Operadores: `=`, `+`, `-`, etc.
- Delimitadores: `;`, `{`, `}`, etc.

Esses padrões são reconhecidos por autômatos finitos que se movem entre estados ao ler cada caractere.

### Autômato Finito para Números:
Uma expressão regular como `[0-9]+` pode ser representada por um autômato finito que reconhece qualquer sequência de dígitos:

1. Estado inicial (S0) aceita o primeiro dígito.
2. Transita para o estado final (S1) se encontra mais dígitos.
3. Permanece em S1 enquanto lê mais dígitos até que a sequência seja interrompida.

---

## 2. Análise Sintática

Após a análise léxica, temos uma sequência de tokens. A **análise sintática** (ou *parsing*) organiza esses tokens em uma **estrutura hierárquica** que segue as regras gramaticais da linguagem. A saída dessa fase é geralmente uma **árvore sintática** (*parse tree*), que mostra a estrutura do código em termos de suas construções (expressões, comandos, etc.).

### Mecanismos Utilizados:
- **Gramáticas Livres de Contexto (GLCs)**: Descrevem as regras de formação de sentenças válidas na linguagem. Essas gramáticas são formadas por produções, que especificam como os tokens podem ser organizados.
  
- **Autômatos de Pilha**: São usados para reconhecer linguagens descritas por GLCs. Esses autômatos têm uma pilha para lidar com estruturas hierárquicas como expressões aninhadas e blocos de código.

### Exemplo Prático de Gramática:
Vamos considerar uma gramática simples para expressões aritméticas:

```
E -> E + T | T
T -> T * F | F
F -> ( E ) | id
```

Aqui, `E` representa uma expressão, `T` representa um termo, `F` representa um fator e `id` representa um identificador (ou número).

### Exemplo de Palavra:
Considere a expressão aritmética:

```txt
a + b * c
```

Essa expressão seria reconhecida pela gramática da seguinte forma:

1. Começamos com a regra `E -> E + T`, onde `E` é a expressão `a`.
2. O próximo token `+` é aceito, e o analisador agora espera um termo (`T`).
3. O termo `T` é `b * c`, que segue a regra `T -> T * F`, com `b` sendo um termo (`T`) e `c` sendo um fator (`F`).

Essa estrutura é convertida em uma **árvore sintática** que representa a ordem das operações. Por exemplo, na árvore, a multiplicação (`b * c`) será realizada antes da soma (`a + (b * c)`), respeitando a precedência dos operadores.

### Autômato de Pilha:
Os **autômatos de pilha** conseguem lidar com a estrutura recursiva das gramáticas. Quando o analisador encontra uma abertura de parêntese `(`, ele "empilha" esse símbolo na pilha. Quando encontra o fechamento `)`, ele "desempilha" e processa a subexpressão interna.

---

## Resumo:

- **Análise Léxica**: Utiliza **expressões regulares** e **autômatos finitos** para reconhecer padrões e gerar tokens.
- **Análise Sintática**: Utiliza **gramáticas livres de contexto** e **autômatos de pilha** para validar a estrutura do código e construir uma árvore sintática.

Essas duas etapas são essenciais para que o compilador transforme o código-fonte em algo que possa ser processado e executado pelo computador.
