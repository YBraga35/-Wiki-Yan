---
share_link: https://share.note.sx/mm5xcho6#wJw+p12ncHOnpYLp61TQsFVIiWuyP1pSuv26oPImi80
share_updated: 2024-08-02T11:14:52-03:00
title: Resumo Diagramas UML
draft: true
---

## Explicação Detalhada

### 1. **Diagrama de Atividades**
   - **Propósito:** Modela o fluxo de atividades dentro de um processo, como um fluxograma.
   - **Elementos Principais:**
     - **Círculo Preenchido (Início):** Marca o começo do fluxo.
     - **Ações (Retângulos Arredondados):** Representam as tarefas ou atividades.
     - **Decisão (Losango):** Indica um ponto de decisão com diferentes caminhos possíveis.
     - **Setas (Fluxo de Controle):** Conectam as atividades, mostrando a sequência.
     - **Círculo Duplo (Fim):** Indica o término do fluxo.

   **Exemplo:**
   - **Login em um Sistema:** Início -> Inserir Credenciais -> Verificar Credenciais (Decisão: Válidas?) -> Se Sim: Acessar Sistema -> Fim. Se Não: Exibir Erro -> Fim.

### 2. **Diagrama de Caso de Uso**
   - **Propósito:** Mostra as funcionalidades que o sistema oferece e quem as utiliza.
   - **Elementos Principais:**
     - **Atores (Bonecos):** Usuários ou sistemas externos que interagem com o sistema.
     - **Casos de Uso (Ovais):** Funcionalidades ou serviços que o sistema oferece.
     - **Associação (Linhas Contínuas):** Conecta atores a casos de uso.
     - **Relações (Linhas Pontilhadas com Setas):** Inclui (um caso de uso sempre invoca outro) ou Estende (um caso de uso pode opcionalmente invocar outro).

   **Exemplo:**
   - **Sistema de Biblioteca:** Usuário pesquisa livro (caso de uso) e reserva livro. Bibliotecário empresta livro, que inclui verificar disponibilidade.

### 3. **Diagrama de Sequência**
   - **Propósito:** Representa a interação entre objetos ao longo do tempo.
   - **Elementos Principais:**
     - **Objetos:** Entidades que participam da interação.
     - **Linha de Vida (Vertical):** Representa o tempo durante o qual o objeto existe.
     - **Mensagens (Linhas Contínuas com Setas):** Chamadas de métodos ou envio de mensagens.
     - **Mensagens Retorno (Linhas Pontilhadas):** Respostas ou confirmações.
     - **Ativação (Retângulos sobre a Linha de Vida):** Período em que o objeto está ativo.

   **Exemplo:**
   - **Compra em E-commerce:** Cliente seleciona produto -> Sistema verifica estoque -> Cliente efetua pagamento -> Sistema confirma pagamento -> Fim.

### 4. **Diagrama de Componentes**
   - **Propósito:** Descreve a organização física dos componentes de um sistema.
   - **Elementos Principais:**
     - **Componentes (Retângulos):** Partes físicas ou lógicas do sistema, como módulos ou bibliotecas.
     - **Interfaces:** Pontos de acesso aos serviços oferecidos por um componente.
     - **Conexões (Linhas Contínuas):** Mostram dependências ou comunicação entre componentes.

   **Exemplo:**
   - **Sistema de Gerenciamento de Conteúdo:** Frontend se comunica com Backend via API. Backend se comunica com Banco de Dados.

### 5. **Diagrama de Deploy (Implantação)**
   - **Propósito:** Mostra como os componentes são implantados em hardware.
   - **Elementos Principais:**
     - **Nós (Cubos 3D):** Dispositivos físicos ou virtuais onde os componentes são implantados.
     - **Artefatos (Retângulos):** Arquivos ou pacotes implantados em um nó.
     - **Conexões (Linhas Contínuas com Setas):** Mostram a comunicação entre nós.

   **Exemplo:**
   - **Deploy de Aplicação Web:** Servidor Web contém aplicação, que se comunica com Servidor de Banco de Dados.

### 6. **Diagrama de Estado**
   - **Propósito:** Mostra os estados pelos quais um objeto ou sistema passa durante seu ciclo de vida.
   - **Elementos Principais:**
     - **Estados (Retângulos Arredondados):** Diferentes condições ou situações do objeto.
     - **Transições (Setas Contínuas):** Mudanças de um estado para outro, causadas por eventos.
     - **Estado Inicial (Círculo Preenchido):** Ponto de início do ciclo de vida.
     - **Estado Final (Círculo Duplo):** Termina o ciclo de vida.

   **Exemplo:**
   - **Tarefa em Sistema de Gestão de Projetos:** Criado -> Em Progresso -> Concluído.

### 7. **Diagrama de Interação**
   - **Propósito:** Mostra a troca de mensagens entre objetos para realizar uma funcionalidade.
   - **Elementos Principais:**
     - **Objetos:** Entidades que trocam mensagens.
     - **Mensagens (Linhas Contínuas ou Pontilhadas com Setas):** Comunicação entre objetos.
     - **Fragmentos (Retângulos com Condições):** Condições ou loops sobre a troca de mensagens.

   **Exemplo:**
   - **Troca de Mensagens em Sistema Cliente-Servidor:** Cliente envia pedido -> Servidor processa -> Envia resposta.

### 8. **BPMN (Business Process Model and Notation)**
   - **Propósito:** Modela processos de negócios, detalhando atividades e fluxos.
   - **Elementos Principais:**
     - **Eventos (Círculos):** Marcam o início, fim ou um ponto intermediário de um processo.
     - **Tarefas (Retângulos):** Passos ou atividades no processo.
     - **Gateways (Losango):** Pontos de decisão que afetam o fluxo.
     - **Fluxo de Sequência (Setas):** Mostram a ordem das atividades.
     - **Piscinas e Raias:** Dividem responsabilidades entre diferentes atores ou sistemas.

   **Exemplo:**
   - **Processo de Aprovação de Férias:** Solicitação -> Avaliação -> Decisão -> Aprovação/Rejeição.
