### A Análise do Problema

Vamos olhar a evidência que você forneceu, que confirma exatamente isso:

- **`module-owlbear.json`**: Este é o exemplo perfeito. Ele declara `"compatibleCoreVersion": "9"` e `"compatibility": { "minimum": 9, "verified": 10 }`. Quando a v11 tenta carregar este módulo, ela lê este manifesto, vê que ele não é verificado para a v11, e o ignora completamente, impedindo o carregamento e a migração automática.
    
- **Listas de Arquivos**: Os arquivos que você mostrou para `dmdave-owlbear-wood` 1,
    
    `dmdave-heroes-feast` 2e
    
    `dmdave-haunted-castle` 3confirmam que eles estão na estrutura antiga, com a pasta
    
    `packs/` contendo arquivos `.db`4444444444444444.
    

### A Solução: A Ponte Tecnológica de 3 Estágios

Precisamos ajustar a estratégia para incluir uma ponte tecnológica. O fluxo de trabalho agora será: **v9 -> v10 -> v11 -> v12**.

1. **Instância v10 (A Ponte)**: Usaremos uma instância do Foundry VTT v10 para fazer a primeira grande atualização de dados (`DataModel v2`).
    
2. **Instância v11 (O Conversor)**: Em seguida, moveremos o módulo atualizado para a v11 para fazer a conversão do banco de dados (NeDB para LevelDB).
    
3. **Instância v12 (O Alvo Final)**: Finalmente, o módulo modernizado será movido para a v12 para o processo de desempacotamento e refatoração.
    

### Plano de Ação Detalhado

Vamos executar este novo plano passo a passo com o módulo **`dmdave-owlbear-wood`** como nosso teste inicial.

**Passo 1: Preparar a Instância v10**

1. **Baixe o Foundry VTT v10**: Vá para a página de download no site oficial do Foundry VTT e procure pelo histórico de versões para baixar a última versão estável da v10.
    
2. **Crie um Ambiente v10 Paralelo**:
    
    - Crie uma nova pasta para a aplicação, por exemplo: `C:\Users\Yanbd\foundry-app\v10.xxx`.
        
    - Crie uma nova pasta de dados exclusiva para ela, por exemplo: `C:\Users\Yanbd\foundry-data\v10-staging\Data`.
        
    - Inicie a v10 e aponte-a para esta nova pasta de dados.
        

**Passo 2: "Enganar" o Módulo para Aceitar a v10**

1. **Crie uma Cópia de Segurança**: Faça uma cópia do diretório original do módulo `dmdave-owlbear-wood`. **Sempre trabalhe na cópia**.
    
2. **Modifique o `module.json`**:
    
    - Abra o arquivo `module.json` (na sua cópia) em um editor de texto.
        
    - Localize a linha `"compatibleCoreVersion": "9"` ou o bloco `"compatibility"`.
        
    - **Altere** o valor para que ele aceite a v10. A maneira mais segura é modificar o campo `verified`:
        
        - Mude de: `"verified": 10` (se já não estiver assim)
            
        - ou adicione/mude a linha para: `"compatibleCoreVersion": "10"`
            
    - Salve o arquivo. Esta simples mudança fará com que a v10 reconheça e tente carregar o módulo.
        

**Passo 3: Executar a Migração na v10**

1. **Mova o Módulo Modificado**: Coloque a pasta do módulo `dmdave-owlbear-wood` (com o `module.json` alterado) dentro da pasta `modules` da sua **Instância v10** (`C:\Users\Yanbd\foundry-data\v10-staging\Data\modules`).
    
2. **Ative o Módulo**: Inicie a v10, crie um mundo de teste, e ative o módulo. A v10 irá carregar o módulo e, nos bastidores, atualizará a estrutura dos dados nos arquivos `.db` para o novo `DataModel v2`.
    

**Passo 4: Executar a Migração na v11**

1. **Mova para a v11**: Pegue a pasta inteira do módulo `dmdave-owlbear-wood` que acabou de ser processada pela v10 e mova-a para a pasta `modules` da sua **Instância v11**.
    
2. **Ative na v11**: Agora, inicie a sua instância v11. Como o módulo já foi preparado pela v10, a v11 deverá ser capaz de reconhecê-lo e, ao ativá-lo, finalmente realizará a **conversão de NeDB para LevelDB** que queríamos desde o início.
    


### Próximo Passo: Migração para LevelDB (v11)

