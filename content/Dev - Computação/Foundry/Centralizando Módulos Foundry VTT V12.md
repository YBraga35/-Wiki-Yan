# Guia para Curadoria Avançada de Conteúdo: Migrando Módulos do Foundry VTT para Cloudflare R2 para a v12

## Seção 1: Estrutura Estratégica para Consolidação e Migração de Módulos

### 1.1. Compreendendo a Arquitetura de Dados Moderna do Foundry VTT

A transição do Foundry VTT da versão 11 para a 12 representa mais do que uma atualização incremental; é uma mudança arquitetônica fundamental que exige uma abordagem metódica para a migração de conteúdo. A compreensão dessas mudanças é o alicerce para o sucesso de qualquer projeto de consolidação de módulos.

#### 1.1.1. O Salto da v11 para a v12

A versão 12 do Foundry VTT introduziu mudanças abrangentes no backend, notavelmente a formalização de um `DataModel` mais estruturado para todos os documentos.1 Esta alteração significa que a estrutura de dados interna de Atores, Itens, Cenas e outros documentos foi padronizada e validada por um esquema rigoroso. Consequentemente, simplesmente copiar arquivos de um módulo v11 para um ambiente v12 resultará em incompatibilidades e falhas, pois os dados antigos não se alinham com o novo esquema esperado. A atualização também trouxe a

`Application V2`, uma nova abordagem para a renderização da interface do usuário, e outras melhorias de backend que exigem que os módulos sejam explicitamente construídos e testados para garantir a compatibilidade.3

#### 1.1.2. O Manifesto `module.json` como o Blueprint

O arquivo `module.json` serve como o projeto central para qualquer pacote, seja um sistema ou um módulo. Para a v12, sua importância foi elevada. O manifesto agora contém um objeto `compatibility` que permite aos desenvolvedores especificar com precisão as versões do Foundry VTT com as quais o módulo funciona. Os campos `minimum` e `maximum` são estritamente aplicados pelo software, impedindo a instalação ou ativação de módulos incompatíveis.6 Além disso, o campo

`dependencies` foi substituído por um objeto `relationships` mais descritivo, que detalha as dependências do módulo em sistemas ou outros módulos.2 A configuração correta deste arquivo é o primeiro passo para que o Foundry VTT reconheça e carregue o módulo consolidado.

#### 1.1.3. De NeDB para LevelDB: A Revolução dos Compêndios

Uma das mudanças mais significativas que começaram na v11 e se solidificaram é a tecnologia de banco de dados subjacente para os compêndios. O formato legado, NeDB, armazenava todos os documentos de um compêndio em um único arquivo de texto simples com a extensão `.db`, como observado na estrutura de arquivos do usuário.8 O novo formato, LevelDB, é um banco de dados de chave-valor de alto desempenho que armazena os dados do compêndio em uma pasta contendo vários arquivos, alguns dos quais são codificados em binário.9

Esta mudança torna a edição manual dos arquivos de compêndio impossível e perigosa. A única metodologia suportada e confiável para interagir com esses bancos de dados fora do ambiente do Foundry VTT é através de ferramentas especializadas. O FoundryVTT CLI (Command-Line Interface) foi desenvolvido especificamente para essa finalidade, permitindo que os desenvolvedores "descompactem" (unpack) os bancos de dados LevelDB ou NeDB em um formato de texto legível por humanos (como JSON) e, em seguida, "recompactem" (pack) esses arquivos de volta no formato de banco de dados LevelDB.9 Tentar migrar compêndios simplesmente copiando as pastas LevelDB ou editando arquivos

`.db` manualmente levará a dados corrompidos e erros de carregamento.11

### 1.2. A Lógica para Hospedagem Externa de Ativos com Cloudflare R2

A decisão de hospedar todos os ativos de mídia em um serviço de armazenamento em nuvem como o Cloudflare R2 não é apenas uma preferência técnica, mas uma melhor prática estratégica para gerenciar grandes coleções de conteúdo de VTT.

#### 1.2.1. Desempenho e Escalabilidade

Servir ativos de mídia (mapas, tokens, arte, música) de uma Rede de Distribuição de Conteúdo (CDN) global como a da Cloudflare melhora drasticamente o desempenho. Quando um jogador se conecta a uma sessão, seu navegador baixa esses ativos diretamente dos servidores da Cloudflare, que estão geograficamente mais próximos deles, em vez de baixá-los do servidor do Mestre do Jogo. Isso reduz significativamente os tempos de carregamento do mundo, diminui a latência e alivia a carga de largura de banda da conexão de internet do anfitrião.14 Dada a grande quantidade de dados de mapas e tokens de criadores como TomCartos e CzeAndPeku, essa abordagem transforma a experiência do jogador.8

#### 1.2.2. Portabilidade e Integridade dos Dados

Desacoplar os ativos de mídia dos dados do jogo (os documentos do compêndio) torna a instalação do Foundry VTT muito mais enxuta e portátil. A pasta de dados do usuário torna-se significativamente menor, simplificando backups, migrações entre diferentes provedores de hospedagem ou a movimentação de um servidor local para a nuvem.16 Se os ativos estiverem vinculados a caminhos locais, qualquer mudança na estrutura de pastas ou no ambiente de hospedagem quebraria todas as referências de imagem e som. Com URLs externas, os dados do jogo permanecem funcionais, independentemente de onde o servidor Foundry VTT esteja sendo executado.

#### 1.2.3. Custo-Benefício do R2

O Cloudflare R2 oferece uma vantagem competitiva crucial para casos de uso de VTT: a ausência de taxas de egresso (egress fees). Os serviços de armazenamento em nuvem tradicionais, como o Amazon S3, cobram pela quantidade de dados transferidos para fora de seus servidores. Em um cenário de VTT, onde vários jogadores estão constantemente baixando mapas e tokens, essas taxas podem se acumular rapidamente. O R2 elimina essa preocupação, tornando-se uma solução extremamente econômica para a carga de trabalho de alta leitura típica de uma sessão de RPG.15

