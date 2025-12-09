# 🧭 GitLab Runner — Guia Completo (Oracle Cloud + Docker + Cloudflare)

> **Ambiente:** Ubuntu 22.04 (Oracle Cloud Free Tier, ARM64)  
> **Objetivo:** Rodar pipelines do GitLab.com localmente e fazer deploy automático para `/var/www/<app>`, servido via Nginx Proxy Manager + Cloudflare.

---

## 🧩 Estrutura Geral

|Componente|Função|Localização|
|---|---|---|
|**GitLab SaaS**|Hospeda os repositórios e pipelines|`https://gitlab.com/YBraga35/...`|
|**Runner Docker**|Executa builds e deploys localmente|Container `gitlab-runner`|
|**Nginx Proxy Manager (NPM)**|Gerencia domínios e HTTPS|Container `npm`|
|**/var/www/**|Diretório dos sites e apps publicados|`/var/www/<app>`|
|**Cloudflare**|Proxy DNS + HTTPS via Zero Trust|`https://dash.cloudflare.com/`|

---

## ⚙️ Setup Inicial — Passo a Passo

### 🟣 1. Criar o repositório no GitLab

1. Vá para [https://gitlab.com/projects/new](https://gitlab.com/projects/new)
    
2. Escolha **Criar projeto em branco**
    
3. Configure:
    
    - **Nome:** `home-finance-tracker`
        
    - **Visibilidade:** `Privado`
        
    - ☑️ **Inicializar repositório com README**
        
4. Clique em **Criar projeto**
    

---

### 🟢 2. Criar o Runner no GitLab

1. Dentro do projeto → **Settings → CI/CD → Runners → Expand**
    
2. Clique em **New Project Runner**
    
3. Preencha:
    
    - **Tags:** `build,deploy,oracle`
        
    - ☑️ **Lock to current project**
        
    - (Deixe “Protected” desmarcado se não usa branches protegidas)
        
4. Clique em **Create Runner**
    
5. Copie o **token** gerado (exemplo: `glrt-xxxxxxx`)
    

---

### 🔵 3. Instalar e Registrar o Runner na VM

```bash
sudo mkdir -p /srv/gitlab-runner/config
sudo mkdir -p /var/www
sudo docker run -d --name gitlab-runner --restart always \
  -v /srv/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /var/www:/var/www \
  gitlab/gitlab-runner:latest
```

Registrar o runner:

```bash
sudo docker run --rm -it \
  -v /srv/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest register
```

Responda conforme:

```
URL: https://gitlab.com/
Token: (cole o token do projeto)
Description: oracle-runner-docker
Tags: build,deploy,oracle
Executor: docker
Default image: node:20-alpine
```

---

### ⚙️ 4. Editar o `config.toml`

```bash
sudo nano /srv/gitlab-runner/config/config.toml
```

Garanta o seguinte conteúdo:

```toml
concurrent = 1
[[runners]]
  [runners.docker]
    privileged = false
    volumes = ["/var/www:/var/www", "/cache"]
```

Reinicie o runner:

```bash
sudo docker restart gitlab-runner
```

---

### 🧱 5. Criar o `.gitlab-ci.yml` no projeto

```yaml
stages: [build, deploy]
variables:
  NODE_ENV: production

build:
  stage: build
  image: node:20-alpine
  tags: [build, oracle]
  script:
    - apk add --no-cache git
    - npm ci
    - npm run build
    - npm run export || true
  artifacts:
    paths: [out, dist]
    expire_in: 1 week
  only: [main]

deploy:
  stage: deploy
  image: alpine:3.20
  tags: [deploy, oracle]
  dependencies: [build]
  script:
    - apk add --no-cache rsync
    - mkdir -p /var/www/homefinance
    - if [ -d "./out" ]; then SRC="./out/"; elif [ -d "./dist" ]; then SRC="./dist/"; else SRC="./"; fi
    - rsync -avz --delete "$SRC" /var/www/homefinance/
  only: [main]
```

💡 **Fluxo:**  
Ao fazer `git push` na branch `main`, o pipeline do GitLab executa o build → copia o resultado para `/var/www/homefinance`.

---

## 🌐 Servindo com Nginx Proxy Manager (NPM)

### Criar rede e subir container do site:

```bash
sudo docker network create web || true
sudo docker network connect web npm

sudo docker run -d --name web-homefinance \
  --network web \
  -v /var/www/homefinance:/usr/share/nginx/html:ro \
  nginx:alpine
```

### Configurar no painel do NPM:

- **Add Proxy Host**
    
    - **Domain Names:** `homefinance.yanbraga.com`
        
    - **Forward Hostname/IP:** `web-homefinance`
        
    - **Forward Port:** `80`
        
    - ☑️ **Cache Assets**
        
    - ☑️ **Block Common Exploits**
        
- **SSL:** via Cloudflare ou Let’s Encrypt
    

---

## 🔁 Manutenção e Atualizações

|Ação|Comando / Local|
|---|---|
|🔍 Ver logs do runner|`sudo docker logs -f gitlab-runner`|
|🔄 Reiniciar runner|`sudo docker restart gitlab-runner`|
|⬆️ Atualizar runner|`sudo docker pull gitlab/gitlab-runner:latest && sudo docker restart gitlab-runner`|
|🧹 Limpar cache|`sudo gitlab-runner cache-clean`|
|🧾 Ver jobs ativos|GitLab → CI/CD → Pipelines|
|🔐 Corrigir permissões|`sudo chown -R 1000:1000 /var/www`|
|🧱 Estrutura runner|`/srv/gitlab-runner/config/config.toml`|

---

## ➕ Adicionando Novos Projetos

1. Crie um novo repositório no GitLab (como antes).
    
2. Em **Settings → CI/CD → Runners**, ative o mesmo runner local.
    
3. Crie um `.gitlab-ci.yml` parecido, alterando o destino:
    
    ```yaml
    - rsync -avz --delete ./out/ /var/www/novosite/
    ```
    
4. Suba o container web:
    
    ```bash
    sudo docker run -d --name web-novosite \
      --network web \
      -v /var/www/novosite:/usr/share/nginx/html:ro \
      nginx:alpine
    ```
    
5. Adicione o novo domínio no NPM:  
    `novosite.yanbraga.com`
    

---

## 🔒 Segurança e Backups

- 🔑 Use autenticação SSH (sem senha).
    
- 📦 Faça **snapshot** da VM antes de atualizar.
    
- ☁️ Mantenha backups de `/srv/gitlab-runner/config` e `/var/www`.
    
- 🚫 Evite expor portas 80/443 se usar Cloudflare Tunnel.
    
- 🧱 Atualize sempre o runner e o NPM.
    

---

## 📘 Estrutura Final

```
/srv/gitlab-runner/
 ├─ config/config.toml
/var/www/
 ├─ homefinance/
 ├─ novoapp/
/docker/
 ├─ gitlab-runner
 ├─ npm
 ├─ web-homefinance
```

---

## ✅ Resultado Final

- 🚀 Push no GitLab →
    
- 🔁 Pipeline roda →
    
- 🧱 Runner Docker local executa →
    
- 📂 App publicado em `/var/www/<app>` →
    
- 🌐 Servido pelo Nginx Proxy Manager →
    
- ☁️ Domínio via Cloudflare HTTPS
    

---