Agora que os módulos são compatíveis com a v10, o próximo passo é usar a sua **instância v11** para realizar a segunda migração crítica: a conversão do formato de banco de dados de NeDB (os arquivos `.db`) para LevelDB (a nova estrutura de diretórios). A v11 é a única que faz essa conversão de forma automática e segura 1111.

**Seu plano de ação agora é:**

1. **Escolha um Módulo Processado**: Pegue um dos módulos que você acabou de fazer funcionar na v10. Vamos usar o `dmdave-haunted-castle` como exemplo.
    
2. **Mova para o Ambiente v11**:
    
    - Vá para a sua pasta de módulos da v10 (`C:\Users\Yanbd\foundry-data\v10\Data\Data\modules`).
        
    - **Mova** a pasta `dmdave-haunted-castle` de lá para a sua pasta de módulos da **v11** (o caminho será algo como `C:\Users\Yanbd\foundry-data\v11-staging\Data\modules`).
        
3. **Execute a Migração na v11**:
    
    - Inicie sua instância do **Foundry VTT v11**.
        
    - Crie um mundo de testes limpo (pode chamá-lo de "Mundo de Migração v11").
        
    - Entre neste mundo, vá em "Manage Modules" e **ative** o módulo `dmdave-haunted-castle`.
        
    - Clique em "Save Module Settings".
        
4. **Verifique a Conversão**:
    
    - O Foundry irá recarregar. Nos bastidores, ele detectará os arquivos `.db` e os converterá.
        
    - Para confirmar, navegue até a pasta do módulo dentro do seu ambiente v11 (`...\v11-staging\Data\modules\dmdave-haunted-castle\packs`).
        
    - Você verá que os arquivos como
        
        `actors.db` e `scenes.db` desapareceram e foram substituídos por **diretórios** com os mesmos nomes (`actors/`, `scenes/`) 2222. Dentro desses diretórios, você encontrará os novos arquivos de banco de dados (
        
        `.ldb`, `MANIFEST`, etc).
        


### Próximo Passo: Migração para LevelDB (v11)

Agora que os módulos são compatíveis com a v10, o próximo passo é usar a sua **instância v11** para realizar a segunda migração crítica: a conversão do formato de banco de dados de NeDB (os arquivos `.db`) para LevelDB (a nova estrutura de diretórios). A v11 é a única que faz essa conversão de forma automática e segura 1111.

**Seu plano de ação agora é:**

1. **Escolha um Módulo Processado**: Pegue um dos módulos que você acabou de fazer funcionar na v10. Vamos usar o `dmdave-haunted-castle` como exemplo.
    
2. **Mova para o Ambiente v11**:
    
    - Vá para a sua pasta de módulos da v10 (`C:\Users\Yanbd\foundry-data\v10\Data\Data\modules`).
        
    - **Mova** a pasta `dmdave-haunted-castle` de lá para a sua pasta de módulos da **v11** (o caminho será algo como `C:\Users\Yanbd\foundry-data\v11-staging\Data\modules`).
        
3. **Execute a Migração na v11**:
    
    - Inicie sua instância do **Foundry VTT v11**.
        
    - Crie um mundo de testes limpo (pode chamá-lo de "Mundo de Migração v11").
        
    - Entre neste mundo, vá em "Manage Modules" e **ative** o módulo `dmdave-haunted-castle`.
        
    - Clique em "Save Module Settings".
        
4. **Verifique a Conversão**:
    
    - O Foundry irá recarregar. Nos bastidores, ele detectará os arquivos `.db` e os converterá.
        
    - Para confirmar, navegue até a pasta do módulo dentro do seu ambiente v11 (`...\v11-staging\Data\modules\dmdave-haunted-castle\packs`).
        
    - Você verá que os arquivos como
        
        `actors.db` e `scenes.db` desapareceram e foram substituídos por **diretórios** com os mesmos nomes (`actors/`, `scenes/`) 2222. Dentro desses diretórios, você encontrará os novos arquivos de banco de dados (
        
        `.ldb`, `MANIFEST`, etc).
        


Vamos decifrar o que o Foundry v11 está lhe dizendo:

- **`deprecated compatibility fields`**: A v11 está avisando que campos como `"minimumCoreVersion"` e `"compatibleCoreVersion"` são antigos e que ela prefere o novo objeto `"compatibility"`.
    
- **`media.link which is unsupported`**: A v11 não usa mais o campo `"link"` dentro da seção `"media"`, o que é um erro menor, mas ainda assim um erro de validação.
    