### 1.3. O Plano Mestre de Migração

Este projeto é dividido em cinco fases distintas, formando um fluxo de trabalho lógico desde a configuração da infraestrutura até a implantação final. Esta abordagem estruturada garante que cada etapa seja concluída corretamente antes de prosseguir para a próxima, minimizando a complexidade e o potencial de erros.

1. **Fase I: Configuração da Infraestrutura:** Estabelecer a base na nuvem. Isso envolve a criação do bucket Cloudflare R2, a configuração dos registros DNS necessários e a implantação do worker de compatibilidade S3, que atua como uma camada de tradução essencial.
    
2. **Fase II: Extração de Dados:** Utilizar o FoundryVTT CLI para desconstruir os compêndios v11 existentes. O comando `unpack` converterá os arquivos `.db` em arquivos-fonte JSON editáveis, um para cada documento.
    
3. **Fase III: Migração de Ativos e Redirecionamento de Caminhos:** Realizar o upload em massa de todos os ativos de mídia (imagens, tokens) para o bucket R2. Em seguida, executar um script para reescrever programaticamente todos os caminhos de ativos locais nos arquivos JSON extraídos para apontar para as novas URLs externas.
    
4. **Fase IV: Recompilação do Módulo:** Criar um novo manifesto `module.json` compatível com a v12. Usar o comando `pack` do CLI para compilar os arquivos JSON modificados de volta para o formato de banco de dados LevelDB, criando os novos compêndios.
    
5. **Fase V: Implantação e Teste:** Instalar o novo módulo `yan-curated-data` em um ambiente Foundry VTT v12 limpo e realizar testes rigorosos para garantir que todos os dados e ativos sejam carregados corretamente.
    

Este processo depende fundamentalmente de um fluxo de trabalho de "Descompactar-Modificar-Recompactar". Os dados do compêndio são tratados como código-fonte: extraídos para um formato legível, modificados por ferramentas automatizadas e, em seguida, compilados de volta para o formato binário final. Isso requer uma configuração de ambiente duplo: o ambiente v11 existente é necessário para a extração inicial dos dados, enquanto um ambiente v12 completamente novo e limpo é essencial para a implantação e teste final, evitando qualquer contaminação ou conflito de configurações legadas.4

## Seção 2: Fase I - Construindo a Infraestrutura na Nuvem: Configurando o Cloudflare R2

A criação de uma base de infraestrutura robusta na Cloudflare é o primeiro passo técnico e um dos mais críticos. A configuração correta aqui garante que o Foundry VTT possa se comunicar de forma transparente com o armazenamento R2 como se fosse um bucket S3 nativo.

### 2.1. Configuração do Bucket R2 e Acesso Público

Este processo estabelece o repositório de armazenamento para todos os ativos de mídia.15

1. **Criação do Bucket:** No painel da sua conta Cloudflare, navegue até a seção R2. Crie um novo bucket. É altamente recomendável nomeá-lo `foundry` para alinhar com as convenções dos guias da comunidade e simplificar as configurações subsequentes.
    
2. **Domínios Personalizados e DNS:** O Foundry VTT e o worker de compatibilidade exigem dois subdomínios para funcionar corretamente. Navegue até as configurações de DNS do seu domínio no painel da Cloudflare e crie dois novos registros `CNAME`:
    
    - **Tipo:** CNAME, **Nome:** `s3`, **Destino:** `@` (ou seu domínio raiz, ex: `seudominio.com`)
        
    - Tipo: CNAME, Nome: foundry.s3, Destino: @ (ou seu domínio raiz, ex: seudominio.com)
        
        Após a criação dos registros DNS, retorne às configurações do seu bucket R2. Na seção "Acesso Público" (Public Access), conecte um domínio personalizado e adicione o domínio específico do bucket: foundry.s3.seudominio.com.
        
3. **Política de CORS:** O Cross-Origin Resource Sharing (CORS) é uma medida de segurança do navegador. Uma política deve ser configurada para permitir que o Foundry VTT, rodando em seu domínio principal, solicite e carregue ativos do seu subdomínio R2. Nas configurações do bucket R2, localize a seção "Política de CORS" (CORS Policy) e insira a seguinte configuração JSON 15:
    

JSON

```
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods":,
    "AllowedHeaders": ["*"],
    "ExposeHeaders":,
    "MaxAgeSeconds": 3000
  }
]
```

### 2.2. O Worker de Compatibilidade S3: O Middleware Crítico

O Foundry VTT possui uma integração nativa com o S3 da AWS, mas suas chamadas de API não são idênticas à API de compatibilidade do R2. O Cloudflare Worker atua como uma camada de tradução inteligente, interceptando as solicitações do Foundry, reescrevendo-as para o formato que o R2 entende e assinando-as novamente com as credenciais corretas. Sem este worker, a integração falhará.15

1. **Implantação do Worker:** No painel da Cloudflare, navegue para "Workers & Pages" e crie uma nova aplicação, selecionando "Create Worker". Dê um nome descritivo.
    
2. **Configuração de Rotas:** Navegue para a aba "Triggers" do seu novo worker. Na seção "Routes", adicione as seguintes rotas, substituindo `seudominio.com` pelo seu domínio real:
    
    - `s3.seudominio.com/*`
        
    - `foundry.s3.seudominio.com/*`
        
3. **Código do Worker:** Clique em "Quick edit" e substitua o código padrão pelo script completo fornecido no **Apêndice A.1**. Este script é a implementação padrão da comunidade para compatibilidade R2-Foundry. É crucial que você edite as constantes no topo do script com suas informações específicas: `my_s3_domain`, `my_bucket_name`, `my_account_id`, `my_access_key` e `my_secret_key`.
    

### 2.3. Configuração S3 do FoundryVTT

O passo final é informar ao seu servidor Foundry VTT como se conectar ao novo endpoint R2.

