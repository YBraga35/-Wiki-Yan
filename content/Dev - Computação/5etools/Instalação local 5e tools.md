
# 🚀 Como instalar e rodar 5etools como serviço no Windows (auto inicialização sem login)

## 0. Resumo
Primeiro, instalam-se as ferramentas necessárias, descritas em [[#1. **Pré-requisitos*|Pré-requisitos]]. 
Começa-se então a escolha do local onde devem ser armazenados os dados do 5e.tools, que pode ser um container Docker, ou uma pasta local do dispositivo.
Testa a funcionalidade local quando possível (se for uma VM, isso é um passo que só pode ser dado mais tarde)
*No windows é possível manter ele abrindo-se sempre usando um arquivo .bat* já em uma máquina Linux, diretamente por terminal o serviço pode ser instalado

VM Ubuntu:
- Primeiro vá no painel de controle dela, busque pela Public Subnet (para liberar a porta de uso 5050).
- Após essa configuração já é possível verificar a funcionalidade via a url ``http://<ip-da-vm>:5050 
- Se quiser fazer algo como redirecionamento via Cloudflare, agora já é possível, é necessário apenas instalar um token do Zero Trust. Se ele já estiver instalado, apenas abrir outra passagem pela porta dele no painel de controle da Cloudflare.




## 1. **Pré-requisitos**

- Ter **Node.js** instalado (recomendado LTS).
	https://nodejs.org/en/download/
    
- Ter acesso de administrador no Windows.
	Para isso, basta rodar Windows+R, inserir no campo:
	```bash
	powershell
	```
	E então Ctrl+Enter
	
- Baixar o **NSSM** (Non-Sucking Service Manager) — ferramenta para criar serviços facilmente.
	https://nssm.cc/download
    

---

## 2. **Baixar e preparar o 5etools**

```bash
# Escolha uma pasta onde quer colocar os arquivos
cd C:\Users\<seu-usuario\

# Clone o repositório do 5etools
git clone https://github.com/5etools-mirror-3/5etools-src.git

# (Opcional, se quiser os assets de imagens também)
git clone https://github.com/5etools-mirror-3/5etools-img.git 5etools-src\img

# Acesse a pasta do projeto
cd 5etools-src

# Instale as dependências
npm install
```

---

## 3. **Testar o servidor manualmente**

Antes de configurar como serviço, teste se tudo está ok:

```bash
npm run serve:dev
```

Se no terminal aparecer:

```
Starting up http-server, serving ./
Available on: http://localhost:5050
```

então está funcionando.

**Ctrl+C** para parar o servidor depois do teste.

---

## 4. **Criar um arquivo `.bat` para inicializar o servidor**

Crie um arquivo `5etools-start.bat` (pode ser dentro da própria pasta `5etools-src`):

**Conteúdo do .bat:**

```bat
@echo off
cd /d C:\caminho\para\5etools-src
npm run serve:dev
```

> 📢 Importante: o `/d` no `cd` garante que ele troca de drive caso esteja em C: ou D:, etc.

---

## 5. **Instalar o NSSM e criar o serviço**

1. **Baixar o NSSM**:
    
    - Site oficial: [https://nssm.cc/download](https://nssm.cc/download)
        
    - Extraia o NSSM, guarde em `C:\nssm\nssm-2.24\win64\` (ou outro caminho simples).
        
2. **Abrir PowerShell ou CMD como Administrador**.
    
3. **Comando para criar o serviço**:
    

```powershell
C:\nssm\nssm-2.24\win64\nssm.exe install 5etools
```

4. **Na janela do NSSM que abrir:**
    
    - **Path**: caminho para o executável do Node.js ou para o `npm.cmd`
        
        - Exemplo:
            
            ```
            C:\Program Files\nodejs\npm.cmd
            ```
            
    - **Arguments**: o que você quer rodar.
        
        - Exemplo:
            
            ```
            run serve:dev
            ```
            
    - **Startup directory**: onde está o `package.json` (a pasta `5etools-src`).
        
        - Exemplo:
            
            ```
            C:\caminho\para\5etools-src
            ```
            
5. **Configurar Inicialização Automática:**
    
    - Na aba _"Details"_, deixe o serviço para **start automático**.
        
    - Opcional: configurar para reiniciar caso o servidor caia (na aba _"Exit actions"_).
        

---

## 6. **Iniciar o serviço**

Via Serviços do Windows:

- `Win + R` → `services.msc`
    
- Encontre `5etools`
    
- Clique com direito → **Iniciar**.
    

Ou via linha de comando:

```powershell
net start 5etools
```

---

## 7. **Acessar o servidor**

Abra o navegador e entre em:

```
http://localhost:5050
```

ou, de outro dispositivo na mesma rede:

```
http://IP-da-máquina:5050
```

> (Para saber o IP: use `ipconfig` no terminal).

---

# 🎯 Resumo do funcionamento:

|Etapa|O que acontece|
|:--|:--|
|PC liga|Windows inicia|
|Serviço 5etools inicia|Sem precisar fazer login|
|Servidor 5etools no ar|Automaticamente disponível na porta 5050|

---

# ✨ Observações extras:

- Se quiser atualizar o 5etools depois:
    
    ```bash
    git pull
    npm install
    ```
    
- Se mudar arquivos no repositório, o servidor terá que ser reiniciado (ou configurar para "watch mode" mais avançado, se quiser).
    
- Dá para melhorar ainda mais usando o `pm2` no Windows se quiser reinícios automáticos ainda mais suaves, mas o NSSM já é perfeito para a maioria dos usos.
    

---

# ⚡ Pergunta:

Quer que eu já te mande também uma **versão do serviço usando diretamente o Node sem npm** (mais rápido ainda)?  
Tipo, apontar o NSSM para `npx http-server` direto, sem precisar `.bat`? 🚀  
Só se quiser, ok! 🎯

---

Quer que eu já formate isso também em um arquivo `.md` bonitão tipo "Guia de Instalação"?