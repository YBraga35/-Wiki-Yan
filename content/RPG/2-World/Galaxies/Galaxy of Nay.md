---
tags:
  - Category/Galaxy
obsidianUIMode: preview
MyContainer:
image: "Template_Galaxy_Placeholder.png"
---
> [!NOTE] Parent:

> [!column|no-i no-t]
>> [!info|no-title] Map
>> ![[Template_Galaxy_Placeholder.png]]
>
>> [!note|no-title] Town Name
>> ~~~meta-bind
>> INPUT[select(
>> option(1, ℹ️General Info),
>> option(2, 🌐Galaxy Details),
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
> option(1, 🗺️Star Systems),
> class(tabbed)
> )]
> ~~~
> >[!tabbed-box]
> > >[!div-m|no-title]
> > > ![[#Star Systems|no-h clean]]
> >

---
# General Info

A galáxia conhecida pelos sábios de Korala como **[[Galaxy of Nay]]** é descrita como um vasto **oceano de luz**.  
Para os mortais, o firmamento é o palco visível da eterna disputa entre o que é conhecido e o que permanece velado, entre o bem que se revela em clarões e o mal que se esconde nas sombras entre as estrelas.

Nos mitos antigos, quando tudo era silêncio e escuridão, apenas o **Inominável** existia. Da sua própria solidão, ele arrancou a primeira centelha de luz: **Rodu**, o Primeiro Sol.  
Rodu avançou pelo vazio como uma lança de fogo, e a luz que escorria de sua passagem tornou-se um mar de estrelas. A partir dessa mesma luz roubada, o Inominável moldou os primeiros planetas e o próprio **plano material**.

Os deuses adorados em Lhodos – Rodu, Vuin e Nyxara – são, em escala cósmica, apenas **emanções locais** de forças muito maiores. Ainda assim, em cada sistema estelar, os mortais enxergam neles os principais astros do céu e organizam sua fé, calendários e histórias de acordo com esse trio:  
o Sol que revela, a Lua que reflete e a Noite Estelar que esconde.

# Galaxy Details

**Tema Central:**  
Um oceano de luz em lenta disputa contra as sombras ancestrais. A própria estrutura da galáxia expressa esse conflito: regiões de brilho intenso cercadas por fendas de escuridão absoluta.

**Fenômenos Cósmicos Marcantes:**

- **Cicatriz de Nyxara**  
  Uma longa faixa de céu completamente desprovida de estrelas, visível mesmo a olho nu em noites claras.  
  Diz-se que ali a Noite Estelar devorou luz demais; magias de trevas, ilusões e necromancia tendem a ser mais instáveis quando a Cicatriz está acima do horizonte.

- **Corrente Branca**  
  Um "rio" de estrelas jovens e cometas pálidos que cruza a galáxia. Periodicamente, a Corrente se aproxima do sistema da Coroa Branca, gerando chuvas de meteoros visíveis em Lhodos.  
  Muitos metais celestes raros e artefatos lendários têm origem nesses detritos luminosos.

- **Halo do Primeiro Fogo**  
  Um conjunto de nebulosas douradas que circunda a região onde se encontra o Sistema da Coroa Branca.  
  Sacerdotes afirmam que são brasas que restaram da primeira explosão de Rodu ao atravessar o vazio primordial.

- **Marés de Aurora**  
  Ondas de mana luminosa que percorrem a galáxia em ciclos de milhares de anos.  
  Quando uma dessas marés atinge um sistema, o céu se cobre de auroras e milagres improváveis se tornam mais comuns.

**Macro-Facção Cósmica: Conclave da Aurora**

Uma ordem secreta conhecida apenas pelos líderes mais sábios de Lhodos.  
O Conclave é formado por representantes extremamente seletos de diferentes regiões do mundo: arcanistas da Academia de Korala, altos-sacerdotes de Rutilho, generais de Bastião e místicos de terras distantes como Sibrius.

O objetivo declarado (para os poucos que sabem de sua existência) é **preservar o equilíbrio entre a luz de Rodu e as sombras de Nyxara**.  
Na prática, o Conclave:
- vigia profecias ligadas a eclipses, chuvas de meteoros e rasgos no firmamento;  
- decide quando revelar ou ocultar conhecimento astronômico;  
- patrocina expedições discretas em busca de artefatos vindos da Corrente Branca.

# GM Notes

Use esta galáxia como pano de fundo "macro" que raramente exige mapa tático, mas sempre gera **presságios**:

- Qualquer profecia pode ser ancorada em um fenômeno da lista acima.  
- O Conclave da Aurora é um ótimo gancho para missões de alto nível, oferecendo tarefas que parecem "locais" mas, na verdade, têm impacto cósmico.  
- Eventos raros (Marés de Aurora, atividade na Cicatriz de Nyxara) podem marcar mudanças de fase da campanha: novos feitiços, monstros diferentes, ou a abertura de caminhos para outros sistemas.


# Star Systems

`BUTTON[button_starsystem]` **Continents**  Large continuous landmasses that contain regions.

```base
properties:
  file.name:
    displayName: Star Systems Name
  note.MyCategory:
    displayName: Type of Star System
views:
  - type: cards
    name: Star Systems - Cards
    filters:
      and:
        - file.folder == "2-World/Star Systems"
        - list(MyContainer).contains(this)
    order:
      - file.name
    image: note.image
  - type: table
    name: Star Systems - Table
    filters:
      and:
        - file.folder == "2-World/Star Systems"
        - list(MyContainer).contains(this)
    order:
      - file.name
    sort:
      - property: file.name
        direction: DESC
    columnSize:
      file.name: 182

```
