
> **Cenário**: Servidor Oracle Cloud (Ubuntu 22.04 aarch64/ARM), Foundry VTT nativo em Node.js, atualização do v12 → v13, servindo via **Caddy** (HTTPS) e **systemd** (persistência). Inclui solução para **ERR_SSL_PROTOCOL_ERROR** e erros comuns (ACME/Let’s Encrypt, DuckDNS, rate limit GitHub, etc.).

---

## 0) Pré‑requisitos
- Acesso SSH como usuário que roda o serviço (ex: `ubuntu`).
- **Foundry key** válida (licença) e URL de download do pacote Node (ZIP) do v13.
- DNS público resolvendo para o IP da instância (ex.: `foundry-pedro.duckdns.org → 134.65.24.217`).
- Portas **80/443** liberadas na VCN/NSG da Oracle (para HTTPS e ACME), e a porta do Foundry (ex.: **30000**) se precisar de acesso direto por HTTP.

### Checagens rápidas
```bash
curl -4 ifconfig.co                  # IP público da VM
sudo ss -lntp | grep 30000           # Foundry ouvindo localmente
sudo ss -lntlp | grep ":80\|:443"    # Caddy/HTTP(S) ouvindo
```

---

## 1) Node.js 20+ (requisito do v13)
```bash
node -v
```
Se for < 20, instale a partir do NodeSource (método recomendado com keyring):
```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
  | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" \
  | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt update
sudo apt install -y nodejs
node -v
```

> Dica: `build-essential`/`python3` ajudam a compilar módulos nativos quando necessário:
```bash
sudo apt install -y build-essential python3 make g++
```

---

## 2) Backup antes de atualizar
```bash
# pare o serviço se for copiar a instalação
sudo systemctl stop foundry || true

# backup do user data (mundos/módulos/config)
tar -czf ~/foundrydata-backup-$(date +%F).tgz -C /home/ubuntu foundrydata
```

---

## 3) Baixar e instalar o **Foundry v13 (Node)**
Crie um diretório temporário, baixe o ZIP **Node** do v13 com sua URL licenciada e descompacte:
```bash
mkdir -p ~/foundry_v13 && cd ~/foundry_v13
# exemplo com curl (use sua URL de download licenciada)
curl -fSL -o foundry_node.zip "https://seu_link_licenciado/foundry_node_13.x.zip"
unzip foundry_node.zip
```
> Observação: nomes baixados podem vir com `?verify=...`. Remova o arquivo após `unzip`.

Mova a instalação para o caminho definitivo (mantendo a anterior como `foundry_old`):
```bash
cd ~
sudo mv /home/ubuntu/foundry /home/ubuntu/foundry_old 2>/dev/null || true
sudo mv ~/foundry_v13 /home/ubuntu/foundry
sudo chown -R ubuntu:ubuntu /home/ubuntu/foundry
```

Crie/garanta o **User Data Path** (separado da aplicação):
```bash
mkdir -p /home/ubuntu/foundrydata/Config
```

Teste manualmente (entrypoint mudou no v13: `main.js` na raiz):
```bash
node /home/ubuntu/foundry/main.js \
  --dataPath=/home/ubuntu/foundrydata \
  --port=30000 --hostname=0.0.0.0
```
Acesse: `http://SEU-IP:30000` (HTTP puro) para checar se abre a tela de licença.

---

## 4) Executar em segundo plano com **systemd** (persistência)

### Opção A — `systemctl edit` (boa prática)
```bash
sudo systemctl edit --full --force foundry.service
```
Cole e salve:
```ini
[Unit]
Description=Foundry VTT (Node v13)
After=network.target

[Service]
Type=simple
User=ubuntu
Group=ubuntu
WorkingDirectory=/home/ubuntu/foundry
ExecStart=/usr/bin/node /home/ubuntu/foundry/main.js --dataPath=/home/ubuntu/foundrydata --port=30000 --hostname=0.0.0.0
Environment=NODE_ENV=production
Restart=on-failure
RestartSec=5
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
```
Ative e inicie:
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now foundry
sudo systemctl status foundry --no-pager -l
```

### Opção B — heredoc com `tee` (sem editor)
```bash
sudo tee /etc/systemd/system/foundry.service >/dev/null <<'EOF'
[Unit]
Description=Foundry VTT (Node v13)
After=network.target

[Service]
Type=simple
User=ubuntu
Group=ubuntu
WorkingDirectory=/home/ubuntu/foundry
ExecStart=/usr/bin/node /home/ubuntu/foundry/main.js --dataPath=/home/ubuntu/foundrydata --port=30000 --hostname=0.0.0.0
Environment=NODE_ENV=production
Restart=on-failure
RestartSec=5
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now foundry
sudo systemctl status foundry --no-pager -l
```

**Logs/manutenção**:
```bash
journalctl -u foundry -f           # seguir logs
sudo systemctl restart foundry     # reiniciar após ajustes
```

---

## 5) **HTTP direto** (modo simples, sem proxy/SSL)
Se quiser acessar via IP/porta **sem HTTPS**:
```json
// /home/ubuntu/foundrydata/Config/options.json
{
  "hostname": "0.0.0.0",
  "port": 30000,
  "routePrefix": null,
  "sslCert": null,
  "sslKey": null,
  "proxySSL": false,
  "proxyPort": null
}
```
Reinicie: `sudo systemctl restart foundry`

Acesse **explicitamente por HTTP**: `http://SEU-IP:30000`

