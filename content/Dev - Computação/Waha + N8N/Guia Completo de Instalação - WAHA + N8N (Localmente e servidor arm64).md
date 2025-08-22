## Guia Completo de Instalação: WAHA + N8N

Data: 20 de Agosto de 2025

Autor: Yan Braga (com assistência de Gemini IA)

Este documento serve como um guia completo para instalar e configurar o **WAHA (WhatsApp HTTP API)** integrado ao **N8N**. Ele cobre dois cenários principais: uma instalação local para desenvolvimento/testes usando Docker Desktop e uma instalação em um servidor de produção em uma VM Oracle Cloud com arquitetura ARM64.

### 1. Referências e Links Úteis

- **Vídeo Original (Fonte da Ideia):** [Agente de IA no WhatsApp 100% Grátis (N8N + WAHA + Google Gemini) - por Guilherme Laz](https://youtu.be/KkKlfAb3TSI "null")
    
- **Documentação Oficial do WAHA:** [WAHA Installation Guide](https://waha.devlike.pro/docs/how-to/install/ "null")
    
- **Docker Hub - Imagens Oficiais:**
    
    - [PostgreSQL](https://hub.docker.com/_/postgres "null")
        
    - [Redis](https://hub.docker.com/_/redis "null")
        
    - [WAHA (ARM)](https://hub.docker.com/r/devlikeapro/waha/tags?page=1&name=arm "null")
        

### 2. Guia Definitivo de Instalação e Manutenção: N8N + WAHA

Data: 22 de Agosto de 2025

Autor: Yan Braga (com assistência e troubleshooting de Gemini IA)

## Resumo

Este documento é a versão consolidada e definitiva para instalar, configurar e manter o **N8N** e o **WAHA (WhatsApp HTTP API)**. O foco principal é a implantação em um servidor de produção (especificamente uma **VM Oracle Cloud, ARM64**), utilizando **Docker Compose** como o método exclusivo de gerenciamento para garantir estabilidade e manutenibilidade.

## 1. Cenários de Uso

Este guia cobre dois cenários distintos. Escolha o que melhor se adapta à sua necessidade:

- **Servidor de Produção (VM ARM64):** O método recomendado e detalhado aqui. Ideal para um ambiente online, estável e seguro. Os serviços (N8N e WAHA) são gerenciados em pastas e arquivos `docker-compose.yml` separados para maior organização e clareza.
    
- **Ambiente Local (Desenvolvimento/Testes):** Uma abordagem simplificada para rodar tudo em sua máquina pessoal (Windows, macOS) usando Docker Desktop. Útil para testes rápidos e desenvolvimento de workflows.
    

## 2. Instalação em Servidor de Produção (VM Oracle ARM64)

Este é o passo a passo para uma instalação limpa e correta em um ambiente de produção.

### Passo 1: Preparar o Ambiente do Servidor

Primeiro, vamos criar a estrutura de pastas, o volume de dados e a rede que permitirá a comunicação entre os contêineres.

1. **Acesse o servidor via SSH.**
    
2. **Crie uma rede Docker compartilhada:**
    
    ```
    docker network create n8n_waha_network
    ```
    
3. **Crie um volume persistente para os dados do N8N:**
    
    ```
    docker volume create n8n_data
    ```
    
4. **Crie uma pasta dedicada para a configuração do N8N:**
    
    ```
    mkdir -p /home/ubuntu/n8n
    cd /home/ubuntu/n8n
    ```
    

### Passo 2: Configurar e Iniciar o N8N

Com o ambiente pronto, vamos configurar e rodar o N8N.

1. **Crie o arquivo `docker-compose.yml` para o N8N:**
    
    ```
    # /home/ubuntu/n8n/docker-compose.yml
    
    services:
      n8n:
        image: docker.n8n.io/n8nio/n8n:latest
        container_name: n8n_service
        restart: always
        ports:
          # A porta fica acessível apenas localmente por segurança.
          # Use um proxy reverso (Nginx Proxy Manager) para expor para a web.
          - "127.0.0.1:5678:5678"
        environment:
          - GENERIC_TIMEZONE=America/Sao_Paulo
          # Substitua pelo seu domínio/IP real
          - N8N_HOST=n8n.seudominio.com
          - N8N_PROTOCOL=https
          - WEBHOOK_URL=https://n8n.seudominio.com/
        volumes:
          - n8n_data:/home/node/.n8n
    
    volumes:
      n8n_data:
        external: true
    
    networks:
      default:
        name: n8n_waha_network
    ```
    
    **Atenção:** Altere `n8n.seudominio.com` para o seu domínio real.
    
2. Inicie o N8N:
    
    Dentro da pasta /home/ubuntu/n8n/, execute:
    
    ```
    docker-compose up -d
    ```
    

### Passo 3: Configurar e Iniciar o WAHA

Agora, vamos configurar o WAHA em sua própria pasta, garantindo que ele se conecte à mesma rede do N8N.

1. **Crie uma pasta dedicada para o WAHA:**
    
    ```
    mkdir -p /home/ubuntu/waha
    cd /home/ubuntu/waha
    ```
    
2. Crie o arquivo docker-compose.yml para o WAHA:
    
    Este arquivo já está otimizado para a arquitetura ARM64.
    
    ```
    # /home/ubuntu/waha/docker-compose.yml
    
    services:
      redis:
        image: arm64v8/redis:latest
        container_name: redis_waha
        restart: unless-stopped
        volumes:
          - redis_data:/data
    
      postgres:
        image: arm64v8/postgres:latest
        container_name: postgres_waha
        environment:
          POSTGRES_USER: default
          POSTGRES_PASSWORD: default
          POSTGRES_DB: default
        restart: unless-stopped
        volumes:
          - pg_data:/var/lib/postgresql/data
    
      waha:
        image: devlikeapro/waha:latest
        container_name: waha_service
        ports:
          - "3000:3000"
        environment:
          WAHA_PLUS_ENABLE: 'true'
        restart: unless-stopped
        volumes:
          - waha_sessions:/app/.sessions
        depends_on:
          - redis
    
    volumes:
      pg_data:
      redis_data:
      waha_sessions:
    
    networks:
      default:
        external:
          name: n8n_waha_network
    ```
    
3. Inicie o WAHA:
    
    Dentro da pasta /home/ubuntu/waha/, execute:
    
    ```
    docker-compose up -d
    ```
    
    Seus serviços N8N e WAHA estão no ar, em produção e aptos a se comunicarem.
    

## 3. Guia Rápido de Manutenção

### Atualizando o N8N

Para manter sua instância do N8N atualizada, siga estes passos simples:

1. **Acesse o servidor via SSH.**
    
2. **Navegue até a pasta de configuração do N8N:**
    
    ```
    cd /home/ubuntu/n8n
    ```
    
3. **Baixe a imagem mais recente:**
    
    ```
    docker-compose pull
    ```
    
4. Reinicie o serviço para aplicar a atualização:
    
    O Docker Compose irá recriar o contêiner com a nova imagem, preservando seus dados.
    
    ```
    docker-compose up -d
    ```
    
5. **Verificação:** Acesse a interface web do N8N e limpe o cache do navegador (Ctrl+Shift+R ou Cmd+Shift+R) para ver a nova versão no canto inferior esquerdo.
    

## 4. Diagnóstico e Boas Práticas (Troubleshooting)

Esta seção resume os aprendizados críticos obtidos durante a configuração.

### Principais Problemas Resolvidos

1. **Conflito de Gerenciamento (systemd vs. docker-compose):**
    
    - **Problema:** Um serviço de sistema (`n8n.service`) tentava gerenciar o mesmo contêiner que o `docker-compose`, causando reinicializações inesperadas e falhas de atualização.
        
    - **Solução Definitiva:** Desativar completamente o serviço `systemd` (`sudo systemctl disable --now n8n.service`) e usar **exclusivamente o Docker Compose** para todo o ciclo de vida do contêiner.
        
2. **Comandos de Inicialização Incorretos (`entrypoint`/`command`):**
    
    - **Problema:** Linhas `entrypoint` e `command` no `docker-compose.yml` sobrescreviam o script de inicialização padrão da imagem, causando um loop de reinicialização (crash loop) com versões mais recentes do N8N.
        
    - **Solução Definitiva:** Remover essas linhas e confiar no script padrão da imagem, que garante maior compatibilidade.
        
3. **Incompatibilidade de Arquitetura (ARM64 vs. AMD64):**
    
    - **Problema:** O Docker tentava executar imagens padrão (AMD64) em uma VM ARM64, resultando em `exec format error`.
        
    - **Solução Definitiva:** Especificar imagens compatíveis com ARM64 nos arquivos `docker-compose.yml` (ex: `arm64v8/redis`, `arm64v8/postgres`).
        

### Boas Práticas Essenciais

- **Gerenciamento Centralizado:** Use **uma única ferramenta** (neste caso, Docker Compose) para gerenciar seus contêineres.
    
- **Simplicidade é Chave:** Mantenha seus arquivos `docker-compose.yml` limpos e simples. Evite sobrescrever `entrypoint` ou `command` a menos que seja estritamente necessário.
    
- **Logs são Seus Amigos:** O comando `docker logs <nome_do_container>` é a sua ferramenta mais valiosa para entender por que um contêiner não está iniciando.
    

## 5. Anexo: Instalação em Ambiente Local (Docker Desktop)

Para testes e desenvolvimento em sua máquina local.

1. **Crie uma pasta** para o projeto (ex: `n8n-waha-local`).
    
2. **Crie um único arquivo `docker-compose.yml`** com o conteúdo abaixo:
    
    ```
    # docker-compose.yml para ambiente local (Docker Desktop)
    services:
      n8n:
        image: n8nio/n8n:latest
        container_name: n8n_local
        restart: unless-stopped
        ports:
          - "5678:5678"
        volumes:
          - n8n_data:/home/node/.n8n
    
      redis:
        image: redis:latest
        container_name: redis_local
        restart: unless-stopped
        volumes:
          - redis_data:/data
    
      postgres:
        image: postgres:latest
        container_name: postgres_local
        environment:
          POSTGRES_USER: default
          POSTGRES_PASSWORD: default
          POSTGRES_DB: default
        restart: unless-stopped
        volumes:
          - pg_data:/var/lib/postgresql/data
    
      waha:
        image: devlikeapro/waha:latest
        container_name: waha_local
        ports:
          - "3000:3000"
        environment:
          WAHA_PLUS_ENABLE: 'true'
        restart: unless-stopped
        volumes:
          - waha_sessions:/app/.sessions
        depends_on:
          - redis
    
    volumes:
      n8n_data:
      pg_data:
      redis_data:
      waha_sessions:
    ```
    
3. **Inicie os serviços:**
    
    ```
    docker-compose up -d
    ```
    
4. **Acesse:**
    
    - **N8N:** `http://localhost:5678`
        
    - **WAHA:** `http://localhost:3000`