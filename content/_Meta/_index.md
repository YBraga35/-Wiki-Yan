---
publish: false
---

# O Grimório Vivo: Do World-Building à Gestão de Campanhas no Obsidian
Este relatório revisado expande a estratégia original para a organização de um cofre do Obsidian focado em TTRPG. Inspirado pela abordagem de gerenciamento de projetos de Nicole van der Hoeven e pelas ferramentas práticas da comunidade Obsidian TTRPG Tutorials, este guia propõe uma evolução: de um repositório de lore para um sistema de gerenciamento de campanha totalmente integrado e interativo. O objetivo é fundir a automação de dados com ferramentas visuais de planejamento, criando um "grimório vivo" que não apenas armazena seu mundo, mas o ajuda ativamente a gerenciá-lo, mantendo a compatibilidade com a plataforma de publicação Quartz.

## Seção 1: A Filosofia do Cofre Híbrido: Dados, Projetos e Ferramentas
Para construir um sistema verdadeiramente eficaz, adotaremos uma filosofia híbrida que combina três pilares:
- Notas como Dados Estruturados (A Abordagem Original): Cada nota (personagem, local, item) é um item de banco de dados com metadados consistentes (frontmatter YAML). Isso permite que o plugin Dataview crie relações e índices dinâmicos, revelando conexões em seu mundo.
- Campanha como Projeto (A Inspiração de Nicole van der Hoeven): O lore é o cenário, mas a campanha é um projeto a ser gerenciado. Utilizaremos ferramentas visuais como quadros Kanban e calendários para rastrear o progresso de quests, planejar sessões e visualizar a linha do tempo da campanha, tratando a preparação do jogo como um "calendário de conteúdo".4
- O Cofre como Caixa de Ferramentas do Mestre (A Inspiração do TTRPG Tutorials): O cofre deve ser prático durante o jogo. Criaremos "telas do mestre" (dashboards), calculadoras e integraremos ferramentas TTRPG-específicas para acesso rápido a informações cruciais, como blocos de estatísticas, mapas interativos e roladores de dados.6

Essa abordagem híbrida exige uma distinção clara entre dois tipos de templates, um conceito fundamental destacado pela comunidade TTRPG 2:Templates de Conteúdo (Note Templates): Esqueletos completos para os diferentes tipos de informação no seu mundo (Personagens, Locais, Sessões). Eles definem a estrutura de metadados e as seções principais, garantindo consistência.Templates de Funcionalidade (Functionality Templates/Snippets): Fragmentos de código ou texto reutilizáveis que adicionam uma funcionalidade específica a uma nota existente, como um bloco de estatísticas, um mapa ou uma consulta Dataview.
## Seção 2: Arquitetura de Pastas e Configuração Essencial
A estrutura de pastas permanece a mesma, pois é robusta e escalável, mas agora daremos suporte a novas ferramentas.
* Estrutura de Pastas
- _Meta/Templates/: Pasta raiz para todos os templates.
- _Meta/Templates/Content/: Para templates de notas completas (T - Personagem.md).
- _Meta/Templates/Snippets/: Para fragmentos reutilizáveis (S - Statblock 5e.md).
- _Meta/Scripts/: Para arquivos JavaScript externos usados pelo Templater.
- _Meta/Dashboards/: Uma nova pasta para abrigar suas notas de gerenciamento, como o Painel do Mestre e o Quadro de Quests.

**Configuração de Plugins Adicionais**
Além do Templater e Dataview, instale e configure os seguintes plugins:
1. Kanban:
	- Nenhuma configuração inicial complexa é necessária. Usaremos este plugin para criar quadros visuais de gerenciamento de quests.
2. Fantasy Calendar (ou Calendarium):
	- O Fantasy Calendar foi descontinuado; o Calendarium é seu sucessor funcional.7 Instale-o (pode ser necessário o plugin BRAT).
	- Após a instalação, crie um novo calendário. Você pode usar um preset Gregoriano para rastrear sessões do mundo real ou criar um calendário de fantasia para o seu mundo.
3. Buttons:
	- Essencial para criar a interface interativa no seu Painel do Mestre.

## Seção 3: Templater - O Coração da Automação
O Templater continua sendo o motor principal para garantir a consistência dos dados. As técnicas da seção original são a base, mas podemos aprimorá-las com exemplos práticos inspirados em TTRPGs.
**Scripts de Usuário (tp.user) para Funcionalidades de Jogo**
Mover lógicas complexas para a pasta _Meta/Scripts/ mantém seus templates limpos. Um exemplo perfeito, inspirado no uso de TTRPG de Nicole van der Hoeven, é uma função de rolagem de dados.

