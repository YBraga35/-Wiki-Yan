---
title: Docker - Copiar tema Divi
draft: false
date: 2024-09-01
---
Ótimo! Isso confirma que o caminho do WordPress é `/var/www/html`.

### Passo 1: Copiar o Arquivo ZIP para Dentro do Container Docker

1. **Conecte-se à sua VM Oracle via SSH (caso não esteja conectado):**
   ```sh
   ssh -i /home/yanbraga/Documentos/foundry.key -L 9090:localhost:8384 ubuntu@164.152.243.158
   ```

2. **Copie o arquivo ZIP para o container Docker do WordPress:**
   ```sh
   docker cp /home/ubuntu/Divi.zip wordpress-wordpress-1:/var/www/html/wp-content/themes/
   ```

### Passo 2: Extrair o Arquivo ZIP Dentro do Container Docker

1. **Acesse o container Docker do WordPress (se ainda não estiver conectado):**
   ```sh
   docker exec -it wordpress-wordpress-1 /bin/bash
   ```

2. **Navegue até o diretório de temas do WordPress:**
   ```sh
   cd /var/www/html/wp-content/themes/
   ```

### Passo 3: Instalar o `unzip` no Container Docker

1. **Ainda dentro do shell do container Docker, execute:**
   ```sh
   apt-get update
   apt-get install unzip -y
   ```

### Passo 4: Extrair o Arquivo ZIP

1. **Após a instalação, extraia o arquivo ZIP:**
   ```sh
   unzip Divi.zip
   ```

### Passo 5: Sair do Container Docker

1. **Sair do shell do container Docker:**
   ```sh
   exit
   ```

### Passo 4: Ativar o Tema no WordPress

1. **Acesse o painel de administração do WordPress:**
   - **URL:** `http://164.152.243.158:8080/dm_yan`
   - **Login:** Utilize as credenciais do administrador do WordPress.

2. **Ative o tema:**
   - Navegue até `Aparência > Temas`.
   - Localize o tema "Divi" que você acabou de enviar e extraia e clique em "Ativar".

### Notas Adicionais

- **Verifique permissões:** Após extrair o tema, certifique-se de que as permissões dos arquivos estão corretas para que o servidor web possa ler os arquivos.
  ```sh
  chown -R www-data:www-data /var/www/html/wp-content/themes/Divi
  ```

Se precisar de mais alguma coisa, estou à disposição!