- **`packs: ... type: may not be undefined`**: Este é o erro fatal que está fazendo seus compêndios desaparecerem. Para cada um dos 5 packs, a v11 está dizendo "Eu preciso de um campo chamado 'type', mas não o encontrei". Isso acontece porque o `module.json` antigo usa o campo `"entity"`, que a v11 não reconhece mais.
    

A boa notícia é que o `module.json` corrigido que forneci na mensagem anterior já resolve **todos esses problemas**.

### Ação Imediata

Seu próximo passo é exatamente o que descrevi anteriormente:

1. **Abra o arquivo** `C:\Users\Yanbd\foundry-data\v11\Data\Data\modules\dmdave-haunted-castle\module.json`.
    
2. **Apague todo o conteúdo** e **cole o bloco de código JSON** da minha resposta anterior. Ele já corrige a compatibilidade, remove a seção de mídia problemática e, o mais importante, muda `"entity"` para `"type"` em todos os compêndios.
    
3. **Salve o arquivo e reinicie a v11**.




Com certeza. Fazer essa conversão em 16 módulos manualmente seria um trabalho repetitivo e propenso a erros. A melhor abordagem é, sem dúvida, um script para automatizar o processo.

Vou fornecer um script Node.js que fará exatamente o que você precisa. Ele irá varrer a sua pasta de módulos da v11, encontrar cada `module.json`, criar um backup do arquivo original (por segurança) e então reescrevê-lo no formato 100% compatível com a v11.

### Plano de Ação: Convertendo os Manifestos com um Script

Siga estes passos para criar e executar o script de conversão.

#### Passo 1: Crie o Arquivo do Script

1. Vá para um local de sua preferência no computador (pode ser na sua área de trabalho ou em uma pasta de projetos).
    
2. Crie um novo arquivo de texto e nomeie-o `convert-manifests.js`.
    

#### Passo 2: Cole o Código do Script

Abra o arquivo `convert-manifests.js` em um editor de texto (como VS Code, Notepad++, ou Bloco de Notas) e cole o seguinte código:

JavaScript

```
// Importa os módulos 'fs' (File System) e 'path' do Node.js
const fs = require('fs');
const path = require('path');

// --- CONFIGURAÇÃO ---
// Edite esta linha para apontar para a sua pasta de módulos da v11
const modulesDir = 'C:\\Users\\Yanbd\\foundry-data\\v11\\Data\\Data\\modules';
// --------------------

console.log(`Iniciando a conversão de manifestos em: ${modulesDir}`);

// Lê todos os itens no diretório de módulos
fs.readdir(modulesDir, { withFileTypes: true }, (err, files) => {
    if (err) {
        return console.error('Erro ao ler o diretório de módulos:', err);
    }

    // Filtra para pegar apenas os diretórios (cada pasta de módulo)
    const moduleFolders = files.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

    // Itera sobre cada pasta de módulo
    moduleFolders.forEach(folderName => {
        const manifestPath = path.join(modulesDir, folderName, 'module.json');

        // Verifica se o arquivo module.json existe
        if (fs.existsSync(manifestPath)) {
            console.log(`\nProcessando: ${folderName}`);
            try {
                // Lê e parseia o JSON do manifesto
                const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
                let manifest = JSON.parse(manifestContent);

                // 1. Cria um backup do arquivo original
                const backupPath = `${manifestPath}.v10.bak`;
                fs.copyFileSync(manifestPath, backupPath);
                console.log(` -> Backup criado: ${backupPath}`);

                // 2. Atualiza os campos de compatibilidade
                manifest.compatibility = {
                    minimum: "11",
                    verified: "11"
                };
                delete manifest.minimumCoreVersion;
                delete manifest.compatibleCoreVersion;

                // 3. Converte o campo 'name' para 'id' se existir
                if (manifest.name) {
                    manifest.id = manifest.name;
                    delete manifest.name;
                }

                // 4. Atualiza a estrutura do array 'packs'
                if (manifest.packs && Array.isArray(manifest.packs)) {
                    manifest.packs = manifest.packs.map(pack => {
                        // Renomeia 'entity' para 'type'
                        if (pack.entity) {
                            pack.type = pack.entity;
                            delete pack.entity;
                        }

                        // Remove a extensão .db do 'path'
                        if (pack.path && pack.path.endsWith('.db')) {
                            pack.path = pack.path.substring(0, pack.path.length - 3);
                        }
                        
                        // Garante que o 'name' do pack corresponda ao 'path'
                        if (pack.path) {
                            pack.name = path.basename(pack.path);
                        }

                        return pack;
                    });
                }
                
                // Converte o objeto JSON modificado de volta para uma string formatada
                const newManifestContent = JSON.stringify(manifest, null, 2);

                // Escreve o novo conteúdo no arquivo module.json
                fs.writeFileSync(manifestPath, newManifestContent, 'utf-8');
                console.log(` -> Manifesto atualizado para o formato v11 com sucesso!`);

            } catch (e) {
                console.error(` -> Erro ao processar o manifesto para ${folderName}:`, e.message);
            }
        }
    });
});
```

