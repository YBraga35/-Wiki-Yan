

## **Visão Geral do Projeto**

- **Nome:** InfoPhysio
    
- **Objetivo:** Criar um sistema dividido em:
    
    1. **Prontuário Eletrônico (PE)** para uso clínico via desktop.
        
    2. **Aplicativo para pacientes** com calendário de exercícios, vídeos e acompanhamento de progresso.
        

---

## **Equipe**

- **Scrum Master / Product Owner:** Yan Braga
    
- **Desenvolvedores:** Alunos de Informática Biomédica
    
- **Consultores clínicos e validadores:** Alunos de Mestrado e Doutorado em Fisioterapia
    

---

## **Backlog Inicial por Tópico**

### 1. **PE - Sistema Web de Prontuário Eletrônico**

-  Cadastro de paciente (dados pessoais, diagnóstico, histórico social, etc.)
    
-  Cadastro e visualização de exames, objetivos e condutas
    
-  Cadastro de plano de reabilitação (com vídeos via link do YouTube)
    
-  Login clínico com controle de acesso (senha protegida)
    
-  Auditoria básica de alterações (logs)
    
-  Segurança e conformidade com LGPD (consentimento, criptografia de CPF, etc.)
    

### 2. **App Paciente - Acompanhamento Domiciliar**

-  Tela de login com CPF + data de nascimento
    
-  Tela inicial com calendário de streaks (verde, cinza, vermelho)
    
-  Visualização do plano de exercícios do dia
    
-  Vídeos embutidos (YouTube) com botão de "exercício concluído"
    
-  Armazenamento do progresso local e sincronizado com servidor
    
-  Tela de parabéns e incentivo quando mantido o streak
    
-  Tela de histórico de adesão
    

### 3. **Integração e Infraestrutura**

-  API REST entre PE e App
    
-  Banco de dados MySQL
    
-  Hospedagem segura (com HTTPS)
    
-  Interface administrativa para testes
    
-  Testes unitários e de usabilidade
    

---

## **Sprint Planning Sugerido**

### **Fase 1: Infraestrutura e Banco de Dados** _(Sprints 1–3)_

- Montar estrutura de banco com tabelas completas (já iniciado)
    
- Criar estrutura básica de backend em Node.js/Express
    
- Criar protótipos de interface com Figma (PE e App)
    

### **Fase 2: Prontuário Eletrônico (Web)** _(Sprints 4–8)_

- Telas de cadastro e visualização
    
- Integração com banco
    
- Validação de dados e segurança
    
- Interface para plano de reabilitação
    

### **Fase 3: App do Paciente (Mobile/WebApp)** _(Sprints 9–13)_

- Login e autenticação simples
    
- Tela de calendário com lógica de streak
    
- Exibição de vídeos e marcação de tarefas
    
- Comunicação com backend
    

### **Fase 4: Integração, Testes e LGPD** _(Sprints 14–17)_

- Testes clínicos com equipe de Fisioterapia
    
- Ajustes com base no feedback
    
- Logs, política de consentimento e LGPD
    
- Documentação de uso e deploy final
    

---

## **Ferramentas**

- **GitHub Projects** para o board Scrum (já iniciado)
    
- **Figma** para prototipação das telas
    
- **Trello (opcional)** para planejamento clínico em paralelo
    
- **MySQL + Node.js/Express + React ou Vue.js** para o sistema completo
    
- **Expo ou React Native Web** para o app se for PWA
    

---
