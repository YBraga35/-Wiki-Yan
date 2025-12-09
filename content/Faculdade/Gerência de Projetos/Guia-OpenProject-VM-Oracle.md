# Guia de Instalação e Operação — OpenProject na VM Oracle (Ubuntu 22.04 ARM)

Este guia documenta, de ponta a ponta, a configuração realizada na sua VM Oracle (Ubuntu 22.04 aarch64) para rodar o OpenProject via Docker, incluindo atualização do sistema, ajustes no Docker, limpeza, deploy com Docker Compose, publicação via Cloudflare Zero Trust, e resolução de problemas observados.

## Contexto do Ambiente
- SO: Ubuntu 22.04.5 LTS (Jammy)
- Kernel: 6.8.0-1038-oracle (após update; requer reboot para aplicar — já feito)
- Arquitetura: aarch64 (ARM64)
- CPU/RAM: 4 vCPU, ~23.4 GiB RAM
- Docker Engine: 28.5.1, Compose plugin: v2.40.x
- Usuário: `ubuntu` no grupo `docker`

Links úteis:
- Ubuntu LTS: https://ubuntu.com/download/server
- Docker Engine (Ubuntu): https://docs.docker.com/engine/install/ubuntu/
- Docker Compose V2: https://docs.docker.com/compose/
- OpenProject (Docker): https://www.openproject.org/docs/installation-and-operations/installation/docker/
- Cloudflare Zero Trust Tunnels: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/

---

## Passo 1 — Atualizar o Sistema
1) Atualize e resolva upgrades. Houve um problema momentâneo no mirror do Syncthing; colocamos em hold para concluir o restante.

```bash
sudo apt update
sudo apt -y upgrade
```

#### Se algum pacote quebrar o update (ex.: syncthing), segure e continue:

```bash
sudo apt-mark hold syncthing
sudo apt update && sudo apt -y upgrade
sudo apt-mark unhold syncthing

# Limpeza pós-upgrade
sudo apt -y autoremove && sudo apt autoclean

# Reboot para aplicar kernel novo
sudo reboot
```

---

## Passo 2 — Verificar/Preparar Docker
Verifique o serviço, versão e permissões:

```bash
# Serviço
sudo systemctl is-enabled docker
sudo systemctl is-active docker
sudo systemctl status docker -n 30 --no-pager

# Versão e info
docker --version
docker compose version
docker info

# (Opcional) adicionar usuário ao grupo docker
sudo usermod -aG docker $USER
```

---

## Passo 3 — Ajustes no Docker (DNS e Logs)
Foram observados erros recorrentes de DNS no `dockerd` usando `127.0.0.53`. Padronizamos DNS e limitamos logs para evitar crescimento excessivo.

Arquivo: `/etc/docker/daemon.json`

```json
{
  "dns": ["1.1.1.1", "8.8.8.8"],
  "log-driver": "local",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

Aplique e reinicie o Docker:

```bash
sudo mkdir -p /etc/docker
# Faça backup se já existir
[ -f /etc/docker/daemon.json ] && sudo cp /etc/docker/daemon.json /etc/docker/daemon.json.bak
# Edite com o conteúdo acima e depois:
sudo systemctl restart docker
```

Validação:
```bash
sudo systemctl is-active docker
docker info | sed -n '1,80p'
```

---

## Passo 4 — Limpeza de Containers/Imagens
Remoção do container parado do n8n e limpeza de imagens não utilizadas:

```bash
# Remover container em estado "Created"
docker rm -f n8n_container || true

# Limpar imagens não usadas (cuidado: remove imagens não referenciadas)
docker image prune -a -f
```

Resultado: ~5.35 GB liberados.

---

## Passo 5 — Deploy do OpenProject com Docker Compose
Estrutura criada em `~/openproject/docker-compose.yml`. Usamos a imagem `openproject/community:13` (tags `latest` e `14` não estavam disponíveis para ARM64 no momento do pull).

Conteúdo do `~/openproject/docker-compose.yml`:

```yaml
services:
  db:
    image: postgres:13
    environment:
      POSTGRES_USER: openproject
      POSTGRES_PASSWORD: openproject
      POSTGRES_DB: openproject
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: unless-stopped
    logging:
      driver: local
      options:
        max-size: "10m"
        max-file: "3"

  memcached:
    image: memcached:1.6-alpine
    restart: unless-stopped
    logging:
      driver: local
      options:
        max-size: "10m"
        max-file: "3"

  openproject:
    image: openproject/community:13
    depends_on:
      - db
      - memcached
    ports:
      - "8090:80"
    environment:
      DATABASE_URL: postgres://openproject:openproject@db:5432/openproject
      MEMCACHE_SERVERS: memcached:11211
    volumes:
      - opdata:/var/lib/openproject
    restart: unless-stopped
    logging:
      driver: local
      options:
        max-size: "10m"
        max-file: "3"

volumes:
  pgdata:
  opdata:
```

Subida dos serviços:

```bash
cd ~/openproject
docker compose pull
docker compose up -d
```

Validação local:

```bash
# Containers e portas
docker ps -a | grep openproject

# HTTP local (espera 301 -> redireciona para https)
curl -I http://127.0.0.1:8090
```

Acesso direto (sem proxy):
- http://SEU_IP_PUBLICO:8090

---

## Passo 6 — Publicação via Cloudflare Zero Trust
Você já possui o token instalado e o serviço `cloudflared` rodando. O erro 502 observado ocorreu porque o origin foi configurado como `https://localhost:8090`, mas o OpenProject atende HTTP na 8090 (TLS é do Cloudflare).

Solução: aponte o serviço para `http://localhost:8090`.