1. **Geração de Token de API:** De volta à página principal do R2 no painel da Cloudflare, clique em "Manage R2 API Tokens". Crie um novo token com permissões de "Admin Read & Write". Copie e armazene com segurança o "Access Key ID" e o "Secret Access Key" fornecidos.
    
2. **Criação do Arquivo `s3.json`:** No seu computador, dentro da pasta de dados do usuário do Foundry VTT, navegue até o diretório `Config`. Crie um novo arquivo chamado `s3.json`. Este arquivo conterá as credenciais e o endpoint para a conexão. Popule o arquivo com o seguinte conteúdo, substituindo os placeholders pelas suas credenciais e domínio 15:
    

JSON

```
{
  "region": "auto",
  "endpoint": "https://s3.seudominio.com",
  "credentials": {
    "accessKeyId": "SEU_ACCESS_KEY_ID_AQUI",
    "secretAccessKey": "SEU_SECRET_ACCESS_KEY_AQUI"
  },
  "bucket": "foundry"
}
```

Após salvar este arquivo e reiniciar o Foundry VTT, o novo bucket R2 deve aparecer como uma fonte de armazenamento disponível no Navegador de Arquivos (File Browser).

|Configuração|Valor de Exemplo|Propósito / Local de Uso|
|---|---|---|
|Nome do Bucket|`foundry`|Identificador único para o seu armazenamento R2.|
|ID da Conta|`0123456789abcdef0123456789abcdef`|Usado no script do Worker para construir o endpoint da API R2.|
|Registro CNAME 1|`s3.seudominio.com`|Rota para o Worker que lida com chamadas de API de listagem de buckets.|
|Registro CNAME 2|`foundry.s3.seudominio.com`|Rota para o Worker que lida com chamadas de API de objetos e acesso público.|
|Access Key ID|`a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4`|Credencial para autenticação. Usado no script do Worker e no `s3.json`.|
|Secret Access Key|`a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2`|Credencial para autenticação. Usado no script do Worker e no `s3.json`.|
|Endpoint URL `s3.json`|`https://s3.seudominio.com`|O endereço que o Foundry VTT usará para todas as comunicações S3.|

## Seção 3: Fase II - Desconstruindo a Fonte: Descompactando Compêndios v11

Com a infraestrutura de nuvem pronta, a próxima fase foca na extração dos dados do módulo v11 existente para um formato que possa ser manipulado e modificado.

### 3.1. Preparando um Espaço de Trabalho de Desenvolvimento Limpo

É fundamental realizar todas as operações de modificação fora da pasta de dados ativa do Foundry VTT para evitar a corrupção acidental do seu mundo de jogo funcional.