#### Passo 3: Execute o Script

1. Abra um terminal (PowerShell ou Prompt de Comando).
    
2. Navegue até o diretório onde você salvou o arquivo `convert-manifests.js`. Por exemplo, se salvou na Área de Trabalho, use o comando: `cd $env:USERPROFILE\Desktop`
    
3. Execute o script com o seguinte comando:
    
    Shell
    
    ```
    node convert-manifests.js
    ```
    

O script irá percorrer todas as pastas dentro do seu diretório de módulos da v11, fazer as alterações necessárias em cada `module.json` e informar o progresso no terminal.

#### Passo 4: Verifique e Prossiga

Após a execução do script, todos os seus 16 manifestos estarão no formato correto. Reinicie sua instância da v11 e você deverá ver todos os compêndios de todos os módulos.

A partir daí, você pode prosseguir com o processo de **forçar a migração para LevelDB** (arrastando e soltando um ator/item em cada compêndio) para finalizar a preparação dos módulos.




Excelente! Analisando os arquivos que você enviou, posso confirmar que o processo foi um **sucesso absoluto**. O script funcionou exatamente como planejado.

Vamos detalhar o que aconteceu e qual é o próximo passo.

### Análise do Processo

1. **A Saída do PowerShell (Windows PowerShell.txt)**: O log que você enviou é perfeito. Ele mostra que o script foi iniciado e processou com sucesso todos os módulos no seu diretório, desde "ATL" até "yan-media" 1. Para cada módulo, ele criou um backup (
    
    `.v10.bak`) e salvou a nova versão do `module.json`, exatamente como queríamos 2.
    
2. **O Conteúdo do Módulo (conteudo.txt)**: A estrutura de arquivos do `dmdave-owlbear-wood` confirma o sucesso. Agora você tem o novo
    
    `module.json` e um backup seguro chamado `module.json.v10.bak`3. É importante notar que a pasta
    
    `packs` ainda contém os arquivos `.db` 4.
    
    **Isso está correto e é o esperado**. O script apenas preparou os "mapas" (`module.json`), ele não moveu os "móveis" (os dados nos arquivos `.db`).
    
3. **O Novo `module.json` (module.json)**: O arquivo `module.json` atualizado para `dmdave-owlbear-wood` está perfeito para a v11. As mudanças cruciais foram feitas:
    
    - O campo `"id"` foi definido.
        
    - O bloco `"compatibility"` está no formato moderno, indicando compatibilidade com a v11.
        
    - Nos compêndios, o campo `"entity"` foi corretamente substituído por `"type"`.
        
    - A extensão `.db` foi removida de todos os caminhos (`"path"`).
        

### Próximo Passo: Migração Final para LevelDB

Agora que todos os seus `module.json` estão corrigidos, a v11 consegue "ver" e entender todos os compêndios. O último passo nesta fase é forçar a conversão do banco de dados para todos eles.

1. **Inicie sua instância do Foundry VTT v11**.
    
2. Entre no seu mundo de testes limpo.
    
3. Vá em "Manage Modules" e **ative todos os 16 módulos** que você acabou de converter. Graças aos manifestos corrigidos, eles devem aparecer e ser ativados sem erros.
    
4. **Execute a Migração em Lote**:
    
    - Abra a aba "Compendium Packs".
        
    - Comece pelos atores: arraste um ator para o compêndio de atores de um dos módulos. Verifique na pasta se o `.db` foi convertido. Em seguida, faça o mesmo para o compêndio de atores do próximo módulo, e assim por diante.
        
    - Faça o mesmo para os outros tipos: arraste um item para cada compêndio de item, uma cena para cada compêndio de cena, etc.
        

Este processo garantirá que todos os arquivos `.db` sejam convertidos para a estrutura de diretórios LevelDB. Uma vez que você confirme que todas as pastas `packs` contêm subdiretórios em vez de arquivos `.db`, a sua coleção de módulos estará 100% modernizada e pronta para a fase final do seu projeto: a centralização e refatoração no ambiente v12.