1. Crie o arquivo _Meta/Scripts/dice.js:
   
   JavaScript

_Meta/Scripts/dice.js
function roll(diceString) {
    // Lógica para interpretar a string (ex: "2d6+3") e retornar um resultado.
    const match = diceString.match(/(\d+)d(\d+)([\+\-]\d+)?/);
    if (!match) return "Formato de dado inválido";

    const numDice = parseInt(match[1]);
    const numSides = parseInt(match[2]);
    const modifier = match?[3] parseInt(match[3]) : 0;

    let total = 0;
    for (let i = 0; i < numDice; i++) {
        total += Math.floor(Math.random() * numSides) + 1;
    }
    return total + modifier;
}

module.exports = roll;
Chame a função em qualquer template:Um teste de Destreza é necessário. Resultado (1d20+2): **<% tp.user.dice("1d20+2") %>**Interatividade AprimoradaO uso de tp.system.prompt() e tp.system.suggester() é crucial para garantir que os metadados corretos sejam inseridos na criação da nota, um fluxo de trabalho que economiza tempo e previne erros.3JavaScript<%*
// Exemplo em um template de Personagem
const nome = await tp.system.prompt("Nome do Personagem");
await tp.file.rename(nome);
const status = await tp.system.suggester(,);
-%>
---
title: "<% nome %>"
status: <% status %>
---
Seção 4: Dataview - A Inteligência do seu MundoCom dados consistentes garantidos pelo Templater, o Dataview transforma seu cofre em um banco de dados vivo.15O Conceito de "Infobox"Inspirado em wikis e no plugin Infobox 6, podemos criar um resumo de metadados no topo de cada nota usando uma consulta Dataview inline. Isso fornece uma visão geral rápida e consistente.Exemplo para uma nota de Personagem:Snippet de códigoTABLE WITHOUT ID
    status AS "Status",
    faccao AS "Facção",
    localizacao AS "Localização"
FROM []
Esta consulta simples, quando colocada em uma nota de personagem, exibirá seus próprios metadados em uma tabela limpa.Consultas de Gerenciamento de CampanhaAlém de listar lore, o Dataview pode rastrear o progresso da campanha.Listar PCs presentes em uma sessão:Snippet de códigoLIST pc_presentes
FROM []
Tabela de Sessões de uma Campanha: Em uma nota de Campanha, esta consulta agrega todas as sessões relacionadas.Snippet de códigoTABLE data_sessao AS "Data", resumo
FROM #sessao
WHERE campanha = []
SORT data_sessao DESC
Seção 5: Gestão de Campanha Visual (A Abordagem de Nicole van der Hoeven)Esta nova seção foca em gerenciar o fluxo da campanha usando ferramentas visuais, uma técnica poderosa para organização de projetos.4Quadro Kanban para QuestsUse o plugin Kanban para criar um "Quadro de Quests" (_Meta/Dashboards/Quadro de Quests.md). Este é um arquivo Markdown simples que o plugin renderiza como um quadro interativo.kanban-plugin: basic%%A Fazer[[Nome da Quest 1]][[Nome da Quest 2]]Em Andamento[[Nome da Quest 3]]Concluídas[[Nome da Quest 4]]%%Você pode arrastar e soltar as notas das quests entre as colunas, fornecendo uma visão clara e imediata do progresso da sua campanha.Calendário para Sessões e EventosO plugin Calendarium pode ser usado de duas maneiras 9:Calendário do Mundo Real: Crie um calendário Gregoriano para marcar as datas das suas sessões de jogo. Adicione um campo data_sessao no frontmatter de suas notas de sessão, e o plugin as exibirá no calendário.Calendário do Jogo: Crie um calendário de fantasia para o seu mundo. Adicione metadados de data (usando o formato fc-date do plugin) às suas notas para marcar quando eventos, como festivais ou batalhas, ocorrem na linha do tempo do jogo.9Seção 6: O Painel do Mestre - Seu Centro de ComandoInspirado no conceito de "DM Screen" 6, o Dashboard do Mestre (_Meta/Dashboards/Dashboard Mestre.md) é o seu centro de comando. Usando o plugin Buttons, criamos uma interface de usuário para suas ações mais comuns.17Painel do MestreAções de CriaçãoFerramentas de Jogobutton[Novo Personagem] button[Nova Localização]button button[Calculadora de Viagem]button button[Nova Quest]button##]Sessões RecentesdataviewTABLE data_sessao AS "Data", resumoFROM #sessaoSORT data_sessao DESCLIMIT 5
## Publicação
`button[Compilar para Publicação]`
Botões de Criação: Use o plugin Buttons para acionar templates do Templater, como "Novo Personagem" ou "Nova Sessão".Botões de Ferramenta: Crie botões que inserem snippets, como um resultado de rolagem de dados (<% tp.user.dice("1d20") %>).Painéis Dinâmicos: Incorpore consultas Dataview para obter informações em tempo real, como as últimas sessões ou quests ativas.Seção 7: O Desafio da Publicação com Quartz: Tornando o Dinâmico em EstáticoEsta seção permanece criticamente importante. O Quartz é um gerador de site estático e não pode executar plugins do Obsidian como o Dataview.20 A solução de "baking" (pré-renderização) usando a função dv.queryMarkdown() do Dataview dentro de um script Templater ainda é a abordagem mais robusta.20O fluxo de trabalho recomendado é:Desenvolva: Trabalhe em seu cofre com as consultas Dataview dinâmicas.Compile: Antes de publicar, execute um script mestre do Templater que percorre suas notas, executa cada consulta Dataview e substitui o bloco de código pelo resultado em Markdown estático.Publique: Faça o commit e push das notas agora estáticas para o GitHub. O Quartz/Cloudflare irá construir o site corretamente.Reverta (Opcional): Use o Git para reverter as alterações locais, restaurando seus blocos de código Dataview dinâmicos para continuar trabalhando.Este processo garante que a interatividade do seu cofre local seja traduzida em conteúdo visível e estático para o seu público.Seção 8: Biblioteca de Templates RevisadaOs templates são atualizados para refletir a nova filosofia híbrida.T - Personagem.mdYAML---
cuid: <% tp.date.now("YYYYMMDDHHmmss") %>
type: "Personagem"
title: "<%* const name = await tp.system.prompt('Nome do Personagem'); await tp.file.rename(name); tR += name; %>"
aliases: ["👤 <% tp.file.title %>"]
status: <% await tp.system.suggester(,) %>
faccao: "[[<% await tp.system.prompt('Facção') %>]]"
localizacao: "[[<% await tp.system.prompt('Localização Atual') %>]]"
tags:
  - personagem
