---
title: Definição do Script
draft: true
date: 2024-10-04
---
# Exemplo de script

```sql
CREATE DATABASE ficha_avaliacao;
USE ficha_avaliacao;

-- Tabela Pessoa
CREATE TABLE Pessoa (
    cpf VARCHAR(11) PRIMARY KEY, -- CPF no formato '12345678900'
    nome_completo VARCHAR(255) NOT NULL,
    endereco VARCHAR(255),
    cidade VARCHAR(100),
    cep VARCHAR(10),
    email VARCHAR(100),
    telefone_celular VARCHAR(15),
    telefone_alternativo VARCHAR(15),
    data_avaliacao DATE NOT NULL,
    idade INT CHECK (idade >= 0),
    sexo ENUM('M', 'F') NOT NULL,
    estado_civil ENUM('Solteiro', 'Casado', 'Vive c/ companheiro', 'Separado', 'Divorciado', 'Viúvo') NOT NULL,
    escolaridade ENUM('Analfabeto', 'Lê e escreve', 'Fundamental incompleto', 'Fundamental completo', 'Médio incompleto', 'Médio completo', 'Técnico incompleto', 'Técnico completo', 'Superior incompleto', 'Superior completo', 'Mestrado incompleto', 'Mestrado completo', 'Doutorado incompleto', 'Doutorado completo') NOT NULL,
    renda_mensal ENUM('de 1 a 3 SM', 'de 4 a 6 SM', '7 a 10 SM', 'acima de 11 SM', 'prefiro não informar') NOT NULL
);

-- Tabela Dominancia
CREATE TABLE Dominancia (
    dominancia_id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(11),
    destro_canhoto ENUM('Destro', 'Canhoto', 'Ambidestro') NOT NULL,
    lado_acometido ENUM('Direito', 'Esquerdo', 'Bilateral') NOT NULL,
    FOREIGN KEY (cpf) REFERENCES Pessoa(cpf)
);

-- Tabela Ocupacao
CREATE TABLE Ocupacao (
    ocupacao_id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(11),
    ocupacao VARCHAR(255),
    FOREIGN KEY (cpf) REFERENCES Pessoa(cpf)
);

-- Tabela Diagnostico
CREATE TABLE Diagnostico (
    diagnostico_id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(11),
    queixa_principal TEXT NOT NULL,
    diagnostico_clinico TEXT,
    tratamento_realizado ENUM('Conservador', 'Cirúrgico') NOT NULL,
    procedimento TEXT,
    data_procedimento DATE,
    tempo_imobilizacao VARCHAR(10), -- Pode ser adaptado para armazenar o formato de tempo usado (ex: 9 meses ou 14 anos)
    FOREIGN KEY (cpf) REFERENCES Pessoa(cpf)
);

-- Tabela HistoriaSocial
CREATE TABLE HistoriaSocial (
    historia_social_id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(11),
    local TEXT,
    familiares_habitam TEXT,
    condicoes_financeiras TEXT,
    FOREIGN KEY (cpf) REFERENCES Pessoa(cpf)
);

-- Tabela Exames
CREATE TABLE Exames (
    exame_id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(11),
    escala_dor TINYINT CHECK (escala_dor BETWEEN 0 AND 10),
    medicamento_nome VARCHAR(255),
    medicamento_dosagem VARCHAR(100),
    medicamento_frequencia VARCHAR(100),
    exames_complementares TEXT,
    exame_fisico_funcional TEXT,
    goniometria TEXT,
    perimetria TEXT,
    testes_especiais TEXT,
    FOREIGN KEY (cpf) REFERENCES Pessoa(cpf)
);

-- Tabela ObjetivosFisioterapia
CREATE TABLE ObjetivosFisioterapia (
    objetivos_id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(11),
    indicacao_fisioterapia TEXT,
    objetivos_tratamento TEXT,
    FOREIGN KEY (cpf) REFERENCES Pessoa(cpf)
);

-- Tabela CondutasFisioterapeuticas
CREATE TABLE CondutasFisioterapeuticas (
    condutas_id INT AUTO_INCREMENT PRIMARY KEY,
    objetivos_id INT,
    conduta TEXT,
    FOREIGN KEY (objetivos_id) REFERENCES ObjetivosFisioterapia(objetivos_id)
);

-- Tabela Evolucao
CREATE TABLE Evolucao (
    evolucao_id INT AUTO_INCREMENT PRIMARY KEY,
    objetivos_id INT,
    data_evolucao DATE,
    descricao_evolucao TEXT,
    FOREIGN KEY (objetivos_id) REFERENCES ObjetivosFisioterapia(objetivos_id)
);
```

