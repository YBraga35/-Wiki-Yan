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

Apios é o grande continente do conhecimento, da burocracia e do poder secular. Suas cidades-estado e repúblicas mercantis ergueram cúpulas de vidro, mármore e bronze para estudar o céu de Rodu, registrar a história e catalogar cada milha do mundo conhecido. Aqui, os deuses são respeitados, mas frequentemente colocados lado a lado com tratados, leis e teorias filosóficas.

Ao norte e ao interior, as montanhas da **Cadeia de Ferro** sustentam um complexo maquinário de minas, forjas e estradas fortificadas; ao sul, a vasta **Bacia de Serapis** se derrama em rios navegáveis que alimentam cidades portuárias e centros agrícolas. Nas margens do mar, a **Confederação dos Mil Portos** controla o fluxo de mercadorias entre Korala e a Costa Esmeralda, enquanto a **Liga das Sete Cúpulas** domina a produção de conhecimento e magia organizada.

Nas alturas geladas dos **Altos Observatórios de Apios**, magos e astrônomos tentam medir e compreender as próprias emanações divinas, traçando mapas de luz e escuridão no oceano celeste. Em Apios, o conflito central não é fé contra descrença, mas sim tradição contra progresso, idealismo contra pragmatismo… e o limite entre estudar o divino e desafiá-lo.



# Region Details

**Dominant Races:**  
Humanos apiosianos (divididos em várias culturas urbanas e rurais), anões da Cadeia de Ferro, elfos urbanos e diplomáticos, gnomos artesãos e engenheiros, minorias de povos mercadores mistos vindos de Korala e da Costa Esmeralda.

**Climate:**  
Predominantemente temperado, com costas de clima mediterrâneo, interiores continentais de verões quentes e invernos rigorosos, além de cadeias de montanhas frias na Cadeia de Ferro e nos Altos Observatórios.



# GM Notes

Apios funciona bem como cenário de campanhas de:

- Intriga política entre cidades-estado, repúblicas mercantis e ligas acadêmicas.  
- Investigações arcanas e filosóficas sobre o céu, Rodu e as emanações divinas.  
- Conflitos trabalhistas e sociais, especialmente nas regiões industriais e mineradoras.  

Use a **Liga das Sete Cúpulas** como eixo de universidades, bibliotecas e faculdades arcanas rivais; a **Cadeia de Ferro** como palco de aventuras mais sombrias, de exploração industrial e revoltas; a **Bacia de Serapis** e a **Confederação dos Mil Portos** como hubs perfeitos para campanhas de comércio, contrabando e diplomacia entre continentes.


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