1. Crie uma nova pasta de projeto em um local conveniente em seu computador (por exemplo, `C:\foundry-migration-project\`).
    
2. Navegue até a sua pasta de dados do Foundry v11 (`C:\Users\Yanbd\foundry-data\v11\Data\modules\`).
    
3. Copie a pasta inteira `yan-modulo` para dentro da sua nova pasta de projeto. Isso cria uma cópia de segurança e um ambiente de trabalho isolado. Todas as operações subsequentes serão realizadas nesta cópia.
    

### 3.2. Dominando a Interface de Linha de Comando (CLI) do FoundryVTT

A CLI do FoundryVTT é a ferramenta oficial e indispensável para empacotar e desempacotar compêndios. O seu uso é obrigatório para este projeto.9

1. **Instalação:** Se ainda não o tiver, instale o Node.js (versão 16.17.0 ou superior). Em seguida, instale a CLI globalmente abrindo um terminal (Command Prompt ou PowerShell) e executando o comando: `npm install -g @foundryvtt/foundryvtt-cli`.
    
2. **Configuração:** A CLI precisa saber onde sua instalação do Foundry VTT v11 está localizada. No terminal, execute `fvtt configure`. O programa irá guiá-lo para definir o caminho para a aplicação Foundry VTT e, mais importante, o caminho para sua pasta de dados do usuário da v11 (`C:\Users\Yanbd\foundry-data\v11\Data`).
    
3. **Trabalhando em um Pacote:** Para simplificar os comandos, navegue com o terminal para a sua pasta de projeto (`cd C:\foundry-migration-project\yan-modulo`) e defina-a como o pacote de trabalho atual executando: `fvtt package workon "yan-modulo" --type "Module"`. A CLI agora saberá que todos os comandos de pacote se referem a este módulo.10
    

### 3.3. Executando a Operação de Descompactação

Este é o processo de conversão dos bancos de dados do compêndio em arquivos de texto editáveis.

1. Dentro da sua pasta de projeto, crie um novo diretório para armazenar os arquivos JSON extraídos, por exemplo, `packs-json`.
    
2. Liste os arquivos `.db` dentro da pasta `yan-modulo\packs`. Você precisará executar o comando `unpack` para cada um deles.
    
3. Para cada compêndio, execute o seguinte comando no terminal (a partir da raiz da pasta `yan-modulo`), substituindo `nome-do-compendio` pelo nome do arquivo sem a extensão `.db`:
    
    Bash
    
    ```
    fvtt package unpack "nome-do-compendio" --outputDirectory "../packs-json/nome-do-compendio"
    ```
    
    Por exemplo, para o compêndio `adventures.db`, o comando seria:
    
    Bash
    
    ```
    fvtt package unpack "adventures" --outputDirectory "../packs-json/adventures"
    ```
    
4. Repita este processo para todos os compêndios (`aventuras-dmdave-old`, `criaturas-yan`, etc.). Ao final, a pasta `packs-json` conterá uma subpasta para cada compêndio, e dentro de cada uma haverá centenas ou milhares de arquivos `.json`, cada um representando um único documento (Ator, Cena, etc.).10
    

## Seção 4: Fase III - A Grande Migração: Relocando Ativos e Reescrevendo Caminhos

Esta fase é o coração da migração, onde os ativos de mídia são movidos para a nuvem e todas as referências a eles nos dados do jogo são atualizadas para apontar para suas novas localizações.

### 4.1. Upload de Ativos em Massa para o R2

A transferência física dos arquivos de mídia para o bucket R2 deve ser feita de forma eficiente e, crucialmente, preservando a estrutura de diretórios original.

1. **Ferramenta Recomendada:** A ferramenta `rclone` é o padrão da indústria para interações de linha de comando com armazenamento em nuvem. Ela é altamente eficiente para sincronizar grandes volumes de arquivos. Instale e configure o `rclone` para se conectar ao seu bucket Cloudflare R2, seguindo a documentação oficial do `rclone`.
    
2. **Preservação da Estrutura de Diretórios:** É absolutamente vital que a estrutura de pastas dentro do bucket R2 espelhe exatamente a estrutura local. O caminho `modules/yan-modulo/adventures/automaton-atakebune/maps/tom-cartos-atakebune-cargo-grid.webp` no R2 deve corresponder ao caminho relativo original.
    
3. **Comando de Sincronização:** Use o comando `sync` do `rclone` para fazer o upload. Este comando irá copiar apenas os arquivos novos ou alterados, tornando as atualizações futuras mais rápidas. Execute um comando para cada pasta de ativos principal (adventures, tokens, etc.), por exemplo:
    
    Bash
    
    ```
    rclone sync "C:\foundry-migration-project\yan-modulo\adventures" "R2-Remote:foundry/adventures" --progress
    rclone sync "C:\foundry-migration-project\yan-modulo\tokens" "R2-Remote:foundry/tokens" --progress
    ```
    
    Substitua `R2-Remote` pelo nome que você deu à sua configuração R2 no `rclone` e `foundry` pelo nome do seu bucket.
    

### 4.2. Redirecionamento Programático de Caminhos: O Coração da Migração

A atualização manual de milhares de caminhos de arquivos em arquivos JSON é impraticável e propensa a erros. Uma abordagem programática é necessária. Embora módulos como o Asset Auditor 19 e o Mass Edit 20 sejam excelentes para gerenciar ativos dentro de um mundo ativo, eles não são a ferramenta ideal para um processo de construção de módulo. Operar diretamente nos arquivos JSON de origem entre as etapas de descompactação e recompactação é um fluxo de trabalho mais limpo, repetível e profissional. Ele garante que o módulo final seja construído a partir de uma fonte de dados pura, sem artefatos de um mundo de jogo intermediário.

1. **O Script de Substituição em Python:** Um script Python é ideal para esta tarefa devido às suas robustas bibliotecas de manipulação de JSON e sistema de arquivos. O script completo é fornecido no **Apêndice A.2**. Sua lógica de operação é a seguinte:
    
    - Ele aceita o caminho para a pasta `packs-json` como argumento.
        
    - Percorre recursivamente cada arquivo e subdiretório.
        
    - Para cada arquivo `.json`, ele carrega seu conteúdo.
        
    - Uma função de busca recursiva navega por todo o objeto JSON (dicionários, listas, valores aninhados).
        
    - Ele procura por valores de string que correspondam ao padrão de um caminho de ativo local (começando com `modules/yan-modulo/`).
        
    - Quando um caminho é encontrado, ele substitui o prefixo local `modules/yan-modulo/` pela nova URL base do R2 (ex: `https://foundry.s3.seudominio.com/`).
        
    - O script é projetado para verificar chaves comuns como `img`, `src`, `texture.src`, e também para analisar o conteúdo de campos HTML (como descrições de itens ou páginas de diário) em busca de tags `<img>` ou `<a>` e atualizar seus atributos `src` ou `href`.
        
    - O arquivo JSON modificado é então salvo de volta no mesmo local, sobrescrevendo o original.
        
2. **Execução:** Salve o script (por exemplo, como `update_paths.py`) e execute-o a partir do terminal, passando o caminho para sua pasta `packs-json`:
    
    Bash
    
    ```
    python update_paths.py "C:\foundry-migration-project\packs-json"
    ```
    

Após a execução do script, todos os caminhos de ativos nos seus arquivos JSON de origem estarão apontando para o seu bucket R2.

|Tipo de Documento|Chave JSON|Caminho Original|URL Transformada|
|---|---|---|---|
|Actor|`img`|`modules/yan-modulo/tokens/aboleth.webp`|`https://foundry.s3.seudominio.com/tokens/aboleth.webp`|
|Scene|`background.src`|`modules/yan-modulo/adventures/bandit-hideout/maps/tom-cartos-bandit-hideout-grid.webp`|`https://foundry.s3.seudominio.com/adventures/bandit-hideout/maps/tom-cartos-bandit-hideout-grid.webp`|
|Tile|`texture.src`|`modules/yan-modulo/adventures/bloodstone-manor/artwork/beam-diagram.webp`|`https://foundry.s3.seudominio.com/adventures/bloodstone-manor/artwork/beam-diagram.webp`|
|JournalEntryPage|`src`|`modules/yan-modulo/adventures/banshee-tower/artwork/banshee-tower-banner.webp`|`https://foundry.s3.seudominio.com/adventures/banshee-tower/artwork/banshee-tower-banner.webp`|
|JournalEntryPage|`text.content`|`...<img src="modules/yan-modulo/artwork/image.webp"/>...`|`...<img src="https://foundry.s3.seudominio.com/artwork/image.webp"/>...`|

## Seção 5: Fase IV - O Renascimento de um Módulo: Compilando para o Foundry VTT v12

Com os dados de origem agora limpos e apontando para a nuvem, a etapa final é remontar tudo em um novo módulo compatível com a v12.

### 5.1. Criando o Manifesto `module.json` da v12

Crie um novo arquivo `module.json` na raiz da sua nova pasta de módulo (`C:\foundry-migration-project\yan-curated-data\`). Este arquivo definirá a identidade e o conteúdo do seu módulo para a v12. Um modelo completo é fornecido no **Apêndice A.3**.

- **Identificação e Versionamento:** Defina o `id` como `yan-curated-data`. O nome da pasta do módulo deve corresponder exatamente a este `id`. Defina um número de `version` inicial, como `"1.0.0"`.21
    
- **Bloco de Compatibilidade:** Este é um campo obrigatório e crucial para a v12. Adicione o objeto `compatibility` para garantir que o módulo só possa ser ativado em versões apropriadas do Foundry VTT.6
    
    JSON
    
    ```
    "compatibility": {
      "minimum": "12",
      "verified": "12.324"
    }
    ```
    
- **Definição dos Pacotes (Packs):** A matriz `packs` deve ser atualizada para refletir a nova estrutura LevelDB. O atributo `path` agora aponta para o diretório do compêndio (dentro da pasta `packs`), e a extensão `.db` deve ser removida.9
    
    JSON
    
    ```
    "packs": [
      {
        "name": "adventures",
        "label": "Curated Adventures",
        "path": "packs/adventures",
        "type": "Adventure",
        "system": "dnd5e"
      },
     ...
    ]
    ```
    
- **Relacionamentos (Relationships):** Use o novo bloco `relationships` para declarar dependências, como o sistema de jogo para o qual o conteúdo foi projetado.2
    
    JSON
    
    ```
    "relationships": {
      "systems": [
        {
          "id": "dnd5e",
          "type": "system",
          "compatibility": {}
        }
      ]
    }
    ```
    

### 5.2. Executando a Operação de Compactação

Este comando compilará os arquivos JSON de volta para o formato de banco de dados LevelDB que o Foundry VTT v12 utiliza.

1. Certifique-se de que a CLI ainda está configurada para trabalhar no seu novo módulo (`fvtt package workon "yan-curated-data"`).
    
2. Para cada compêndio, execute o comando `pack` a partir da raiz da pasta `yan-curated-data`, apontando para a pasta de origem JSON correspondente:
    
    Bash
    
    ```
    fvtt package pack "adventures" --inputDirectory "../packs-json/adventures"
    ```
    
3. Repita para todos os seus compêndios. A CLI irá ler os arquivos `.json` e criar a estrutura de diretórios LevelDB apropriada dentro da pasta `yan-curated-data/packs/`.10
    

### 5.3. Montagem Final do Módulo

Após a conclusão, a estrutura final da sua pasta de módulo deve ser a seguinte:

```
yan-curated-data/
├── module.json
└── packs/
    ├── adventures/
    │   ├── 000001.ldb
    │   ├── CURRENT
    │   └──...
    ├── criaturas-yan/
    │   ├── 000001.ldb
    │   └──...
    └──...
```

A pasta `yan-curated-data` agora está pronta para ser instalada em um ambiente Foundry VTT v12.

## Seção 6: Fase V - Verificação e Solução de Problemas

A fase final envolve a implantação do módulo recém-criado em um ambiente de teste limpo para garantir que a migração foi bem-sucedida.

### 6.1. Protocolo de Implantação e Teste Rigoroso

1. **Ambiente Limpo:** Instale uma versão limpa do Foundry VTT v12. Não migre seu mundo v11 existente. Crie um novo mundo de teste com o sistema de jogo apropriado (por exemplo, dnd5e).
    
2. **Instalação do Módulo:** Copie a pasta `yan-curated-data` para a pasta `modules` dentro do seu novo caminho de dados do usuário da v12.
    
3. **Verificação Sistemática:**
    
    - Inicie o Foundry v12 e abra o mundo de teste.
        
    - Vá para "Manage Modules" e ative apenas o módulo `yan-curated-data`. O Foundry deve recarregar sem erros.
        
    - Abra a aba de Compêndios. Todos os seus pacotes curados devem estar listados.
        
    - Abra cada compêndio e verifique se as entradas aparecem corretamente.
        
    - Arraste um ator de um compêndio para a tela. Verifique se a imagem do token carrega. Use as ferramentas de desenvolvedor do seu navegador (F12) para inspecionar o elemento da imagem e confirmar que o `src` é uma URL do seu domínio R2.
        
    - Importe uma cena de um compêndio. Verifique se a imagem de fundo e quaisquer tiles carregam corretamente a partir do R2.
        
    - Abra uma entrada de diário que continha imagens. Verifique se as imagens são exibidas corretamente.
        
    - Após confirmar que o módulo base funciona, comece a ativar outros módulos essenciais, um de cada vez, para verificar se há conflitos.
        

### 6.2. Armadilhas Comuns e Soluções

- **Erros de CORS no Console do Navegador:** Se o console do navegador mostrar erros relacionados a "Cross-Origin Resource Sharing", o problema está quase certamente na configuração da Cloudflare. Verifique novamente a política de CORS no seu bucket R2 e certifique-se de que o script do worker está ativo e configurado corretamente para as rotas certas.15
    
- **Links de Imagem Quebrados (Erro 404):** Se as imagens não carregarem, indica uma discrepância entre a URL no banco de dados e o caminho real do arquivo no bucket R2. As causas mais prováveis são:
    
    1. O comando `rclone sync` não foi executado a partir do diretório correto, resultando em uma estrutura de pastas incorreta no bucket.
        
    2. O script de substituição de Python usou uma URL base incorreta ou a lógica de substituição falhou em algum caso específico. Verifique manualmente alguns arquivos JSON para confirmar se as URLs foram geradas corretamente.
        
- **Falhas no Carregamento do Compêndio:** Se um compêndio aparecer vazio ou não abrir, isso geralmente indica um problema durante a etapa `fvtt package pack` ou uma entrada malformada no `module.json` para aquele pacote específico. Verifique o caminho e o nome no manifesto e tente recompactar o compêndio.
    
- **Problemas no Navegador de Arquivos S3 do Foundry:** Se o bucket R2 não aparecer como uma opção no Navegador de Arquivos do Foundry, o problema está na comunicação inicial. Verifique o arquivo `s3.json` em busca de erros de digitação nas credenciais ou no endpoint. Se o arquivo estiver correto, o problema provavelmente está no worker da Cloudflare que não está processando corretamente as solicitações de API do Foundry.
    

## Apêndice: Scripts e Configurações Essenciais

### A.1: Script do Worker de Compatibilidade S3 da Cloudflare

JavaScript

```
/**
 * @license MIT <https://opensource.org/licenses/MIT>
 * @copyright Michael Hart 2022
 * https://unpkg.com/aws4fetch@1.0.17/dist/aws4fetch.esm.js
 */
const encoder = new TextEncoder();
const HOST_SERVICES = { appstream2: 'appstream', cloudhsmv2: 'cloudhsm', email: 'ses', marketplace: 'aws-marketplace', mobile: 'AWSMobileHubService', pinpoint: 'mobiletargeting', queue: 'sqs', 'git-codecommit': 'codecommit', 'mturk-requester-sandbox': 'mturk-requester', 'personalize-runtime': 'personalize', };
const UNSIGNABLE_HEADERS = new Set([ 'authorization', 'user-agent', 'presigned-expires', 'expect', 'x-amzn-trace-id', 'range', 'connection', ]);
class AwsClient {
constructor({ accessKeyId, secretAccessKey, sessionToken, service, region, cache, retries, initRetryMs }) {
    if (accessKeyId == null) throw new TypeError('accessKeyId is a required option')
    if (secretAccessKey == null) throw new TypeError('secretAccessKey is a required option')
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.sessionToken = sessionToken;
    this.service = service;
    this.region = region;
    this.cache = cache |

| new Map();
    this.retries = retries!= null? retries : 10;
    this.initRetryMs = initRetryMs |

| 50;
}
async sign(input, init) {
    if (input instanceof Request) {
    const { method, url, headers, body } = input;
    init = Object.assign({ method, url, headers }, init);
    if (init.body == null && headers.has('Content-Type')) {
        init.body = body!= null && headers.has('X-Amz-Content-Sha256')? body : await input.clone().arrayBuffer();
    }
    input = url;
    }
    const signer = new AwsV4Signer(Object.assign({ url: input }, init, this, init && init.aws));
    const signed = Object.assign({}, init, await signer.sign());
    delete signed.aws;
    try {
    return new Request(signed.url.toString(), signed)
    } catch (e) {
    if (e instanceof TypeError) {
        return new Request(signed.url.toString(), Object.assign({ duplex: 'half' }, signed))
    }
    throw e
    }
}
async fetch(input, init) {
    for (let i = 0; i <= this.retries; i++) {
    const fetched = fetch(await this.sign(input, init));
    if (i === this.retries) {
        return fetched
    }
    const res = await fetched;
    if (res.status < 500 && res.status!== 429) {
        return res
    }
    await new Promise(resolve => setTimeout(resolve, Math.random() * this.initRetryMs * Math.pow(2, i)));
    }
    throw new Error('An unknown error occurred, ensure retries is not negative')
}
}
class AwsV4Signer {
constructor({ method, url, headers, body, accessKeyId, secretAccessKey, sessionToken, service, region, cache, datetime, signQuery, appendSessionToken, allHeaders, singleEncode }) {
    if (url == null) throw new TypeError('url is a required option')
    if (accessKeyId == null) throw new TypeError('accessKeyId is a required option')
    if (secretAccessKey == null) throw new TypeError('secretAccessKey is a required option')
    this.method = method |

| (body? 'POST' : 'GET');
    this.url = new URL(url);
    this.headers = new Headers(headers |

| {});
    this.body = body;
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.sessionToken = sessionToken;
    let guessedService, guessedRegion;
    if (!service ||!region) {
    = guessServiceRegion(this.url, this.headers);
    }
    this.service = service |

| guessedService |
| '';
    this.region = region |

| guessedRegion |
| 'us-east-1';
    this.cache = cache |

| new Map();
    this.datetime = datetime |

| new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
    this.signQuery = signQuery;
    this.appendSessionToken = appendSessionToken |

| this.service === 'iotdevicegateway';
    this.headers.delete('Host');
    if (this.service === 's3' &&!this.signQuery &&!this.headers.has('X-Amz-Content-Sha256')) {
    this.headers.set('X-Amz-Content-Sha256', 'UNSIGNED-PAYLOAD');
    }
    const params = this.signQuery? this.url.searchParams : this.headers;
    params.set('X-Amz-Date', this.datetime);
    if (this.sessionToken &&!this.appendSessionToken) {
    params.set('X-Amz-Security-Token', this.sessionToken);
    }
    this.signableHeaders = ['host',...this.headers.keys()]
   .filter(header => allHeaders ||!UNSIGNABLE_HEADERS.has(header))
   .sort();
    this.signedHeaders = this.signableHeaders.join(';');
    this.canonicalHeaders = this.signableHeaders
   .map(header => header + ':' + (header === 'host'? this.url.host : (this.headers.get(header) |

| '').replace(/\s+/g, ' ')))
   .join('\n');
    this.credentialString = [this.datetime.slice(0, 8), this.region, this.service, 'aws4_request'].join('/');
    if (this.signQuery) {
    if (this.service === 's3' &&!params.has('X-Amz-Expires')) {
        params.set('X-Amz-Expires', '86400');
    }
    params.set('X-Amz-Algorithm', 'AWS4-HMAC-SHA256');
    params.set('X-Amz-Credential', this.accessKeyId + '/' + this.credentialString);
    params.set('X-Amz-SignedHeaders', this.signedHeaders);
    }
    if (this.service === 's3') {
    try {
        this.encodedPath = decodeURIComponent(this.url.pathname.replace(/\+/g, ' '));
    } catch (e) {
        this.encodedPath = this.url.pathname;
    }
    } else {
    this.encodedPath = this.url.pathname.replace(/\/+/g, '/');
    }
    if (!singleEncode) {
    this.encodedPath = encodeURIComponent(this.encodedPath).replace(/%2F/g, '/');
    }
    this.encodedPath = encodeRfc3986(this.encodedPath);
    const seenKeys = new Set();
    this.encodedSearch = [...this.url.searchParams]
   .filter(([k]) => {
        if (!k) return false
        if (this.service === 's3') {
        if (seenKeys.has(k)) return false
        seenKeys.add(k);
        }
        return true
    })
   .map(pair => pair.map(p => encodeRfc3986(encodeURIComponent(p))))
   .sort(([k1, v1], [k2, v2]) => k1 < k2? -1 : k1 > k2? 1 : v1 < v2? -1 : v1 > v2? 1 : 0)
   .map(pair => pair.join('='))
   .join('&');
}
async sign() {
    if (this.signQuery) {
    this.url.searchParams.set('X-Amz-Signature', await this.signature());
    if (this.sessionToken && this.appendSessionToken) {
        this.url.searchParams.set('X-Amz-Security-Token', this.sessionToken);
    }
    } else {
    this.headers.set('Authorization', await this.authHeader());
    }
    return { method: this.method, url: this.url, headers: this.headers, body: this.body, }
}
async authHeader() {
    return.join(', ')
}
async signature() {
    const date = this.datetime.slice(0, 8);
    const cacheKey = [this.secretAccessKey, date, this.region, this.service].join();
    let kCredentials = this.cache.get(cacheKey);
    if (!kCredentials) {
    const kDate = await hmac('AWS4' + this.secretAccessKey, date);
    const kRegion = await hmac(kDate, this.region);
    const kService = await hmac(kRegion, this.service);
    kCredentials = await hmac(kService, 'aws4_request');
    this.cache.set(cacheKey, kCredentials);
    }
    return buf2hex(await hmac(kCredentials, await this.stringToSign()))
}
async stringToSign() {
    return.join('\n')
}
async canonicalString() {
    return.join('\n')
}
async hexBodyHash() {
    let hashHeader = this.headers.get('X-Amz-Content-Sha256') |

| (this.service === 's3' && this.signQuery? 'UNSIGNED-PAYLOAD' : null);
    if (hashHeader == null) {
    if (this.body && typeof this.body!== 'string' &&!('byteLength' in this.body)) {
        throw new Error('body must be a string, ArrayBuffer or ArrayBufferView, unless you include the X-Amz-Content-Sha256 header')
    }
    hashHeader = buf2hex(await hash(this.body |

| ''));
    }
    return hashHeader
}
}
async function hmac(key, string) {
const cryptoKey = await crypto.subtle.importKey(
    'raw',
    typeof key === 'string'? encoder.encode(key) : key,
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign'],
);
return crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(string))
}
async function hash(content) {
return crypto.subtle.digest('SHA-256', typeof content === 'string'? encoder.encode(content) : content)
}
function buf2hex(buffer) {
return Array.prototype.map.call(new Uint8Array(buffer), x => ('0' + x.toString(16)).slice(-2)).join('')
}
function encodeRfc3986(urlEncodedStr) {
return urlEncodedStr.replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase())
}
function guessServiceRegion(url, headers) {
const { hostname, pathname } = url;
if (hostname.endsWith('.r2.cloudflarestorage.com')) {
    return ['s3', 'auto']
}
if (hostname.endsWith('.backblazeb2.com')) {
    const match = hostname.match(/^(?:[^.]+\.)?s3\.([^.]+)\.backblazeb2\.com$/);
    return match!= null? ['s3', match] : ['', '']
}
const match = hostname.replace('dualstack.', '').match(/([^.]+)\.(?:([^.]*)\.)?amazonaws\.com(?:\.cn)?$/);
let [service, region] = (match |

| ['', '']).slice(1, 3);
if (region === 'us-gov') {
    region = 'us-gov-west-1';
} else if (region === 's3' |

| region === 's3-accelerate') {
    region = 'us-east-1';
    service = 's3';
} else if (service === 'iot') {
    if (hostname.startsWith('iot.')) {
    service = 'execute-api';
    } else if (hostname.startsWith('data.jobs.iot.')) {
    service = 'iot-jobs-data';
    } else {
    service = pathname === '/mqtt'? 'iotdevicegateway' : 'iotdata';
    }
} else if (service === 'autoscaling') {
    const targetPrefix = (headers.get('X-Amz-Target') |

| '').split('.');
    if (targetPrefix === 'AnyScaleFrontendService') {
    service = 'application-autoscaling';
    } else if (targetPrefix === 'AnyScaleScalingPlannerFrontendService') {
    service = 'autoscaling-plans';
    }
} else if (region == null && service.startsWith('s3-')) {
    region = service.slice(3).replace(/^fips-|^external-1/, '');
    service = 's3';
} else if (service.endsWith('-fips')) {
    service = service.slice(0, -5);
} else if (region && /-\d$/.test(service) &&!/-\d$/.test(region)) {
    [service, region] = [region, service];
}
return |

| service, region]
}
export default {
async fetch(request, env, ctx) {
    // Fill these in...
    const my_s3_domain = "s3.seudominio.com"; // REPLACE WITH YOUR S3 DOMAIN
    const my_bucket_name = "foundry" // REPLACE WITH YOUR BUCKET NAME
    const my_account_id = "SEU_ACCOUNT_ID_AQUI"; // REPLACE WITH YOUR ACCOUNT ID
    const my_access_key = "SEU_ACCESS_KEY_ID_AQUI"; // REPLACE WITH YOUR ACCESS KEY
    const my_secret_key = "SEU_SECRET_ACCESS_KEY_AQUI"; // REPLACE WITH YOUR SECRET KEY

    // Create the strings we need now
    const my_bucket_domain = my_bucket_name + "." + my_s3_domain;
    const cloudflare_s3_api = "https://" + my_account_id + ".r2.cloudflarestorage.com";
    const cloudflare_s3_bucket_api = "https://" + my_bucket_name + "." + my_account_id + ".r2.cloudflarestorage.com";

    // Make sure there is an Authorization header
    if (request.headers.get("authorization") === null) {
      // Allow public access for GET requests if there's no authorization
      if (request.method === "GET") {
        let new_url = new URL(request.url);
        new_url.hostname = new_url.hostname.replace(my_s3_domain, "r2.dev"); // Replace with your public R2 domain if different
        return fetch(new Request(new_url, request));
      }
      return (new Response("Forbidden", { status: 403 }));
    }

    // Generate a new signature and change URL
    var s3_url;
    const request_url = new URL(request.url);
    if (request_url.hostname === my_s3_domain) {
      s3_url = cloudflare_s3_api;
    } else if (request_url.hostname === my_bucket_domain) {
      s3_url = cloudflare_s3_bucket_api;
      request_url.pathname = request_url.pathname.replace("worker/", "");
      s3_url = s3_url.concat(request_url.pathname, request_url.search)
    } else {
       return new Response("Invalid hostname", { status: 400 });
    }
    const s3_request = new Request(s3_url, request);
    s3_request.headers.delete("accept-encoding");
    s3_request.headers.delete("cf-connecting-ip");
    s3_request.headers.delete("cf-ipcountry");
    s3_request.headers.delete("cf-ray");
    s3_request.headers.delete("cf-visitor");
    s3_request.headers.delete("x-forwarded-proto");
    s3_request.headers.delete("x-real-ip");

    const signer = new AwsV4Signer({
      url: s3_url,
      accessKeyId: my_access_key,
      secretAccessKey: my_secret_key,
      method: s3_request.method,
      headers: s3_request.headers,
      body: s3_request.body,
      service: "s3",
      region: "auto",
      datetime: s3_request.headers.get("x-amz-date"),
    });
    const auth_header = await signer.authHeader();
    s3_request.headers.set("Authorization", auth_header);

    return fetch(s3_request);
},
};
```

### A.2: Script Python para Substituição de Caminhos de Ativos

Python

```
import os
import json
import re
from pathlib import Path