> **ERR_SSL_PROTOCOL_ERROR** ocorre quando você acessa **https://** um servidor que está respondendo **apenas http://**. Use `http://` ou configure o proxy TLS (Caddy) abaixo.

---

## 6) **HTTPS com Caddy** (reverse proxy recomendado)

### 6.1 Instale o Caddy
```bash
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
 | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
 | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install -y caddy
```

### 6.2 Abra portas 80/443 na Oracle Cloud
- Na VCN/NSG/Segurança, libere **TCP 80** e **TCP 443** (ingress) para `0.0.0.0/0`.

### 6.3 Configure o Caddyfile
```bash
sudo tee /etc/caddy/Caddyfile >/dev/null <<'EOF'
SEU-DOMINIO.duckdns.org {
  encode zstd gzip
  reverse_proxy 127.0.0.1:30000
}
EOF

sudo caddy fmt --overwrite /etc/caddy/Caddyfile
sudo systemctl reload caddy
journalctl -u caddy -n 50 --no-pager
```
Você deve ver logs de emissão de certificado. Se aparecer erro ACME (DNS/`SERVFAIL`), veja a seção **Troubleshooting**.

### 6.4 Ajuste o Foundry para “atrás de proxy TLS”
```json
// /home/ubuntu/foundrydata/Config/options.json
{
  "hostname": "SEU-DOMINIO.duckdns.org",
  "port": 30000,
  "routePrefix": null,
  "sslCert": null,
  "sslKey": null,
  "proxySSL": true,
  "proxyPort": 443,
  "compressStatic": true,
  "language": "pt-BR",
  "upnp": false
}
```
Reinicie: `sudo systemctl restart foundry`

### 6.5 Testes
```bash
curl -I http://127.0.0.1:30000               # upstream local (302 /license ou 200)
curl -I https://SEU-DOMINIO.duckdns.org      # deve responder via Caddy (HTTP/2 302/200)
```

---

## 7) Ativação inicial e segurança
- Entre em **https://SEU-DOMINIO.duckdns.org** → aceite a licença → cole sua **foundry.key** → defina **senha de admin**.
- Atualize módulos (compatíveis com v13) e teste os mundos antes de ir pra sessão.

---

## 8) Troubleshooting — erros comuns e correções

### 8.1 **ERR_SSL_PROTOCOL_ERROR**
- Causa: browser acessando **https://** enquanto o servidor responde **apenas http://** (ou `proxySSL:true` no Foundry sem um proxy HTTPS ativo).
- Correção rápida:
  - **HTTP direto**: use `http://IP:PORTA` e deixe `proxySSL:false`, `sslCert:null`, `sslKey:null`.
  - **Com Caddy**: configure o Caddyfile com o **host certo**, libere **80/443**, e no Foundry use `proxySSL:true`/`proxyPort:443` + `sslCert/sslKey:null`.

### 8.2 ACME/Let’s Encrypt — `DNS problem: SERVFAIL` / falha no certificado
- Confirme que o **A** de `SEU-DOMINIO.duckdns.org` está apontando para o **IP público** da VM:
  ```bash
  dig +short A SEU-DOMINIO.duckdns.org
  dig @1.1.1.1 +short A SEU-DOMINIO.duckdns.org
  ```
- Libere **80/443** (ingress) na Oracle.
- Aguarde propagação DNS (geralmente segundos/minutos no DuckDNS).
- Se bater em *rate limit*, teste com **ACME de staging** temporariamente (Caddyfile):
  ```caddy
  {
    acme_ca https://acme-staging-v02.api.letsencrypt.org/directory
  }
  SEU-DOMINIO.duckdns.org {
    encode zstd gzip
    reverse_proxy 127.0.0.1:30000
  }
  ```
  Depois que passar, remova o bloco global para voltar ao ACME de produção e recarregue.

### 8.3 GitHub **429** (rate limit) ao baixar scripts (ex.: *jarbas*)
- **Nunca** salve/execute HTML como se fosse script. Baixe do **raw.githubusercontent.com** com `-L`/`--location` e verifique:
  ```bash
  curl -fSL --retry 5 --retry-all-errors -o jarbas \
    https://raw.githubusercontent.com/brunocalado/mestre-digital/master/jarbas
  head -n5 jarbas   # deve mostrar shebang/comandos, não HTML
  chmod +x jarbas
  ```
- Alternativa: `git clone --depth 1 https://github.com/brunocalado/mestre-digital.git` e use os scripts locais.

### 8.4 `mv: cannot stat 'foundry_v13'`
- Você estava **dentro** da pasta ao tentar movê-la. Use caminhos absolutos e rode a partir do `~`.
  ```bash
  cd ~
  sudo mv ~/foundry_v13 /home/ubuntu/foundry
  ```

