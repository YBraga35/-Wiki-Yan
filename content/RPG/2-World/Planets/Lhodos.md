---
tags:
  - Category/Planet
obsidianUIMode: preview
MyContainer: "[[System of White Crown]]"
image: Template_Planet_Placeholder.png
---




> [!NOTE] Parent Star System: `INPUT[suggester(optionQuery(#Category/StarSystem)):MyContainer]`

> [!column|no-i no-t]
>> [!info|no-title] Map
>> ![[Template_Planet_Placeholder.png]]
>
>> [!note|no-title] Town Name
>> ~~~meta-bind
>> INPUT[select(
>> option(1, ℹ️General Info),
>> option(2, 🌐Planet Details),
>> option(3, 📝GM Notes),
>> class(tabbed)
>> )]
>> ~~~
>>>[!tabbed-box-maxh]
>>> >[!div-m|no-title]
>>> > ![[#General Info|no-h clean]]
>>>
>>> >[!div-m|no-title]
>>> > ![[#Planet Details|no-h clean]]
>>>
>>> > [!div-m|no-title]
>>> > ![[#GM Notes|no-h clean]]
>>> 

> [!NOTE|no-title]
> ~~~meta-bind
> INPUT[select(
> option(1, 🗺️Continents),
> option(2, 👽Sapient Species),
> option(3, ⚔️Capital Cities),
> class(tabbed)
> )]
> ~~~
> >[!tabbed-box]
> > >[!div-m|no-title]
> > > ![[#Continents|no-h clean]]
> >
> > > [!div-m|no-title]
> > > ![[#Sapient Species|no-h clean]]
> > 
> > > [!div-m|no-title]
> > > ![[#Capital Cities|no-h clean]]
> > 

---
# General Info

**Lhodos, o Mundo Iluminado**, é o principal planeta habitado do Sistema da Coroa Branca.  
É aqui que a luz de Rodu e a influência de Vuin se manifestam de forma mais direta na vida cotidiana: colheitas, marés, magia divina e até o humor das populações parecem seguir o ritmo dos astros.

Da perspectiva de quem vive em Korala, Lhodos é "todo o mundo". Ainda assim, sábios e profetas reconhecem que ele é apenas uma das muitas ilhas de luz espalhadas pelo oceano de estrelas.

As principais macrorregiões conhecidas incluem:

- **Terras Sagradas de Korala**  
  Coração político e religioso, onde se encontram o Reino de Merrane, Karlasgard, Rutilho, Edimburgo e outras cidades-estado importantes.

- **Planícies de Geloeterno** (norte)  
  Extensões geladas de tundra e geleiras, lar de povos resistentes, criaturas antigas e segredos enterrados no gelo.

- **Deserto Infindável de Serappicco** (faixa equatorial)  
  Um mar de areia e rocha, pontuado por oásis, cidades caravana e ruínas de civilizações que desafiaram o Sol de Rodu.

- **Costa Esmeralda** (hemisfério sul)  
  Florestas verdejantes, rios caudalosos e uma cultura fortemente ligada à natureza, à magia druídica e aos ciclos de Vuin.

- **Arquipélago de Apios Selvagem** (extremo sul)  
  Conjunto de ilhas onde selva, monstros e piratas dividem espaço com templos esquecidos e portos mercantes improvisados.

- **Sibrius** (ocidente)  
  Um outro grande continente, ainda parcialmente misterioso para os povos de Korala, com reinos, impérios e mitologias próprias.

Essas regiões não esgotam o planeta, mas compõem o "mapa conhecido" que a maioria dos viajantes e cartógrafos utiliza.


# Planet Details

**Dominant Races:**  
Humanos formam a maioria em reinos como Merrane, Bastião e diversos estados de Korala e Sibrius.  
Anões concentram-se em cadeias montanhosas e fortalezas como Karlasgard.  
Elfos dominam grandes extensões florestais na Costa Esmeralda e em partes de Sibrius.  
Halflings, gnomos e outras raças convivem dispersas em vilas, rotas de comércio e enclaves específicos.

**Climate:**  
Lhodos possui clima predominantemente temperado nas Terras Sagradas de Korala, com verões quentes e invernos frios, mas não extremos.  
Ao norte, o clima torna-se polar nas **Planícies de Geloeterno**.  
A faixa equatorial é dominada pelo **Deserto Infindável de Serappicco**, seco e escaldante.  
No hemisfério sul, a **Costa Esmeralda** e o **Arquipélago de Apios Selvagem** exibem clima mais úmido, com florestas densas e chuvas intensas.  
A combinação entre o brilho de Rodu, as fases de Vuin e o véu de Nyxara gera variações sutis de luz e temperatura que muitas culturas interpretam de forma mística.

**Seasons:**  
Os povos de Lhodos costumam dividir o ano em quatro estações "mundanas" – primavera, verão, outono e inverno – mas astrólogos e sacerdotes trabalham com três **Grandes Ciclos** ligados aos astros:

- **Ciclo Radiante de Rodu**  
  Período de dias mais longos e quentes, auge de colheitas e campanhas militares.

- **Ciclo de Vuin**  
  Fase em que as noites ficam mais longas e as marés mágicas se intensificam; é uma época propícia a rituais, sonhos proféticos e intrigas.

- **Ciclo de Nyxara**  
  Intervalos raros em que o céu noturno fica excepcionalmente claro, revelando mais estrelas e presságios. É quando se espera o inesperado: surgem cometas, portentos sombrios e oportunidades perigosas.

# GM Notes

Lhodos é o "ponto de vista padrão" dos personagens.  
Use esta nota como resumo do planeta para ligar a escala local (cidades, regiões, facções) à escala cósmica (sistema, galáxia):

- Quando precisar de **variação de tom**, escolha um continente diferente:  
  — Planícies de Geloeterno para sobrevivência e mitos antigos;  
  — Serappicco para jornadas exaustivas e ruínas solares;  
  — Costa Esmeralda e Apios para aventuras de exploração selvagem ou navais;  
  — Sibrius para campanhas inteiras com "clima de outro mundo", mas ainda no mesmo planeta.

- Os **Grandes Ciclos** permitem justificar mecânicas de cenário:  
  bônus temporários para certas magias, aumento de atividade de monstros específicos ou abertura/fechamento de rotas mágicas.

- Sempre que quiser "puxar" o tema de luz vs. sombra, lembre os jogadores de que Lhodos é apenas um ponto no oceano de estrelas – e que algo, em algum lugar, está mexendo nessas marés de luz.

# Continents

`BUTTON[button_continent]` **Continents**  Large continuous landmasses that contain regions.

```base
properties:
  file.name:
    displayName: Continent(s)
views:
  - type: cards
    name: Continents - Cards
    filters:
      and:
        - file.folder == "RPG/2-World/Continents"
        - list(MyContainer).contains(this)
    order:
      - file.name
    image: note.image
  - type: table
    name: Continents - Table
    filters:
      and:
        - file.folder == "2-World/Continents"
        - list(MyContainer).contains(this)
    order:
      - file.name
    sort:
      - property: file.name
        direction: DESC
    columnSize:
      file.name: 182

```

# Sapient Species

`BUTTON[button_species]`  Intelligent species that live on this planet. 

```base
properties:
  file.name:
    displayName: Sapient Species(s)
views:
  - type: cards
    name: Sapient Species - Cards
    filters:
      and:
        - file.folder == "RPG/2-World/Sapient Species"
        - list(MyContainer).contains(this)
    order:
      - file.name
    image: note.image
  - type: table
    name: Sapient Species - Table
    filters:
      and:
        - file.folder == "2-World/Sapient Species"
        - list(MyContainer).contains(this)
    order:
      - file.name
    sort:
      - property: file.name
        direction: DESC
    columnSize:
      file.name: 182

```

# Capital Cities

`BUTTON[button_hub]` Groups of people and power - religious, cults, guilds, military

```base
filters:
  and:
    - formula.LinkedToThisPlanet
    - MyContainer.contains(this)
formulas:
  LinkedToThisPlanet: |
    list(MyContainer)
      .filter(
        file(value)
        && list(file(value).properties.MyContainer)
             .filter(
               file(value)
               && list(file(value).properties.MyContainer)
                    .contains(this)
             ).length > 0
      ).length > 0
properties:
  file:
    displayName: Hub
  MyCategory:
    displayName: Type
  MyContainer:
    displayName: Region(s)
views:
  - type: cards
    name: Capital Cities (Cards)
    filters:
      and:
        - file.inFolder("RPG/2-World/Hubs")
        - list(MyCategory).contains("City +1500")
    order:
      - file
      - MyCategory
      - MyContainer
    image: note.image
  - type: table
    name: Capital Cities (List)
    filters:
      and:
        - file.inFolder("2-World/Hubs")
        - formula.LinkedToThisPlanet
        - list(MyCategory).contains("City +1500")
    order:
      - file
      - MyCategory
      - MyContainer

```