# --- CONFIGURAÇÃO ---
# O diretório raiz contendo as pastas de compêndio descompactadas (ex: 'packs-json')
ROOT_DIR = "C:/foundry-migration-project/packs-json"
# O prefixo do caminho antigo que será substituído
OLD_PATH_PREFIX = "modules/yan-modulo/"
# A nova URL base para os ativos no R2
NEW_URL_PREFIX = "https://foundry.s3.seudominio.com/" # Lembre-se da barra no final

# --- LÓGICA DO SCRIPT ---
def update_asset_paths(data):
    """
    Percorre recursivamente uma estrutura de dados (dicionário ou lista)
    e substitui os prefixos de caminho de ativos.
    """
    if isinstance(data, dict):
        for key, value in data.items():
            data[key] = update_asset_paths(value)
    elif isinstance(data, list):
        for i, item in enumerate(data):
            data[i] = update_asset_paths(item)
    elif isinstance(data, str):
        # Substituição direta de caminhos
        if data.strip().startswith(OLD_PATH_PREFIX):
            data = data.replace(OLD_PATH_PREFIX, NEW_URL_PREFIX, 1)
            
        # Substituição dentro de conteúdo HTML
        # Procura por src="..." ou href="..." contendo o prefixo antigo
        def replace_html_path(match):
            tag_attr = match.group(1) # src= ou href=
            quote = match.group(2) # " ou '
            path = match.group(3)
            if path.startswith(OLD_PATH_PREFIX):
                new_path = path.replace(OLD_PATH_PREFIX, NEW_URL_PREFIX, 1)
                return f'{tag_attr}{quote}{new_path}{quote}'
            return match.group(0) # Retorna o original se não corresponder

        # Regex para encontrar src="..." ou href="..."
        html_pattern = re.compile(r'(src=|href=)(["\'])(.*?)\2', re.IGNORECASE)
        data = html_pattern.sub(replace_html_path, data)
        
    return data