### Definições e Considerações:
1. **Chave Primária:**
   - `cpf` é usado como chave primária na tabela **Pessoa** (definido como `VARCHAR(11)` para armazenar o CPF sem pontuação).
   
2. **Tipos de Dados:**
   - `VARCHAR` é utilizado para strings com limite de caracteres, como nomes e endereços.
   - `TEXT` é usado para campos que podem conter grandes quantidades de texto (ex: queixa principal, procedimentos).
   - `ENUM` é usado para valores fixos que podem ser escolhidos a partir de uma lista (ex: sexo, estado civil).
   - `INT` para identificadores numéricos e idades.
   - `DATE` para datas (ex: data de avaliação, data de procedimento).
   - `TINYINT` para a escala de dor (valores entre 0 e 10).

3. **Restrições:**
   - `NOT NULL` garante que os campos obrigatórios sejam preenchidos.
   - `CHECK` é usado para validar a idade e a escala de dor.
   - `FOREIGN KEY` mantém a integridade referencial entre as tabelas.

- - -


# Implementação sugerida

### 1. **Estrutura do Sistema**
O sistema pode ser dividido em três camadas principais:

- **Front-end**: Interface visual para o usuário.
- **Back-end**: Lógica da aplicação e processamento de dados.
- **Banco de Dados**: Armazenamento das informações.

### 2. **Tecnologias Simples e Práticas**

#### **Front-end: HTML + CSS + JavaScript**
- **HTML5**: Estrutura das páginas web.
- **CSS3**: Estilos e layout.
- **JavaScript (com framework leve como Vue.js ou React.js)**: Interatividade e validações no lado do cliente.
  
Essas tecnologias são fáceis de aprender e podem ser implementadas rapidamente. Você pode criar formulários para cada etapa da ficha de avaliação (por exemplo, dados pessoais, diagnóstico, etc.).

#### **Back-end: PHP ou Node.js**
- **PHP**: Uma linguagem amplamente usada para aplicações web com uma curva de aprendizado relativamente curta. É muito compatível com MySQL e pode ser facilmente hospedado em servidores compartilhados.
  
- **Node.js (com Express.js)**: Uma opção mais moderna, utilizando JavaScript no servidor. Oferece maior desempenho e flexibilidade. Pode ser usada com bibliotecas como `express-validator` para validações.

#### **Banco de Dados: MySQL**
- **MySQL** é robusto, fácil de integrar com PHP ou Node.js, e oferece boa performance para essa aplicação.
  
#### **Conexão Front-end e Back-end:**
- Você pode usar requisições **HTTP (GET/POST)** para enviar os dados dos formulários do front-end para o back-end. Em Node.js, por exemplo, isso pode ser feito usando **fetch API** ou **Axios** para fazer requisições assíncronas.

#### **Servidor: Apache ou Nginx**
- Para hospedar o site, você pode usar servidores HTTP como **Apache** (se for usar PHP) ou **Nginx** (ideal para aplicações Node.js).
  
### 3. **Segurança e Conformidade com a LGPD**

#### **1. Segurança dos Dados:**
- **Validação de dados**: Valide todos os dados de entrada no front-end (JavaScript) e no back-end (PHP ou Node.js) para garantir que informações sensíveis (como CPF) sejam adequadas. Use express-validator (Node.js) ou `filter_input` (PHP) para isso.
  
