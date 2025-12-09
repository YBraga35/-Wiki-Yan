---
tags:
  - Category/Continent
obsidianUIMode: preview
MyContainer: "[[Lhodos]]"
image: Template_Continent_Placeholder.png
---



> [!NOTE] Parent Planet: `INPUT[suggester(optionQuery(#Category/Planet)):MyContainer]`

> [!column|no-i no-t]
>> [!info|no-title] Map
>> ![[Template_Continent_Placeholder.png]]
>
>> [!note|no-title] Town Name
>> ~~~meta-bind
>> INPUT[select(
>> option(1, ℹ️General Info),
>> option(2, 🌐Region Details),
>> option(3, 📝GM Notes),
>> class(tabbed)
>> )]
>> ~~~
>>>[!tabbed-box-maxh]
>>> >[!div-m|no-title]
>>> > ![[#General Info|no-h clean]]
>>>
>>> >[!div-m|no-title]
>>> > ![[#Region Details|no-h clean]]
>>>
>>> > [!div-m|no-title]
>>> > ![[#GM Notes|no-h clean]]
>>> 

> [!NOTE|no-title]
> ~~~meta-bind
> INPUT[select(
> option(1, 🗺️Regions),
> option(2, ⚔️Capital Cities),
> class(tabbed)
> )]
> ~~~
> >[!tabbed-box]
> > >[!div-m|no-title]
> > > ![[#Regions|no-h clean]]
> >
> > > [!div-m|no-title]
> > > ![[#Capital Cities|no-h clean]]
> > 

---
# General Info

A Costa Esmeralda é um continente costeiro e arquipelágico, recortado por falésias verdejantes, selvas úmidas e baías enevoadas. Suas margens são pontilhadas por portos livres, pequenos reinos costeiros e refúgios piratas, enquanto o interior é tomado por florestas densas e pântanos antigos onde a luz de Rodu mal penetra.

As **Falésias de Jade** dominam trechos inteiros de litoral, guardando cavernas repletas de cristais e ruínas suspensas sobre o mar. Atrás delas, a vasta **Selva do Véu Esmeralda** engole caminhos, cidades perdidas e templos de civilizações pré-Rodu. Mais ao largo, o **Arquipélago das Correntes Quebradas** é o lar de piratas, exilados e corsários patrocinados por potências estrangeiras.

Na **Baía dos Sussurros Antigos**, vozes veladas ecoam nas marés e nas neblinas; alguns dizem que são restos de orações antigas, outros juram que o próprio oceano responde à luz de Rodu. Ao longo da **Faixa dos Reinos de Areia Verde**, cidades-estado costeiras disputam comércio, rotas de especiarias e alianças com Apios e Korala. A Costa Esmeralda é o palco ideal para temas de exploração versus preservação, civilização costeira versus forças selvagens e oceânicas, e para o confronto direto com o desconhecido.


# Region Details

**Dominant Races:**  
Humanos costeiros (pescadores, piratas, marinheiros, mercadores), elfos marinhos e florestais, povos anfíbios e insulares, comunidades mistas de refugiados e exilados vindos de Apios e Korala.

**Climate:**  
Predominantemente tropical e subtropical, com faixas litorâneas quentes, selvas úmidas, manguezais extensos e temporadas de tempestades violentas. Neblinas densas são comuns na Baía dos Sussurros Antigos, enquanto o Arquipélago das Correntes Quebradas enfrenta correntes imprevisíveis e ventos inconstantes.


# GM Notes

Use a Costa Esmeralda como cenário de:

- Campanhas de exploração (selvas, ruínas, cidades perdidas, templos pré-Rodu).  
- Histórias de pirataria, corsários e política naval no Arquipélago das Correntes Quebradas.  
- Horror marítimo e espiritual na Baía dos Sussurros Antigos, misturando lendas marinhas com o tema do oceano de trevas original.  

A **Faixa dos Reinos de Areia Verde** é ideal para intriga entre cidades costeiras, diplomacia entre continentes e jogos de influência entre Korala e Apios. As **Falésias de Jade** e a **Selva do Véu Esmeralda** são zonas de dungeons praticamente infinitas, misturando exploração geográfica com segredos cosmológicos ligados ao passado anterior à luz de Rodu.



# Regions

`BUTTON[button_region]` **continent** Places where people live - Cities, Towns, Villages, Hamlets, Encampment, Keeps, Fortresses, Strongholds.

```base
properties:
  file.name:
    displayName: Region Name
views:
  - type: cards
    name: Region - Cards
    filters:
      and:
        - file.folder == "RPG/2-World/Regions"
        - list(MyContainer).contains(this)
    order:
      - file.name
    image: note.image
  - type: table
    name: Region - Table
    filters:
      and:
        - file.folder == "2-World/Regions"
        - list(MyContainer).contains(this)
    order:
      - file.name
      - MyContainer
    sort:
      - property: file.name
        direction: ASC
    columnSize:
      file.name: 182

```

# Capital Cities

`BUTTON[button_group]` Groups of people and power - religious, cults, guilds, military

```base
formulas:
  LinkedToThisContinent: |
    list(MyContainer)
      .map(link(value))
      .filter(file(value))
      .filter(
        list(file(value).properties.MyContainer)
          .map(link(value))
          .contains(this)
      )
      .length > 0
  RegionsForThis: |
    list(MyContainer)
      .map(link(value))
      .filter(file(value))
      .filter(
        list(file(value).properties.MyContainer)
          .map(link(value))
          .contains(this)
      )
      .map(link(value, file(value).name))
properties:
  file:
    displayName: Hub
  MyCategory:
    displayName: Type
  RegionsForThis:
    displayName: Region(s)
views:
  - type: cards
    name: Capital Cities (Cards)
    filters:
      and:
        - file.inFolder("RPG/2-World/Hubs")
        - formula.LinkedToThisContinent
        - or:
            - MyCategory.contains("City +1500")
            - list(MyCategory).contains("City +1500")
    image: note.image
  - type: table
    name: Capital Cities (List)
    filters:
      and:
        - file.inFolder("2-World/Hubs")
        - formula.LinkedToThisContinent
        - or:
            - MyCategory.contains("City +1500")
            - list(MyCategory).contains("City +1500")
    order:
      - file
      - MyCategory
      - RegionsForThis

```
