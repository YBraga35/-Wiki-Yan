---
title: Sumário Inicial
description: Esse documento é o sumário e a página inicial do meu site baseado nas anotações do Obsidian.
aliases:
  - indexação
  - Índice
tags:
  - index-tag
  - indice-tag
draft: false
date: 2024-07-22
creation date: 2024-07-22 05:33
modification date: terça-feira 23º julho 2024 03:14:44
---

> [!quote] "Estamos presos à tecnologia quando o que realmente queremos é apenas coisas que funcionem."
> — Douglas Adams

# Notas Yan Braga

Bem-vindo ao repositório de minhas anotações! Aqui, você encontrará informações sobre meus interesses e projetos, organizados nas seguintes seções:

## 📚 RPG

Explore o mundo de Lhodos e conheça os elementos chave do meu universo RPG.

- **[[RPG/Deuses/index|Deuses]]**: Seres fantásticos e poderosos, baseados na mitologia do *Book of the Righteous*.
	- [[Um Tratado Sobre o Divino]]: Epopeia do Grande Sábio Matalou sobre a criação do mundo e o toque dos deuses sobre ele.
	Aqui está uma árvore com as divindades colocadas segundo ‘hierarquia’, ou seja, geração de divindades
	
- **[[RPG/Facções/index|Facções]]**: Grupos importantes, desde a Liga dos Aventureiros até cultistas antagonistas.
- **[[RPG/Heróis/Heróis|Heróis]]**: Lendas e figuras heroicas que refletem os valores culturais e divinos.
- **[[RPG/NPCs/index|NPCs]]**: Personagens recorrentes que enriquecem as histórias e aventuras.
- [[RPG/Regras/index|Regras]]: Regras alternativas ou complementares para as mesas de RPG, muitas vezes para todas as vezes, algumas em apenas algumas é aceito (consulte o narrador)


```mermaid
graph TD
    A[Inominavel] --> B[Antigos]
    A --> C[Sombrios]
    A --> D[Três Irmãs]
    A --> E[Elewinos]
    A --> F[Ventrinos]

    subgraph Antigos
        Elewin[Elewin - Arvore da Vida] 
        IRontra[Rontra - Deusa da Terra]
        Shalimyr[Shalimyr - Deus das Aguas]
        Urian[Urian - Deus do Ar e Ceu]
        Kador[Kador - Deus do Fogo]
    end

    subgraph Elewinos
        Mormekar[Mormekar - Deus da Morte e Renascimento]
        Morwyn[Morwyn - Deusa da Cura e Sabedoria]
        Terak[Terak - Deus da Guerra e Bravura]
        Tinel[Tinel - Deus da Magia, Conhecimento e Verdade]
        Zheenkeef[Zheenkeef - Deusa do Vinho, Loucura e Inspiracao]
    end

    subgraph Ventrinos
        Anwyn[Anwyn - Deusa do Lar e Lareira]
        Aymara[Aymara - Deusa do Amor e das Artes]
        Darmon[Darmon - Deus da Viagem, Riqueza e Alegria]
        Korak[Korak - Deus da Forja e dos Artesaos]
        Maal[Maal - Deus da Lei e da Justica]
    end

    subgraph Sombrios
        Asmodeus[Asmodeus - Deus das Mentiras e Poder]
        Canarak[Canarak - Deus da Destruicao e Raiva]
        Naran[Naran - Deus da Tirania e Orgulho]
        Thellos[Thellos - Deus da Ganancia e Gula]
    end

    subgraph Tres_Irmas
        Canelle[Canelle - Deusa da Vitoria]
        Naryne[Naryne - Deusa da Nobreza]
        Thellyne[Thellyne - Deusa do Entalhamento e Caca]
    end

    %% Definindo relações de paternidade
    E --> Mormekar
    E --> Morwyn
    E --> Terak
    E --> Tinel
    E --> Zheenkeef

    Mormekar --> Maal
    Morwyn --> Aymara
    Morwyn --> Korak
    Zheenkeef --> Darmon
    Zheenkeef --> Aymara
    Terak --> Korak
    Tinel --> Darmon
    Tinel --> Aymara

```

## 💻 Desenvolvimento

Referências e conhecimentos técnicos voltados para áreas específicas de T.I.

- **[[Dev - Computação/Docker/index|Docker]]**: Guia completo sobre Docker, desde a instalação até técnicas avançadas.
- **[[Dev - Computação/Syncthing/index|Syncthing]]**: Tutoriais e dicas para a sincronização eficiente de arquivos.
- **[[Dev - Computação/Outros]]**: Outras ferramentas e tecnologias úteis para desenvolvedores.

---