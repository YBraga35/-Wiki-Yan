Excelente trabalho! Você finalizou a parte mais complexa e imprevisível do processo. Agora que todos os seus módulos estão modernizados e compatíveis com a v11, podemos entrar na fase de consolidação, que é muito mais sistemática e repetível.

O próximo passo é executar a **Fase 2 do seu plano: Extração e Organização**. O objetivo é extrair todo o conteúdo (atores, cenas, itens) dos compêndios para arquivos de texto (JSON) e mover todos os arquivos de mídia (imagens, mapas, tokens) para o seu módulo centralizador de assets.

Vamos usar o `dmdave-haunted-castle` como nosso primeiro exemplo.

### Próximo Passo: Desempacotar para JSON (A Fonte da Verdade)

Agora vamos usar a ferramenta de linha de comando (`foundryvtt-cli`) que já configuramos para apontar para sua **instância v12**. O objetivo é extrair os dados do formato de banco de dados LevelDB para arquivos JSON individuais.

1. **Mova o Módulo para o Ambiente v12**:
    
    - Pegue a pasta `dmdave-haunted-castle` (que agora tem os compêndios no formato LevelDB) da sua pasta de módulos da v11.
        
    - **Copie** essa pasta para o diretório de módulos da sua **instância v12** (`C:\Users\Yanbd\foundry-data\v12-dev\Data\modules\`).
        
2. **Crie um Local para os Arquivos JSON**:
    
    - Crie uma pasta em algum lugar para ser seu "projeto" ou "área de trabalho". Por exemplo, crie `C:\MeuProjetoFoundry\json_source\`.
        
    - Dentro dela, crie uma pasta para este módulo: `C:\MeuProjetoFoundry\json_source\dmdave-haunted-castle\`.
        
3. **Execute o Comando `unpack`**:
    
    - Abra o terminal (PowerShell).
        
    - Navegue para a pasta do módulo dentro do seu ambiente v12:
        
        PowerShell
        
        ```
        cd "C:\Users\Yanbd\foundry-data\v12-dev\Data\modules\dmdave-haunted-castle"
        ```
        
    - Agora, execute o comando `unpack` para cada compêndio, direcionando a saída para a sua pasta de projeto. Você precisará de um comando para cada compêndio (atores, cenas, itens, etc.):
        
        PowerShell
        
        ```
        # Desempacota os atores
        fvtt package unpack actors --outputDirectory "C:\MeuProjetoFoundry\json_source\dmdave-haunted-castle\actors"
        
        # Desempacota as cenas
        fvtt package unpack scenes --outputDirectory "C:\MeuProjetoFoundry\json_source\dmdave-haunted-castle\scenes"
        
        # Desempacota os itens
        fvtt package unpack items --outputDirectory "C:\MeuProjetoFoundry\json_source\dmdave-haunted-castle\items"
        
        # Desempacota as entradas de diário (journals)
        fvtt package unpack journal --outputDirectory "C:\MeuProjetoFoundry\json_source\dmdave-haunted-castle\journal"
        ```
        
        _(Continue para todos os compêndios que o módulo tiver)_
        

Após executar esses comandos, a sua pasta `C:\MeuProjetoFoundry\json_source\dmdave-haunted-castle\` conterá subpastas para cada tipo de documento, e dentro delas, um arquivo `.json` para cada ator, cena, etc. Estes arquivos são agora a sua "fonte da verdade" e a base para a próxima grande etapa: a refatoração dos caminhos.



Você está quase lá! Esse erro é comum e fácil de resolver.

### O Diagnóstico

Este erro, `Package ID or type could not be determined`, significa que a ferramenta `fvtt` não sabe **em qual módulo ou sistema** ela deve procurar pelo compêndio chamado 'actors'. Embora você esteja dentro da pasta do módulo, a ferramenta precisa que você confirme explicitamente qual "pacote" (módulo, sistema, ou mundo) é o seu alvo de trabalho.

A própria mensagem de erro nos dá a solução: `Use 'package workon <id>' to set it.`

### A Solução: Definindo o Pacote de Trabalho

Antes de poder desempacotar, você precisa dizer à ferramenta: "Ei, eu quero trabalhar no módulo 'dmdave-haunted-castle'".

1. Permaneça no mesmo diretório no seu terminal:
    
    PS C:\Users\Yanbd\foundry-data\v12-dev\Data\modules\dmdave-haunted-castle>
    
2. **Execute o comando `workon`**. O `<id>` é o nome do módulo que está no `module.json` dele.
    
    PowerShell
    
    ```
    fvtt package workon dmdave-haunted-castle
    ```
    
3. Você deverá ver uma mensagem de confirmação, algo como: `Now working on package dmdave-haunted-castle`.
    
4. **Execute o comando `unpack` novamente**. Agora que a ferramenta sabe que está trabalhando no módulo `dmdave-haunted-castle`, ela conseguirá encontrar o compêndio "actors" dentro dele e desempacotá-lo.
    
    PowerShell
    
    ```
    fvtt package unpack actors --outputDirectory "C:\MeuProjetoFoundry\json_source\dmdave-haunted-castle\actors"
    ```
    

Este comando agora deve funcionar perfeitamente. Repita o comando `unpack` para os outros compêndios (`scenes`, `items`, `journal`, etc.) do módulo "haunted-castle". Quando você for para o próximo módulo (por exemplo, "heroes-feast"), você precisará navegar para a pasta dele e rodar `fvtt package workon dmdave-heroes-feast` antes de desempacotar seus compêndios.


Ah, este novo erro é extremamente revelador e aponta para um pequeno problema na configuração inicial da ferramenta `fvtt-cli`. Você está quase lá, este é o último obstáculo de configuração.

### O Diagnóstico: O Caminho "Data\Data"

Observe com atenção a última linha do erro:

path: 'C:\\Users\\Yanbd\\foundry-data\\v12-dev\\Data\\Data\\modules'

A ferramenta está procurando por uma pasta `Data` _dentro_ da sua pasta `Data`. Isso acontece por causa de como o Foundry e a ferramenta `fvtt-cli` entendem o "Caminho de Dados do Usuário" (`dataPath`).

- O que configuramos: `dataPath` = `C:\Users\Yanbd\foundry-data\v12-dev\Data`
    
- O que a ferramenta faz: Ela adiciona `\Data\modules` ao `dataPath` que você configurou.
    
- O resultado: A ferramenta procura por `C:\Users\Yanbd\foundry-data\v12-dev\Data` + `\Data\modules`, criando o caminho inválido.
    

A regra é: O `dataPath` que você configura na ferramenta deve ser a pasta **que contém** a pasta `Data`, e não a própria pasta `Data`.

### A Solução: Corrigir a Configuração do `dataPath`

Você precisa reconfigurar a ferramenta para apontar um nível acima.

1. **Execute o seguinte comando no seu terminal.** Pode ser de qualquer pasta, pois é um comando de configuração global.
    
    PowerShell
    
    ```
    fvtt configure set dataPath "C:\Users\Yanbd\foundry-data\v12-dev"
    ```
    
    _(Note que removemos o `\Data` do final do caminho)_
    
2. **Verifique a Configuração**: Rode `fvtt configure` para confirmar que o `dataPath` foi atualizado para o novo caminho, sem o `\Data` no final.
    
3. **Tente Novamente o Processo de Desempacotar**:
    
    - Navegue de volta para a pasta do módulo:
        
        PowerShell
        
        ```
        cd "C:\Users\Yanbd\foundry-data\v12-dev\Data\modules\dmdave-haunted-castle"
        ```
        
    - Agora, execute novamente a sequência de comandos que tentamos antes:
        
        PowerShell
        
        ```
        # 1. Defina o pacote de trabalho
        fvtt package workon dmdave-haunted-castle
        
        # 2. Desempacote o compêndio
        fvtt package unpack actors --outputDirectory "C:\MeuProjetoFoundry\json_source\dmdave-haunted-castle\actors"
        ```
        

Com essa correção na configuração, a ferramenta encontrará o caminho `...\v12-dev\Data\modules` corretamente e os comandos funcionarão como esperado.


Com certeza! Agora que o processo funciona para um módulo, automatizá-lo para os 17 é o passo lógico e vai poupar um tempo imenso.

Vou fornecer um script em **PowerShell** (que é o terminal que você está usando) para automatizar todo o processo de desempacotamento.

### Script PowerShell para Desempacotar Módulos em Lote

Este script irá:

1. Ler a lista de 17 módulos que você quer processar.
    
2. Para cada módulo, ele irá navegar até a pasta correta.
    
3. Executará o comando `fvtt package workon`.
    
4. Executará os comandos `fvtt package unpack` para os compêndios `actors`, `scenes`, `items`, e `journal`, se eles existirem.
    
5. Organizará todos os arquivos JSON de saída na sua pasta `C:\MeuProjetoFoundry\json_source\`.
    

#### Passo 1: Crie o Arquivo do Script

1. Em um local de sua preferência (como `C:\MeuProjetoFoundry\`), crie um novo arquivo de texto.
    
2. Nomeie o arquivo como `DesempacotarTudo.ps1`. **Atenção:** a extensão do arquivo deve ser `.ps1`.
    

#### Passo 2: Cole o Código no Arquivo

Abra o arquivo `DesempacotarTudo.ps1` com um editor de texto (como VS Code ou Bloco de Notas) e cole o seguinte código:

PowerShell

```
# --- CONFIGURAÇÃO ---
# Caminho para a pasta de módulos da sua instância v12
$modulesPath = "C:\Users\Yanbd\foundry-data\v12-dev\Data\modules"

# Caminho para onde os arquivos JSON serão salvos
$outputPath = "C:\MeuProjetoFoundry\json_source"

# Lista dos IDs dos módulos que você quer processar
$moduleList = @(
    "dmdave-haunted-castle",
    "dmdave-heroes-feast",
    "dmdave-hill-folk-and-phase-spider-mine",
    "dmdave-lich-tower",
    "dmdave-mimic-museum",
    "dmdave-minotaur-maze",
    "dmdave-ninja-clan-hold",
    "dmdave-owlbear-wood",
    "dmdave-revenant-ghost-ship",
    "dmdave-rust-monster-mine",
    "dmdave-salamander-forge",
    "dmdave-shadow-hotel",
    "dmdave-sphinx-pyramid",
    "dmdave-treant-grove",
    "dmdave-troll-bridge",
    "dmdave-unicorn-island",
    "dmdave-vampire-church"
)

# Lista dos compêndios que tentaremos desempacotar
$compendiumTypes = @("actors", "scenes", "items", "journal")
# --- FIM DA CONFIGURAÇÃO ---


# Itera sobre cada módulo na lista
foreach ($moduleId in $moduleList) {
    Write-Host "----------------------------------------------------" -ForegroundColor Cyan
    Write-Host "Processando Módulo: $moduleId" -ForegroundColor Cyan
    Write-Host "----------------------------------------------------"

    $currentModulePath = Join-Path $modulesPath $moduleId

    # Verifica se a pasta do módulo existe
    if (-not (Test-Path $currentModulePath -PathType Container)) {
        Write-Host "AVISO: Pasta do módulo '$moduleId' não encontrada. Pulando." -ForegroundColor Yellow
        continue
    }

    # Navega para a pasta do módulo
    Push-Location $currentModulePath

    # Define o pacote de trabalho
    Write-Host "Definindo o pacote de trabalho para '$moduleId'..."
    fvtt package workon $moduleId

    # Itera sobre os tipos de compêndio
    foreach ($compendium in $compendiumTypes) {
        # Verifica se o compêndio existe no módulo antes de tentar desempacotar
        if (Test-Path (Join-Path $currentModulePath "packs/$compendium")) {
            Write-Host " -> Desempacotando compêndio '$compendium'..." -ForegroundColor Green
            $outputDir = Join-Path $outputPath "$moduleId\$compendium"
            
            # Cria o diretório de saída se ele não existir
            if (-not (Test-Path $outputDir)) {
                New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
            }

            # Executa o comando para desempacotar
            fvtt package unpack $compendium --outputDirectory $outputDir
        } else {
            Write-Host " -> Compêndio '$compendium' não encontrado em '$moduleId'. Pulando." -ForegroundColor Gray
        }
    }

    # Retorna ao diretório original
    Pop-Location
}

Write-Host "----------------------------------------------------" -ForegroundColor Cyan
Write-Host "Processo de desempacotamento concluído para todos os módulos!" -ForegroundColor Cyan
Write-Host "----------------------------------------------------"
```

#### Passo 3: Execute o Script

1. **Abra o PowerShell como Administrador**. Isso é importante para garantir que você possa alterar a política de execução, se necessário.
    
2. **Permita a Execução de Scripts**: Por padrão, o PowerShell pode bloquear a execução de scripts locais. Execute o seguinte comando para permitir a execução apenas para esta sessão:
    
    PowerShell
    
    ```
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    ```
    
3. **Navegue até a pasta** onde você salvou o script:
    
    PowerShell
    
    ```
    cd C:\MeuProjetoFoundry\
    ```
    
4. **Execute o script**:
    
    PowerShell
    
    ```
    .\DesempacotarTudo.ps1
    ```
    

O script começará a ser executado, mostrando o progresso para cada um dos 17 módulos. Ao final, você terá toda a estrutura de pastas e arquivos JSON dentro de `C:\MeuProjetoFoundry\json_source\`, perfeitamente organizada e pronta para a próxima fase do seu plano: a refatoração dos caminhos dos assets.