

# Git/GitHub Cheat Sheet

# Sumário
- [[#1.-Configurações-Iniciais]] 
	- [[#1.1 Configurar Nome de Usuário]]
	- [[#1.2 Configurar Email de Usuário]]
	- [[#1.3 Verificar Configurações]]
- [[#2.-Inicialização-de-Repositório]]
	- [[#2.1 Criar um Novo Repositório Local]]
	- [[#2.2 Clonar Repositório Remoto]]
- [[#3.-Operações-Básicas]]
	- [[#3.1 Verificar Status]]
	- [[#3.2 Adicionar Arquivos ao Stage]]
	- [[#3.3 Adicionar Todos os Arquivos ao Stage]]
	- [[#3.4 Fazer Commit]]
	- [[#3.5 Ver Log de Commits]]
- [[#4.-Trabalhando-com-Branches]]
	- [[#4.1 Criar uma Nova Branch]]
	- [[#4.2 Trocar para Outra Branch]]
	- [[#4.3 Criar e Mudar para Nova Branch (Atalho)]]
	- [[#4.4 Listar Todas as Branches]]
	- [[#4.5 Excluir uma Branch]]
- [[#5.-Sincronizando-com-Repositório-Remoto]]
	- [[#5.1 Adicionar um Repositório Remoto]]
	- [[#5.2 Verificar Repositórios Remotos]]
	- [[#5.3 Enviar Alterações para o Repositório Remoto]]
	- [[#5.4 Baixar Alterações do Repositório Remoto]]
- [[#6.-Resolver-Conflitos-de-Merge]]
	- [[#6.1 Verificar Conflitos]]
	- [[#6.2 Resolver Conflito Manualmente]]
	- [[#6.3 Finalizar o Merge]]
- [[#7.-Revertendo-e-Corrigindo]]
	- [[#7.1 Desfazer Alterações Locais (Antes de adicionar ao stage)]]
	- [[#7.2 Retirar Arquivo do Stage]]
	- [[#7.3 Desfazer Último Commit (Mantendo Alterações Locais)]]
	- [[#7.4 Descartar Último Commit (Perdendo Alterações)]]
- [[#8.-Trabalhando-com-Tags]]
	- [[#8.1 Criar uma Tag]]
	- [[#8.2 Verificar Tags]]
	- [[#8.3 Enviar Tags para o Repositório Remoto]]
- [[#9.-Outros-Comandos-Úteis]]
	- [[#9.1 Exibir Diferenças Entre Arquivos]]
	- [[#9.2 Exibir Diferenças Entre Commits]]
	- [[#9.3 Guardar Alterações Temporárias (Stash)]]
	- [[#9.4 Recuperar Alterações do Stash]]
	- [[#9.5 Verificar Stashes Salvos]]
- [[#10.-Erros-Comuns-e-Soluções]]
	- [[#10.1 "Detached HEAD" ao Fazer Checkout]]
	- [[#10.2 Rejeição de Push por Divergência]]

## 1. Configurações Iniciais

### 1.1 Configurar Nome de Usuário
```bash
git config --global user.name "Seu Nome"
```
Configura seu nome de usuário.

### 1.2 Configurar Email de Usuário
```bash
git config --global user.email "seuemail@exemplo.com"
```
Configura seu email para os commits.

### 1.3 Verificar Configurações
```bash
git config --list
```
Exibe todas as configurações de usuário.

## 2. Inicialização de Repositório

### 2.1 Criar um Novo Repositório Local
```bash
git init
```
Inicializa um novo repositório Git no diretório atual.

### 2.2 Clonar Repositório Remoto
```bash
git clone https://github.com/usuario/repo.git
```
Clona um repositório remoto para o diretório local.

## 3. Operações Básicas

### 3.1 Verificar Status
```bash
git status
```
Mostra o estado atual do repositório (arquivos modificados, não rastreados, etc).

### 3.2 Adicionar Arquivos ao Stage
```bash
git add <arquivo>
```
Adiciona o arquivo ao stage (área de preparação para commit).

**Exemplo:**
```bash
git add index.html
```

### 3.3 Adicionar Todos os Arquivos ao Stage
```bash
git add .
```
Adiciona todos os arquivos modificados e novos ao stage.

### 3.4 Fazer Commit
```bash
git commit -m "Mensagem do commit"
```
Realiza o commit com uma mensagem descritiva.

### 3.5 Ver Log de Commits
```bash
git log
```
Mostra o histórico dos commits.

**Exemplo com uma saída típica:**
```
commit 9c9d10f8b28d4d3b3f73c91c4870c9f1f7b95ec1
Author: Seu Nome <seuemail@exemplo.com>
Date:   Tue Sep 21 12:34:56 2023 -0300

    Adicionado arquivo de README
```

## 4. Trabalhando com Branches

### 4.1 Criar uma Nova Branch
```bash
git branch <nome-da-branch>
```
Cria uma nova branch.

### 4.2 Trocar para Outra Branch
```bash
git checkout <nome-da-branch>
```
Troca para a branch especificada.

### 4.3 Criar e Mudar para Nova Branch (Atalho)
```bash
git checkout -b <nome-da-branch>
```
Cria e já muda para a nova branch.

### 4.4 Listar Todas as Branches
```bash
git branch
```
Lista todas as branches do repositório.

### 4.5 Excluir uma Branch
```bash
git branch -d <nome-da-branch>
```
Exclui uma branch local (use `-D` para forçar a exclusão).

## 5. Sincronizando com Repositório Remoto

### 5.1 Adicionar um Repositório Remoto
```bash
git remote add origin https://github.com/usuario/repo.git
```
Associa o repositório remoto ao local.

### 5.2 Verificar Repositórios Remotos
```bash
git remote -v
```
Mostra as URLs dos repositórios remotos configurados.

### 5.3 Enviar Alterações para o Repositório Remoto
```bash
git push origin <nome-da-branch>
```
Envia as alterações da branch local para o repositório remoto.

**Exemplo:**
```bash
git push origin main
```

### 5.4 Baixar Alterações do Repositório Remoto
```bash
git pull
```
Baixa e mescla alterações do repositório remoto.

**Erro comum:**
```
error: Your local changes to the following files would be overwritten by merge:
```
Solução: `git stash` para salvar temporariamente suas mudanças locais, depois `git pull`.

## 6. Resolver Conflitos de Merge

### 6.1 Verificar Conflitos
Após um `git pull` ou `git merge`, pode haver conflitos de merge. O Git marca os conflitos assim:

```bash
<<<<<<< HEAD
Seu código
=======
Código da outra branch
>>>>>>> branch/remota
```

### 6.2 Resolver Conflito Manualmente
Edite os arquivos para resolver os conflitos, depois adicione novamente ao stage:
```bash
git add <arquivo>
```

### 6.3 Finalizar o Merge
Depois de resolver os conflitos, finalize o merge com:
```bash
git commit
```

## 7. Revertendo e Corrigindo

### 7.1 Desfazer Alterações Locais (Antes de adicionar ao stage)
```bash
git checkout -- <arquivo>
```
Desfaz as mudanças no arquivo.

### 7.2 Retirar Arquivo do Stage
```bash
git reset <arquivo>
```
Remove o arquivo do stage, mas mantém as mudanças.

### 7.3 Desfazer Último Commit (Mantendo Alterações Locais)
```bash
git reset --soft HEAD~1
```
Desfaz o commit mais recente, mas mantém as alterações.

### 7.4 Descartar Último Commit (Perdendo Alterações)
```bash
git reset --hard HEAD~1
```
Desfaz o commit e perde todas as mudanças.

## 8. Trabalhando com Tags

### 8.1 Criar uma Tag
```bash
git tag -a v1.0 -m "Versão 1.0"
```
Cria uma tag anotada com mensagem.

### 8.2 Verificar Tags
```bash
git tag
```
Lista todas as tags do repositório.

### 8.3 Enviar Tags para o Repositório Remoto
```bash
git push origin --tags
```
Envia todas as tags para o repositório remoto.

## 9. Outros Comandos Úteis

### 9.1 Exibir Diferenças Entre Arquivos
```bash
git diff
```
Mostra as diferenças entre arquivos modificados, mas não ainda no stage.

### 9.2 Exibir Diferenças Entre Commits
```bash
git diff <commit1> <commit2>
```
Compara as diferenças entre dois commits.

### 9.3 Guardar Alterações Temporárias (Stash)
```bash
git stash
```
Salva temporariamente suas alterações locais.

### 9.4 Recuperar Alterações do Stash
```bash
git stash pop
```
Aplica as alterações salvas e remove do stash.

### 9.5 Verificar Stashes Salvos
```bash
git stash list
```
Lista todas as alterações salvas no stash.

## 10. Erros Comuns e Soluções

### 10.1 "Detached HEAD" ao Fazer Checkout
Erro:
```
You are in 'detached HEAD' state.
```
Solução:
```bash
git checkout <nome-da-branch>
```
Ou crie uma branch e depois faça checkout:
```bash
git checkout -b <nova-branch>
```

### 10.2 Rejeição de Push por Divergência
Erro:
```
! [rejected]        main -> main (non-fast-forward)
```
Solução:
```bash
git pull --rebase
```
Traz as alterações do repositório remoto e aplica suas mudanças em cima delas.

---
