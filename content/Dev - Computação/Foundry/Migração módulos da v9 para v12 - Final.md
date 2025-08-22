### **Visão Geral e Preparação**

**Objetivo:** Migrar módulos antigos do Foundry VTT (criados para a v9) para que sejam totalmente compatíveis com as versões modernas (v12+), extraindo seu conteúdo para um formato de texto (JSON) fácil de gerenciar.

**Metodologia:** O processo utiliza "pontes tecnológicas", empregando as versões v10 e v11 do Foundry como ferramentas de conversão sequencial, antes de extrair os dados na v12.

### **Estrutura de Pastas de Trabalho**

Para garantir a portabilidade, crie a seguinte estrutura de pastas. **Todos os comandos de terminal devem ser executados a partir da pasta raiz `FoundryMigration`**.

```
./FoundryMigration/
├── foundry-apps/
│   ├── foundry-v10/
│   └── foundry-v11/
├── foundry-data/
│   ├── v10-staging/
│   │   └── Data/
│   │       └── modules/
│   ├── v11-staging/
│   │   └── Data/
│   │       └── modules/
│   └── v12-dev/
│       └── Data/
│           └── modules/
└── project-source/
    ├── scripts/
    │   ├── convert-manifests.js
    │   └── unpack-all.ps1
    └── json-source/
        └── (aqui ficarão os arquivos .json extraídos)
```

- **`foundry-apps`**: Contém os executáveis de cada versão do Foundry.
    
- **`foundry-data`**: Contém as pastas de dados de usuário para cada instância.
    
- **`project-source`**: Sua área de trabalho principal.
    

### **Fase 1: Migração de Dados e Banco de Dados (v9 → v10 → v11)**

#### **Passo 1: A Ponte da v10 - Atualização do Modelo de Dados**

- **Propósito:** A v10 do Foundry introduziu o `DataModel v2`. Módulos da v9 precisam passar pela v10 para que seus dados sejam atualizados.
    
- **Procedimento:**
    
    1. **Criar Ambiente v10:** Instale o Foundry v10 em `foundry-apps/foundry-v10/`. Ao iniciar, aponte o "User Data Path" para a pasta `foundry-data/v10-staging`.
        
    2. **Preparar o Módulo:**
        
        - Copie o módulo original para `foundry-data/v10-staging/Data/modules/`.
            
        - Abra o `module.json` e modifique a compatibilidade para a v10 o reconhecer:
            
            - **De:** `"compatibleCoreVersion": "9"`
                
            - **Para:** `"compatibleCoreVersion": "10", "compatibility": { "minimum": "10", "verified": "10" }`
                
    3. **Executar a Migração na v10:** Inicie a instância v10, crie um mundo de teste e ative o módulo. A v10 irá atualizar os dados nos arquivos `.db` ao carregar.
        

#### **Passo 2: A Conversão da v11 - De NeDB para LevelDB**

- **Propósito:** A v11 abandonou o formato NeDB (`.db`) em favor do LevelDB (diretórios). A v11 é a única que realiza essa conversão automaticamente.
    
- **Procedimento:**
    
    1. **Mover para o Ambiente v11:** Mova a pasta do módulo processada na v10 para `foundry-data/v11-staging/Data/modules/`.
        
    2. **Ativar na v11:** Inicie sua instância v11 (apontando para `v11-staging`), entre em um mundo de teste e ative o módulo.
        
    3. **Verificação e Ação Corretiva (Passo Crucial):**
        
        - Navegue até a pasta `packs` do módulo (ex: `.../v11-staging/Data/modules/dmdave-owlbear-wood/packs`).
            
        - **Verifique:** A pasta `actors` (ou similar) substituiu o arquivo `actors.db`?
            
        - **Se não,** a conversão automática falhou. Para forçá-la, abra o Foundry v11, vá até a aba "Compendium Packs", encontre o compêndio problemático e **arraste qualquer ator/item para dentro dele**. Isso força o Foundry a reescrever o banco de dados no novo formato LevelDB. Repita para cada compêndio que não converteu.
            

