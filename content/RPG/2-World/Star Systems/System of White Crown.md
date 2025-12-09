---
tags:
  - Category/StarSystem
obsidianUIMode: preview
MyContainer: "[[Galaxy of Nay]]"
image: Template_StarSystem_Placeholder.png
---






> [!NOTE] Parent Continent: `INPUT[suggester(optionQuery(#Category/Galaxy)):MyContainer]`

> [!column|no-i no-t]
>> [!info|no-title] Map
>> ![[Template_StarSystem_Placeholder.png]]
>
>> [!note|no-title] Town Name
>> ~~~meta-bind
>> INPUT[select(
>> option(1, ℹ️General Info),
>> option(2, 🌐Star System),
>> option(3, 📝GM Notes),
>> class(tabbed)
>> )]
>> ~~~
>>>[!tabbed-box-maxh]
>>> >[!div-m|no-title]
>>> > ![[#General Info|no-h clean]]
>>>
>>> >[!div-m|no-title]
>>> > ![[#Star System Details|no-h clean]]
>>>
>>> > [!div-m|no-title]
>>> > ![[#GM Notes|no-h clean]]
>>> 

> [!NOTE|no-title]
> ~~~meta-bind
> INPUT[select(
> option(1, 🗺️Planets),
> option(2, 🗺️Points of Interest),
> class(tabbed)
> )]
> ~~~
> >[!tabbed-box]
> > >[!div-m|no-title]
> > > ![[#Planets|no-h clean]]
> >
> > >[!div-m|no-title]
> > > ![[#Points of Interest|no-h clean]]
> >

---
# General Info

O **Sistema da Coroa Branca** é o berço de **Lhodos, o Mundo Iluminado**.  
Visto de longe, o conjunto de astros parece uma coroa de joias em torno de uma estrela branca de brilho quase ofuscante – a forma pela qual os astrônomos descrevem **Rodu**, o Sol primordial.

Aos olhos dos mortais em Lhodos, o céu é dominado por três presenças:

- **Rodu**, o Sol, cuja luz dá forma aos dias e às colheitas.  
- **Vuin**, a Lua prateada, que rege as marés, os sonhos e muitos rituais.  
- O **véu de Nyxara**, percepção mortal da noite estrelada que envolve todo o sistema e faz a transição entre luz e sombra.

É a dança entre esses três aspectos que define calendários, festivais e presságios em todas as culturas conhecidas.


# Star System Details

**Dominant Races:**  
Praticamente todas as civilizações conhecidas concentram-se em Lhodos.  
Humanos, anões, elfos, halflings, gnomos e outras raças típicas de D&D 5e governam reinos, cidades-estado e tribos ao redor do planeta, enquanto os demais corpos do sistema são tratados como domínios de espíritos, deuses menores ou monstros.

**Corpos Principais do Sistema:**

- **Lhodos, o Mundo Iluminado**  
  Planeta central da campanha, lar de Korala e de outras terras civilizadas.

- **[[LUA DE VUIN]]**  
  Lua física associada à deusa Vuin. Rituais de clarividência, sonhos proféticos e magias de ilusão costumam referenciar fases específicas dessa lua.

- **[[MUNDO DE RESA]]**  
  Um planeta ou lua vulcânica mais interior, ligado aos mitos do deus do vulcão **Resa**. Pouco se sabe sobre sua superfície além de histórias de rios de fogo e fortalezas forjadas na lava.

- **[[DOMÍNIO DE THURFELL]]**  
  Corpo coberto por florestas ou um plano paralelo a Lhodos, associado ao deus da floresta **Thurfell**. Muitas lendas druídicas dizem que certas clareiras em Lhodos "se conectam" a esse mundo.

*(Os nomes entre colchetes podem ser definidos quando você estiver pronto.)*

**Ciclos Astronômicos Relevantes:**

- **Alinhamento da Coroa**  
  Quando Rodu, Lhodos e Vuin se alinham perfeitamente, formando um eclipse raro.  
  Magias de luz e trevas tornam-se mais poderosas, cultos apocalípticos saem da toca e o Conclave da Aurora entra em alerta máximo.

- **Chuvas da Coroa Branca**  
  Períodos em que a **Corrente Branca** cruza o plano orbital do sistema, trazendo cometas e meteoros visíveis por semanas.  
  É a época ideal para introduzir metais celestes, artefatos peculiares e monstros "caídos das estrelas".

- **Toque da Sombra**  
  Eventos irregulares em que o véu de Nyxara parece "aproximar-se" de Lhodos.  
  As noites tornam-se anormalmente escuras, os sonhos mais vívidos e fenômenos sobrenaturais se intensificam. Podem marcar arcos de horror ou intriga sombria.


# GM Notes

O Sistema da Coroa Branca existe para dar **peso cósmico** às histórias que começam em Lhodos:

- Use os ciclos astronômicos como "relógios de campanha": um arco inteiro pode girar em torno da preparação para um Alinhamento da Coroa ou para a próxima chuva de meteoros.  
- Deuses menores como **Thurfell** e **Resa** podem ser apresentados como manifestações locais de forças do próprio sistema – perfeito para aventuras que começam em Korala e terminam em algum ritual astral.  
- Outros planetas e luas podem ser inicialmente apenas nomes em tabelas e mapas de astrônomos, e só se tornam locais visitáveis em níveis épicos, via magia ou portais.
# Planets

`BUTTON[button_planet]` 


```base
properties:
  file.name:
    displayName: Planet Name(s)
  note.MyCategory:
    displayName: Type of Planet
views:
  - type: cards
    name: Planets - Cards
    filters:
      and:
        - file.folder == "RPG/2-World/Planets"
        - list(MyContainer).contains(this)
    order:
      - file.name
    image: note.image
  - type: table
    name: Planets - Table
    filters:
      and:
        - file.folder == "2-World/Planets"
        - list(MyContainer).contains(this)
    order:
      - file.name
    sort:
      - property: file.name
        direction: DESC
    columnSize:
      file.name: 182

```

# Points of Interest

`BUTTON[button_pointofinterest]` 

```base
properties:
  file.name:
    displayName: Point of Interest Name(s)
  note.MyCategory:
    displayName: Type of POI
views:
  - type: cards
    name: Point of Interest - Cards
    filters:
      and:
        - file.folder == "2-World/Points of Interest"
        - list(MyContainer).contains(this)
    order:
      - file.name
    image: note.image
  - type: table
    name: Point of Interest - Table
    filters:
      and:
        - file.folder == "2-World/Points of Interest"
        - list(MyContainer).contains(this)
    order:
      - file.name
    sort:
      - property: file.name
        direction: DESC
    columnSize:
      file.name: 182

```