#         Guia Definitivo para Gerenciar Buckets Cloudflare R2 com rclone

Este guia consolida o aprendizado de um processo real de troubleshooting para configurar e usar a ferramenta de linha de comando `rclone` para gerenciar de forma massiva os arquivos (assets) em um bucket do Cloudflare R2.

### **Por que usar `rclone` com R2?**

O Cloudflare R2 foi projetado para ser compatível com a API S3 da Amazon, o padrão do mercado para armazenamento de objetos. O `rclone` é uma ferramenta universal que "fala" a linguagem S3 fluentemente. Usá-lo permite automatizar tarefas complexas como autenticação, upload e exclusão de milhares de arquivos, algo que seria impraticável pelo painel web.

## **Passo 1: Geração das Credenciais Corretas na Cloudflare**

O sucesso de qualquer operação depende das permissões do seu token de API.

1. **Navegue até o R2:** No painel da Cloudflare, vá para a seção **R2**.
    
2. **Crie um Token de API:** Clique em **Manage R2 API Tokens** e depois em **Create API Token**.
    
3. **Conceda Permissões de Administrador:** Para operações complexas como `purge` (limpar), que precisam verificar configurações do bucket, é essencial dar permissões de **"Administrator Read & Write"**. Tokens com permissões menores (como "Object Read & Write") podem resultar em erros de `Access Denied`.
    
4. **Copie Suas Credenciais:** Guarde em um local seguro o seu:
    
    - `Account ID` (encontrado na página principal do R2, na coluna direita).
        
    - `Access Key ID` (gerado com o token).
        
    - `Secret Access Key` (gerado com o token - só é mostrado uma vez).
        

> **A Regra de Ouro da Segurança:** NUNCA compartilhe sua `Secret Access Key`. Após concluir grandes operações de manutenção (como apagar e reenviar tudo), é uma boa prática de segurança apagar este token de administrador e criar um novo com permissões mais restritas para o uso diário.

## **Passo 2: Configuração do `rclone` (O Método à Prova de Falhas)**

A configuração interativa pode levar a erros. Editar o arquivo de configuração manualmente é o método mais garantido.

1. **Localize o Arquivo `rclone.conf`:**
    
    - No menu Iniciar do Windows, digite `%appdata%\rclone` e pressione Enter para abrir a pasta.
        
    - Abra o arquivo `rclone.conf` com um editor de texto.
        
2. Cole a Configuração Modelo:
    
    Apague todo o conteúdo do arquivo e cole o modelo abaixo, substituindo os valores pelos seus.
    
    ```
    [nome_do_seu_remote]
    type = s3
    provider = Cloudflare
    access_key_id = SEU_ACCESS_KEY_ID
    secret_access_key = SUA_SECRET_ACCESS_KEY
    endpoint = https://SEU_ACCOUNT_ID.r2.cloudflarestorage.com
    ```
    
    **Exemplo prático da nossa conversa:**
    
    ```
    [cloudflare_r2]
    type = s3
    provider = Cloudflare
    access_key_id = 8aefcbda947d41ee4f9d4e10d13e22e7
    secret_access_key = f091d5b52029e9cabc2c9e86c3554200e7fd8a7458a633c53338b77c84337edc
    endpoint = https://d3b9d419627ff086331fdc4847bd8644.r2.cloudflarestorage.com
    ```
    
3. **Salve e Feche o Arquivo.** Sua configuração está pronta.
    

## **Passo 3: Operações Essenciais (Apagar e Enviar)**

Com a configuração correta, os comandos se tornam simples. Abra o PowerShell na pasta onde o `rclone.exe` está.

#### **A. Verificando a Conexão (Teste Seguro)**

Antes de qualquer ação destrutiva, confirme que a conexão funciona.

- **Listar buckets:**
    
    ```
    .\rclone.exe lsd nome_do_seu_remote:
    ```
    
    _Exemplo:_ `.\rclone.exe lsd cloudflare_r2:`
    
- **Ver o tamanho de um bucket:**
    
    ```
    .\rclone.exe size nome_do_seu_remote:nome-do-bucket/
    ```
    
    _Exemplo:_ `.\rclone.exe size cloudflare_r2:yan-vtt-assets/`
    

#### **B. Apagando Todo o Conteúdo de um Bucket (Purge)**

1. Simulação (Passo OBRIGATÓRIO de Segurança):
    
    Use a flag --dry-run para ver o que seria apagado, sem apagar nada.
    
    ```
    .\rclone.exe purge nome_do_seu_remote:nome-do-bucket/ --dry-run
    ```
    
    _Exemplo:_ `.\rclone.exe purge cloudflare_r2:yan-vtt-assets/ --dry-run`
    
2. Execução Definitiva (Ação IRREVERSÍVEL):
    
    Se a simulação estiver correta, remova a flag --dry-run para executar a limpeza.
    
    ```
    .\rclone.exe purge nome_do_seu_remote:nome-do-bucket/
    ```
    
    _Exemplo:_ `.\rclone.exe purge cloudflare_r2:yan-vtt-assets/`
    

#### **C. Enviando uma Pasta Inteira (Copy)**

Para fazer o upload de uma pasta local para o bucket.

```
.\rclone.exe copy "C:\Caminho\Para\Sua\Pasta\Local" nome_do_seu_remote:nome-do-bucket/ -P
```

- A flag `-P` mostra uma barra de progresso em tempo real.
    
- _Exemplo:_ `.\rclone.exe copy "C:\MeuProjetoFoundry\assets" cloudflare_r2:yan-vtt-assets/ -P`
    

## **Resumo dos Erros que Resolvemos (Troubleshooting)**

- **Erro:** O `rclone config` pede por `upstreams>`.
    
    - **Causa:** Seleção incorreta do tipo de armazenamento (`Combine` em vez de `S3`).
        
    - **Solução:** Reiniciar a configuração e escolher a opção correta (`S3`, depois `Cloudflare R2`) ou editar o `rclone.conf` manualmente.
        
- **Erro:** `NoSuchBucket: The specified bucket does not exist` (mesmo o bucket existindo).
    
    - **Causa:** O `Account ID` no `endpoint` do arquivo `rclone.conf` estava incorreto.
        
    - **Solução:** Corrigir o `Account ID` na URL do `endpoint` para corresponder ao da sua conta Cloudflare.
        
- **Erro:** `AccessDenied: Access Denied` ao tentar apagar.
    
    - **Causa:** O Token de API não tinha permissão para operações administrativas (como verificar o versionamento do bucket).
        
    - **Solução:** Criar um novo Token de API com permissões de **"Administrator Read & Write"**.
        
- **Problema:** O comando fica "travado" sem dar resposta.
    
    - **Causa:** Impasse na comunicação com a API ou um erro silencioso.
        
    - **Solução:** Usar a flag `-vv` para ativar o modo de depuração (`purge ... -vv`) e ver exatamente em qual etapa o processo está falhando.