---

### Infobox
```dataview
TABLE WITHOUT ID
    status AS "Status",
    faccao AS "Facção",
    localizacao AS "Localização"
FROM []
<% tp.file.title %>Descrição<% tp.file.cursor() %>MençõesSnippet de códigoLIST
FROM "" AND -!"_Meta"
WHERE contains(file.outlinks, this.file.link)
SORT file.mtime DESC

#### `T - Sessão.md` (Novo Template)
```yaml
---
cuid: <% tp.date.now("YYYYMMDDHHmmss") %>
type: "Sessão"
title: "Sessão <% tp.date.now('YYYY-MM-DD') %>"
data_sessao: <% tp.date.now("YYYY-MM-DD") %>
pc_presentes:
  - "[[Nome do PC 1]]"
  - "[[Nome do PC 2]]"
campanha: "[[Nome da Campanha]]"
tags:
  - sessao
---

# Resumo da Sessão - <% tp.date.now("DD/MM/YYYY") %>

## Acontecimentos Principais
<% tp.file.cursor() %>

## NPCs Encontrados
-

## Quests Relevantes
-

## Notas para o Mestre
-
Conclusão e Próximos PassosA integração das abordagens de Nicole van der Hoeven e Obsidian TTRPG Tutorials transforma o plano original em um ecossistema completo. Você não terá apenas um wiki para seu mundo, mas um centro de comando para planejar, gerenciar e executar suas campanhas de forma eficiente e visual.Recomendações Finais:Comece Simples: Implemente a estrutura de pastas e os templates de conteúdo básicos primeiro.Adote o Gerenciamento Visual: Crie seu quadro de quests no Kanban e comece a rastrear suas sessões no Calendarium. Essas ferramentas oferecem benefícios imediatos de organização.Construa seu Dashboard Gradualmente: Comece com botões para as ações mais frequentes e adicione painéis Dataview à medida que sentir necessidade.Domine o Fluxo de Publicação: Pratique o ciclo de "compilar, publicar, reverter" em um ambiente de teste para se familiarizar com o processo antes de aplicá-lo ao seu site principal.Seguindo este guia revisado, seu cofre do Obsidian se tornará sua ferramenta mais poderosa, um verdadeiro "grimório vivo" que cresce e evolui junto com suas histórias.