def process_directory(directory_path):
    """
    Processa todos os arquivos.json em um diretório e seus subdiretórios.
    """
    print(f"Processando diretório: {directory_path}")
    path = Path(directory_path)
    for file_path in path.rglob('*.json'):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = json.load(f)

            updated_content = update_asset_paths(content)

            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(updated_content, f, indent=2, ensure_ascii=False)
            
            # print(f"  - Atualizado: {file_path.name}")

        except json.JSONDecodeError:
            print(f"  - ERRO: Falha ao decodificar JSON em {file_path}")
        except Exception as e:
            print(f"  - ERRO: Ocorreu um erro inesperado em {file_path}: {e}")

if __name__ == "__main__":
    if not os.path.isdir(ROOT_DIR):
        print(f"ERRO: O diretório raiz '{ROOT_DIR}' não foi encontrado.")
    else:
        process_directory(ROOT_DIR)
        print("\nProcesso de atualização de caminhos concluído.")
```

### A.3: Modelo de `module.json` para a v12

JSON

```
{
  "id": "yan-curated-data",
  "title": "Yan's Curated Content",
  "description": "A consolidated collection of premium content from various creators, optimized for Foundry VTT v12 with cloud-hosted assets.",
  "version": "1.0.0",
  "authors":,
  "compatibility": {
    "minimum": "12",
    "verified": "12.324"
  },
  "relationships": {
    "systems": [
      {
        "id": "dnd5e",
        "type": "system",
        "compatibility": {}
      }
    ],
    "dependencies":,
    "recommends":
  },
  "packs":,
  "packFolders":,
  "scripts":,
  "esmodules":,
  "styles":,
  "languages":,
  "socket": false,
  "manifest": "URL_DO_SEU_MANIFEST_SE_HOSPEDADO_ONLINE",
  "download": "URL_DO_ZIP_DO_SEU_MODULO_SE_HOSPEDADO_ONLINE",
  "protected": false,
  "exclusive": false
}
```