### 8.5 “Software license requires signature.”
- Mensagem normal na primeira execução. Acesse `/license` e cole a **foundry.key**.

### 8.6 UFW/Firewall local
```bash
sudo ufw status
sudo ufw allow 80,443/tcp
sudo ufw allow 30000/tcp
```
> Na Oracle, além do UFW, **abra as portas na VCN/NSG**.

### 8.7 Checagens úteis
```bash
# Foundry
journalctl -u foundry -n 50 --no-pager
sudo ss -lntp | grep 30000
curl -I http://127.0.0.1:30000

# Caddy/HTTPS
journalctl -u caddy -n 80 --no-pager
curl -I https://SEU-DOMINIO.duckdns.org
```

---

## 9) (Opcional) Unit **systemd endurecido**
```ini
[Service]
NoNewPrivileges=yes
ProtectSystem=full
ProtectHome=true
PrivateTmp=true
# Liberar escrita apenas onde precisa
ReadWritePaths=/home/ubuntu/foundry /home/ubuntu/foundrydata /var/log
```
> **Atenção**: se endurecer demais, o Node pode não conseguir ler/escrever onde precisa. Teste e ajuste `ReadWritePaths`.

---

## 10) (Opcional) Atualizador DuckDNS com systemd timer
```bash
sudo tee /usr/local/bin/duckdns-update.sh >/dev/null <<'EOF'
#!/usr/bin/env bash
DOMAIN="SEU-SUBDOMINIO"   # ex.: foundry-pedro
TOKEN="SEU_TOKEN"
IP="$(curl -s -4 https://ifconfig.co)"
curl -s "https://www.duckdns.org/update?domains=${DOMAIN}&token=${TOKEN}&ip=${IP}"
EOF
sudo chmod +x /usr/local/bin/duckdns-update.sh

sudo tee /etc/systemd/system/duckdns.service >/dev/null <<'EOF'
[Unit]
Description=DuckDNS updater
[Service]
Type=oneshot
ExecStart=/usr/local/bin/duckdns-update.sh
EOF

sudo tee /etc/systemd/system/duckdns.timer >/dev/null <<'EOF'
[Unit]
Description=Run DuckDNS updater every 5 minutes
[Timer]
OnBootSec=1min
OnUnitActiveSec=5min
Unit=duckdns.service
[Install]
WantedBy=timers.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now duckdns.timer
systemctl list-timers duckdns.timer
```

---

## 11) **Cheat sheet** (cola & vai)

### Atualização v12 → v13 (núcleo)
```bash
# Node 20+
sudo apt update && sudo apt install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt update && sudo apt install -y nodejs

# backup user data
tar -czf ~/foundrydata-backup-$(date +%F).tgz -C /home/ubuntu foundrydata

# instalar v13 (Node)
mkdir -p ~/foundry_v13 && cd ~/foundry_v13
curl -fSL -o foundry_node.zip "https://seu_link_licenciado/foundry_node_13.x.zip"
unzip foundry_node.zip
cd ~ && sudo mv /home/ubuntu/foundry /home/ubuntu/foundry_old 2>/dev/null || true
sudo mv ~/foundry_v13 /home/ubuntu/foundry
sudo chown -R ubuntu:ubuntu /home/ubuntu/foundry
mkdir -p /home/ubuntu/foundrydata/Config

# systemd
sudo systemctl edit --full --force foundry.service   # cole o unit
sudo systemctl daemon-reload
sudo systemctl enable --now foundry

# HTTP teste
curl -I http://127.0.0.1:30000
```

### HTTPS com Caddy (reverse proxy)
```bash
# Caddy
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install -y caddy

# Caddyfile (ajuste o domínio)
sudo tee /etc/caddy/Caddyfile >/dev/null <<'EOF'
SEU-DOMINIO.duckdns.org {
  encode zstd gzip
  reverse_proxy 127.0.0.1:30000
}
EOF
sudo caddy fmt --overwrite /etc/caddy/Caddyfile
sudo systemctl reload caddy

# options.json (proxy TLS)
sudo tee /home/ubuntu/foundrydata/Config/options.json >/dev/null <<'JSON'
{
  "hostname": "SEU-DOMINIO.duckdns.org",
  "port": 30000,
  "routePrefix": null,
  "sslCert": null,
  "sslKey": null,
  "proxySSL": true,
  "proxyPort": 443,
  "compressStatic": true,
  "language": "pt-BR",
  "upnp": false
}
JSON
sudo systemctl restart foundry

# testes
curl -I http://127.0.0.1:30000
curl -I https://SEU-DOMINIO.duckdns.org
```

---

### Fim
Com isso, você tem um fluxo **reprodutível**: atualização do núcleo, separação de dados, execução persistente, HTTPS automático por proxy e um arsenal de checagens para diagnosticar **ERR_SSL_PROTOCOL_ERROR** ou erros de emissão de certificado. Guarde este guia; quando pintar o mesmo sintoma, siga direto para as seções **5/6** (HTTP vs HTTPS) e **8** (Troubleshooting). Boa mesa! 🎲