- **SQL Injection**: Use **Prepared Statements** para evitar SQL injection. Em PHP, isso é feito com `PDO` ou `MySQLi`, e em Node.js, usando bibliotecas como `mysql2` ou `sequelize`.

  **Exemplo PHP:**
  ```php
  $stmt = $conn->prepare("INSERT INTO Pessoa (cpf, nome_completo) VALUES (?, ?)");
  $stmt->bind_param("ss", $cpf, $nome_completo);
  $stmt->execute();
  ```

  **Exemplo Node.js:**
  ```javascript
  db.query('INSERT INTO Pessoa (cpf, nome_completo) VALUES (?, ?)', [cpf, nome_completo], function (err, results) {
      if (err) throw err;
  });
  ```

#### **2. Proteção de Dados Pessoais (LGPD):**
- **Consentimento:** No início de cada formulário, insira uma caixa de seleção obrigatória para que o usuário concorde com os termos de uso e política de privacidade.
  
- **Anonimização ou Pseudonimização**: Sempre que possível, armazene dados de forma que não sejam diretamente identificáveis. Por exemplo, use criptografia para dados sensíveis como o CPF. Em PHP, você pode usar `password_hash` ou uma biblioteca de criptografia como OpenSSL.
  
- **Acesso Controlado**: Use autenticação de usuários para garantir que apenas pessoal autorizado tenha acesso aos dados sensíveis. Em PHP, você pode implementar sessões seguras com `$_SESSION`, e em Node.js, você pode usar bibliotecas como **JWT** (JSON Web Tokens) para autenticação.
  
#### **3. HTTPS e Segurança de Conexão:**
- **SSL/TLS**: Habilite HTTPS no servidor para garantir que a comunicação entre o cliente e o servidor seja criptografada. Muitos provedores de hospedagem oferecem certificados SSL gratuitos, como o **Let's Encrypt**.
  
#### **4. Logs e Auditoria:**
- Registre todos os acessos e mudanças feitas no sistema para fins de auditoria e conformidade com a LGPD. Isso pode ser implementado com um sistema de logs em arquivos de texto ou com tabelas de auditoria no banco de dados.

#### **5. Política de Retenção de Dados:**
- Crie uma funcionalidade no sistema para permitir que os usuários possam solicitar a exclusão de seus dados, conforme exigido pela LGPD. Para isso, pode ser necessário criar um painel de controle onde usuários possam visualizar e excluir seus dados.

### 4. **Exemplo de Arquitetura**

1. **Formulário HTML** para entrada de dados:
```html
<form method="POST" action="/save">
  <label for="cpf">CPF:</label>
  <input type="text" id="cpf" name="cpf" required>
  
  <label for="nome_completo">Nome Completo:</label>
  <input type="text" id="nome_completo" name="nome_completo" required>
  
  <input type="submit" value="Enviar">
</form>
```

2. **Back-end Node.js com Express (exemplo)**:
```javascript
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'ficha_avaliacao'
});

app.post('/save', (req, res) => {
  const { cpf, nome_completo } = req.body;
  
  db.query('INSERT INTO Pessoa (cpf, nome_completo) VALUES (?, ?)', [cpf, nome_completo], (err, result) => {
    if (err) {
      return res.status(500).send('Erro no servidor');
    }
    res.send('Dados salvos com sucesso');
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

3. **Exemplo de Hospedagem:**
   - Você pode hospedar sua aplicação no **Heroku** (para Node.js) ou em um serviço de hospedagem compartilhada com suporte a **PHP**.
   - Para usar HTTPS com **Let's Encrypt**, você pode configurar em um servidor **Nginx** ou **Apache**.

### Conclusão
Essa abordagem simples e eficiente permite criar um sistema online básico para coleta e gestão de dados baseado na ficha de avaliação, com segurança adequada e conformidade com a LGPD.