Pelo painel (recomendado, usando o Tunnel com token):
1) Cloudflare Zero Trust > Tunnels > selecione seu túnel.
2) Public Hostnames > edite o hostname do OpenProject (ex.: `open-project.seu-dominio`).
3) Em Service, defina: `http://localhost:8090` (sem "s").
4) Salve. O `cloudflared` aplica a nova rota.

Validação de logs:
```bash
sudo systemctl status cloudflared -n 100 --no-pager
journalctl -u cloudflared -n 100 --no-pager
```

Config local (opcional, se preferir gerenciar por arquivo): `/etc/cloudflared/config.yml`

Exemplo (mantendo seus hosts já existentes):
```yaml
tunnel: <ID-DO-SEU-TUNNEL>
credentials-file: /etc/cloudflared/<ID-DO-SEU-TUNNEL>.json

ingress:
  - hostname: foundry.seu-dominio
    service: http://localhost:30000
  - hostname: 5etools.seu-dominio
    service: http://localhost:5000
  - hostname: openproject.seu-dominio
    service: http://localhost:8090
  - service: http_status:404
```

Unit do serviço (se usar config local): ajuste o `cloudflared.service` para usar `--config /etc/cloudflared/config.yml` em vez de `--token` e reinicie:
```bash
sudo systemctl daemon-reload
sudo systemctl restart cloudflared
sudo systemctl status cloudflared -n 50 --no-pager
```

---

## Segurança e Rede
- UFW (opcional):
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80,443/tcp
sudo ufw allow 8090/tcp   # apenas se expor diretamente sem Cloudflare/NPM
sudo ufw enable
sudo ufw status verbose
```
- Oracle Cloud — Security Lists/Groups: alinhe as portas com UFW e serviços publicados (ideal: expor apenas 80/443 via proxy, mantendo orígens como `localhost`).
- Reverse Proxy (alternativa ao Zero Trust): você já tem Nginx Proxy Manager (8081/8181) — pode publicar o OpenProject por lá com TLS.

---

## Manutenção e Boas Práticas
- Updates automáticos: `sudo apt install -y unattended-upgrades && sudo dpkg-reconfigure -plow unattended-upgrades`
- Logs do sistema: `sudo journalctl --vacuum-time=14d`
- Docker logs já limitados no daemon; adicionalmente, configure limites por serviço quando necessário.
- Recursos e desempenho:
  - Memória/CPU: `htop`, `free -h`, `vmstat 1 5`
  - Disco: `df -h`, `lsblk -f`
  - I/O (instale `sysstat`): `iostat -xz 1 3`
- Rede e TCP (opcional): habilitar BBR
```bash
echo 'net.core.default_qdisc=fq' | sudo tee /etc/sysctl.d/99-bbr.conf
echo 'net.ipv4.tcp_congestion_control=bbr' | sudo tee -a /etc/sysctl.d/99-bbr.conf
sudo sysctl --system
```
- inotify watchers (útil para apps que monitoram arquivos):
```bash
echo fs.inotify.max_user_watches=1048576 | sudo tee /etc/sysctl.d/99-inotify.conf
sudo sysctl --system
```
- Swap/ZRAM (se necessário para picos): considere `zram-tools` ou um swapfile pequeno.

---

## Problemas Encontrados e Soluções
- DNS do Docker: erros "[resolver] failed to query external DNS server" usando `127.0.0.53`. Corrigido definindo DNS no `/etc/docker/daemon.json` e reiniciando o serviço.
- Upgrade interrompido por Syncthing (mirror): resolvido com `apt-mark hold syncthing` até o mirror estabilizar.
- Cloudflared 502 (TLS handshake): origem estava `https://localhost:8090`. Ajustar para `http://localhost:8090` no Service do túnel resolveu.
- Imagem `openproject/community:latest`/`14` indisponível: usamos `openproject/community:13` (compatível) no ARM64.
- YAML/aspas via PowerShell: cuidado com aspas duplas ao gerar arquivos remotos; validamos e corrigimos o `docker-compose.yml`.

---

## Checklist de Verificação Rápida
```bash
# Docker ativo
sudo systemctl is-active docker

# OpenProject respondendo localmente
curl -I http://127.0.0.1:8090

# Containers no ar (incluindo openproject, db, memcached)
docker ps -a

# Cloudflared sem erros apontando para http://localhost:8090
journalctl -u cloudflared -n 100 --no-pager | grep -i 8090
```

---

## Portas e Serviços (resumo)
- OpenProject: 8090/tcp (host) -> 80 (container)
- Home Assistant: 8123/tcp
- Grocy: 8001/tcp
- Nginx Proxy Manager: 8081/8181/tcp
- Wallos: 8282/tcp
- WAHA: 3000/tcp
- n8n (service): 127.0.0.1:5678/tcp

---

## Comandos Úteis (referência)
```bash
# Status e logs do Docker
sudo systemctl status docker -n 50 --no-pager
docker info

# Imagens e containers
docker images
docker ps -a
docker logs -f <container>

# Compose
docker compose pull
docker compose up -d
docker compose ps

# Cloudflared
sudo systemctl status cloudflared -n 100 --no-pager
sudo sed -n '1,200p' /etc/cloudflared/config.yml
```

---

## Onde encontrar arquivos
- Compose do OpenProject: `~/openproject/docker-compose.yml`
- Config do Docker: `/etc/docker/daemon.json` (backup: `/etc/docker/daemon.json.bak` se existir)
- cloudflared (config local): `/etc/cloudflared/config.yml` (se optar por arquivo)

Ficou com dúvidas ou quer automatizar mais passos (backup do OpenProject, proxy via NPM/HTTPS, monitoração)? Posso preparar os próximos scripts.