#### **Passo 3: Correção dos Manifestos (`module.json`) em Lote**

- **Problema Comum:** Os compêndios não aparecem na v11 porque o `module.json` usa um formato antigo.
    
- **Solução:** Use um script Node.js para corrigir todos os manifestos. Este script já é genérico e processa todas as pastas que encontrar.
    
    1. **Crie o Script:** Salve o código abaixo como `convert-manifests.js` em `project-source/scripts/`.
        
        ```
        // Importa os módulos 'fs' (File System) e 'path' do Node.js
        const fs = require('fs');
        const path = require('path');
        
        // --- CONFIGURAÇÃO ---
        // Caminho relativo da pasta raiz do projeto para a pasta de módulos da v11
        const modulesDir = path.join(process.cwd(), 'foundry-data', 'v11-staging', 'Data', 'modules');
        // --------------------
        
        console.log(`Iniciando a conversão de manifestos em: ${modulesDir}`);
        
        fs.readdir(modulesDir, { withFileTypes: true }, (err, files) => {
            if (err) {
                return console.error(`Erro ao ler o diretório de módulos: ${err.message}\nVerifique se o script está sendo executado da pasta raiz 'FoundryMigration'.`);
            }
        
            const moduleFolders = files.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
        
            moduleFolders.forEach(folderName => {
                const manifestPath = path.join(modulesDir, folderName, 'module.json');
        
                if (fs.existsSync(manifestPath)) {
                    console.log(`\nProcessando: ${folderName}`);
                    try {
                        const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
                        let manifest = JSON.parse(manifestContent);
        
                        const backupPath = `${manifestPath}.v10.bak`;
                        fs.copyFileSync(manifestPath, backupPath);
                        console.log(` -> Backup criado: ${backupPath}`);
        
                        manifest.compatibility = { minimum: "11", verified: "11" };
                        delete manifest.minimumCoreVersion;
                        delete manifest.compatibleCoreVersion;
        
                        if (manifest.name) {
                            manifest.id = manifest.name;
                            delete manifest.name;
                        }
        
                        if (manifest.packs && Array.isArray(manifest.packs)) {
                            manifest.packs = manifest.packs.map(pack => {
                                if (pack.entity) {
                                    pack.type = pack.entity;
                                    delete pack.entity;
                                }
                                if (pack.path && pack.path.endsWith('.db')) {
                                    pack.path = pack.path.substring(0, pack.path.length - 3);
                                }
                                if (pack.path) {
                                    pack.name = path.basename(pack.path);
                                }
                                return pack;
                            });
                        }
        
                        const newManifestContent = JSON.stringify(manifest, null, 2);
                        fs.writeFileSync(manifestPath, newManifestContent, 'utf-8');
                        console.log(` -> Manifesto atualizado para o formato v11 com sucesso!`);
        
                    } catch (e) {
                        console.error(` -> Erro ao processar o manifesto para ${folderName}:`, e.message);
                    }
                }
            });
        });
        ```
        
    2. **Execute o Script:** Abra um terminal **na pasta raiz `FoundryMigration`** e execute:
        
        ```
        node project-source/scripts/convert-manifests.js
        ```
        

### **Fase 2: Extração do Conteúdo para JSON (Ambiente v12)**

#### **Passo 1: Configuração da Ferramenta `fvtt-cli`**

- **Propósito:** Usar a `fvtt-cli` para extrair o conteúdo dos módulos.
    
- **Configuração do `dataPath`:** O `dataPath` deve ser o caminho absoluto para a pasta de dados da v12. Use o PowerShell para definir isso dinamicamente.
    
    - **Comando (execute da raiz `FoundryMigration`):**
        
        ```
        # Resolve o caminho relativo para um caminho absoluto e o configura
        $v12path = (Resolve-Path .\foundry-data\v12-dev).Path
        fvtt configure set dataPath $v12path
        Write-Host "fvtt-cli dataPath configurado para: $v12path"
        ```
        

