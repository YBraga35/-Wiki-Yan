---
title: avrae-cheat-sheet
draft: true
date: 2024-10-30
---
## Adicionando um Personagem
### Iniciando
O Avrae é um bot poderoso, mas pode ser um pouco complicado de configurar no início. Aqui estão três passos rápidos para vincular sua ficha de personagem ao Avrae e estar pronto para jogar!

### Passo 1: Convide o Avrae para o seu servidor
Primeiro, adicione o Avrae ao seu servidor. Certifique-se de que você tenha a permissão **Gerenciar Servidor** e acesse [invite.avrae.io](https://invite.avrae.io/).

**Opcional: Definir um Prefixo**
Se você tiver outros bots que usam o mesmo prefixo, você pode mudar o prefixo do Avrae com o comando:
```
!prefix <prefixo>
```
Exemplo: `!prefix $`

**Usar o Comando de Ajuda**
Com o comando `!help`, você pode ver informações sobre outros comandos do bot:
```
!help <comando>
```
Por exemplo, `!help attack` trará informações sobre o comando de ataque. Experimente com:
```
!help
```

### Passo 2: Adicione um Personagem
Depois de definir seus atributos, crie sua ficha no [D&D Beyond](https://www.dndbeyond.com/), [Dicecloud v1](https://v1.dicecloud.com/), [Dicecloud v2](https://dicecloud.com/), ou [Google Sheets](https://gsheet2.avrae.io/).

Quando sua ficha estiver pronta e visível publicamente, copie o link de compartilhamento e siga as instruções abaixo, dependendo da plataforma que você usou.

**D&D Beyond**
Para importar um personagem do D&D Beyond, use:
```
!import https://ddb.ac/characters/...
```
Se você vincular suas contas do D&D Beyond e Discord, seus rolagens feitas no D&D Beyond aparecerão no Discord!

**Dicecloud v1**
Para importar do Dicecloud v1, use:
```
!import https://v1.dicecloud.com/character/...
```
Compartilhe a ficha com permissão de edição com "avrae" para que o bot atualize seus pontos de vida e consumíveis em tempo real.

**Dicecloud v2**
Para importar do Dicecloud v2, use:
```
!import https://dicecloud.com/character/...
```

**Google Sheets**
Para importar uma ficha do Google Sheets, use:
```
!import https://docs.google.com/spreadsheets/d/...
```
Compartilhe a planilha com o e-mail `avrae-320@avrae-bot.iam.gserviceaccount.com`.

### Passo 3: Pronto para rolar os dados
Agora você está pronto para rolar! Use os comandos a seguir para rolagens:
- `!check <habilidade>` para testes de perícia, como: `!check arcana`
- `!save <atributo>` para testes de resistência, como: `!save destreza`
- `!attack <arma>` para atacar, como: `!attack longsword`

Esse cheat sheet resume os passos principais para começar a usar o Avrae de forma rápida e eficiente!

## Rolagem Inline
==============

Sempre que você enviar uma mensagem com dados entre colchetes duplos (ex.: ``[[1d20]]``),
Avrae irá responder com o resultado da rolagem. Você também pode enviar múltiplas rolagens, por exemplo:

`Eu ataco o goblin com minha espada curta [[1d20 + 6]] causando um total de [[1d6 + 3]] de dano perfurante.`


### Habilitando Rolagem Inline
Por padrão, a rolagem inline está desativada quando o Avrae entra no servidor. Para habilitar, um administrador do servidor
(ou seja, qualquer membro com a permissão de Gerenciar Servidor) pode ativar usando o comando ``!servsettings``.

Selecione ``Configurações de Rolagem Inline`` no menu e escolha entre rolagem baseada em reação ou sempre ativa.

Rolagem Sempre Ativa
^^^^^^^^^^^^^^^^^^^^
Quando o Avrae detecta uma rolagem inline em uma mensagem, ele responde imediatamente com o resultado de cada rolagem presente na mensagem.

Rolagem Baseada em Reação
^^^^^^^^^^^^^^^^^^^^^^^^^
Quando o Avrae detecta uma rolagem inline, ele reage à mensagem com o emoji ðŸŽ². O autor da mensagem pode então reagir
para que o Avrae responda com os resultados da rolagem. Reações de outros usuários e quaisquer reações do autor além da primeira serão ignoradas.

### Argumentos

A Rolagem Inline suporta os argumentos ``adv`` (vantagem) e ``dis`` (desvantagem) da mesma forma que o comando ``!r``.

### Comentários

A Rolagem Inline suporta comentários, assim como o comando ``!r``.

Se um comentário for fornecido, ele será exibido *em vez* do contexto da mensagem em torno da rolagem.

### Rolagens de Personagem

Se uma rolagem inline começar com ``c:`` ou ``s:``, ela usará os dados de teste ou salvamento do personagem ativo para a
habilidade indicada, respectivamente. Esse tipo de rolagem pode ser combinado com outros bônus de dados ou argumentos de vantagem.

### Exemplos

| Mensagem            | Descrição                                                                        |
| ------------------- | -------------------------------------------------------------------------------- |
| `[[1d20]]`          | Rola 1d20.                                                                       |
| `[[1d20+5 adv]]`    | Rola um d20 com vantagem e um bônus de +5.                                       |
| `[[4d6kh3 STR]]`    | Rola 6 conjuntos de 4d6, mantendo os 3 dados mais altos para força (STR).        |
| `[[4d6kh3 DEX]]`    | Rola 6 conjuntos de 4d6, mantendo os 3 dados mais altos para destreza (DEX).     |
| `[[4d6kh3 CON]]`    | Rola 6 conjuntos de 4d6, mantendo os 3 dados mais altos para constituição (CON). |
| `[[4d6kh3 INT]]`    | Rola 6 conjuntos de 4d6, mantendo os 3 dados mais altos para inteligência (INT). |
| `[[4d6kh3 WIS]]`    | Rola 6 conjuntos de 4d6, mantendo os 3 dados mais altos para sabedoria (WIS).    |
| `[[4d6kh3 CHA]]`    | Rola 6 conjuntos de 4d6, mantendo os 3 dados mais altos para carisma (CHA).      |
| `[[c:arc]]`         | Rola um teste de arcana para o personagem ativo.                                 |
| `[[s:dex]]`         | Rola um teste de resistência de destreza para o personagem.                      |
| `[[c:pers adv]]`    | Rola um teste de persuasão com vantagem.                                         |
| `[[s:con-2]]`       | Rola um teste de resistência de constituição com penalidade de -2.               |
| `[[s:str+1d4 adv]]` | Rola um teste de resistência de força com um bônus de +1d4 e vantagem.           |