#### **Passo 2: Desempacotar (Unpack) o Conteúdo em Lote**

- **Propósito:** Automatizar a extração de todos os compêndios para arquivos `.json`.
    
- **Solução:** Use este script PowerShell atualizado. Ele agora detecta automaticamente todos os módulos na pasta de destino, eliminando a necessidade de uma lista manual.
    
    1. **Crie o Script:** Salve o código abaixo como `unpack-all.ps1` em `project-source/scripts/`.
        
        ```
        # --- CONFIGURAÇÃO ---
        # Caminhos relativos baseados no local de execução do script
        $modulesPath = ".\foundry-data\v12-dev\Data\modules"
        $outputPath = ".\project-source\json-source"
        $compendiumTypes = @("actors", "scenes", "items", "journal")
        # --- FIM DA CONFIGURAÇÃO ---
        
        # Verifica se o diretório de módulos existe
        if (-not (Test-Path $modulesPath)) {
            Write-Host "ERRO: Pasta de módulos não encontrada em '$modulesPath'. Execute este script da pasta raiz 'FoundryMigration'." -ForegroundColor Red
            exit
        }
        
        # Detecta automaticamente todos os diretórios (módulos) na pasta de módulos
        $moduleDirectories = Get-ChildItem -Path $modulesPath -Directory
        if ($null -eq $moduleDirectories) {
            Write-Host "AVISO: Nenhum módulo encontrado em '$modulesPath'. Pulando o processo." -ForegroundColor Yellow
            exit
        }
        
        Write-Host "Detectados $($moduleDirectories.Count) módulos para processar." -ForegroundColor Green
        
        # Itera sobre cada módulo encontrado
        foreach ($moduleDir in $moduleDirectories) {
            $moduleId = $moduleDir.Name
            Write-Host "--- Processando Módulo: $moduleId ---" -ForegroundColor Cyan
        
            # O fvtt-cli usa o diretório atual, então navegamos até ele
            Push-Location $moduleDir.FullName
        
            Write-Host "Definindo o pacote de trabalho para '$moduleId'..."
            fvtt package workon $moduleId
        
            foreach ($compendium in $compendiumTypes) {
                # O fvtt-cli procura a pasta 'packs' dentro do diretório atual
                if (Test-Path "packs/$compendium") {
                    Write-Host " -> Desempacotando compêndio '$compendium'..." -ForegroundColor Green
                    # Construa o caminho de saída absoluto para o comando
                    $outputDir = (Resolve-Path (Join-Path $PSScriptRoot "..\..\" $outputPath "$moduleId\$compendium")).Path
        
                    if (-not (Test-Path $outputDir)) { New-Item -ItemType Directory -Force -Path $outputDir | Out-Null }
                    fvtt package unpack $compendium --outputDirectory $outputDir
                }
            }
            # Retorna ao diretório original (raiz do projeto)
            Pop-Location
        }
        Write-Host "--- Processo de desempacotamento concluído! ---" -ForegroundColor Cyan
        ```
        
    2. **Execute o Script:**
        
        - **Mova os Módulos:** Copie todos os módulos processados da pasta `v11-staging` para a pasta `v12-dev`.
            
        - **Abra o PowerShell como Administrador** na pasta raiz `FoundryMigration`.
            
        - **Permita a Execução:** `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`
            
        - **Execute:**
            
            ```
            .\project-source\scripts\unpack-all.ps1
            ```
            

### **Resultado Final**

Ao final deste guia aprimorado, você terá um processo robusto e portátil para transformar módulos antigos da v9 em uma estrutura de arquivos de texto `.json` modernos, organizados na pasta `project-source/json-source/`, prontos para a fase final de centralização e refatoração no seu projeto v12.