
## 1) Respostas sobre a definição formal da Máquina de Turing

### a) **Uma máquina de Turing pode alguma vez escrever o símbolo branco na sua fita?**

Sim, a Máquina de Turing pode escrever o símbolo branco (ou símbolo de vazio) na fita. O símbolo branco é geralmente usado para indicar que uma célula na fita não contém nenhum valor significativo. Em muitas implementações de máquinas de Turing, o símbolo branco pode ser usado para apagar informações previamente gravadas, ou para marcar o fim de uma operação de leitura e escrita.


### b) **O alfabeto de fita pode ser o mesmo que o alfabeto de entrada?**

Sim, o alfabeto de fita pode ser o mesmo que o alfabeto de entrada, mas isso não é uma exigência. O alfabeto de entrada geralmente contém um conjunto de símbolos específicos que a máquina pode ler como entrada. O alfabeto de fita pode incluir esses símbolos, mas também pode incluir símbolos adicionais como o símbolo branco ou outros usados para manipulação de dados durante o processamento.


### c) **A cabeça de uma máquina de Turing pode alguma vez estar na mesma localização em dois passos sucessivos?**

Sim, a cabeça de uma Máquina de Turing pode estar na mesma localização em dois passos sucessivos. Isso ocorre quando a função de transição especifica que a cabeça deve permanecer na mesma célula após ler um símbolo, ou seja, a máquina pode não se mover dependendo da transição definida.


### d) **Uma máquina de Turing pode conter apenas um único estado?**

Sim, uma Máquina de Turing pode ter apenas um único estado, embora essa não seja uma máquina útil em termos práticos. Com um único estado, a máquina seria limitada a fazer uma única ação para cada símbolo lido, o que limita sua capacidade de computação. No entanto, a definição formal de uma máquina de Turing não impõe restrições no número de estados, desde que o conjunto de transições seja bem definido.


## 2) **Arquitetura da Máquina de Turing**

A Máquina de Turing é composta por:

- **Fita infinita**: A fita é a memória da máquina, podendo conter símbolos de um alfabeto. A fita pode ser movida para a esquerda ou direita conforme a máquina processa a entrada.
- **Cabeça de leitura/escrita**: A cabeça lê ou escreve símbolos na fita e pode se mover para a esquerda ou para a direita.
- **Estado atual**: A máquina pode estar em um número finito de estados. O estado define as regras de transição.
- **Função de transição**: A função de transição determina o próximo estado e as ações (como escrever um símbolo e mover a cabeça) com base no símbolo lido na fita e no estado atual.
  
A Máquina de Turing realiza cálculos com base nessas operações e transições, podendo simular qualquer algoritmo computacional.


## 3) **Esquema explicando o funcionamento de uma Máquina de Turing**

Aqui está um esquema básico do funcionamento de uma Máquina de Turing:

1. **Entrada**: A máquina recebe uma sequência de símbolos (por exemplo, números binários) na fita.
2. **Processamento**: A cabeça de leitura/escrita lê o símbolo na posição atual, consulta a função de transição e decide qual ação tomar.
   - A máquina pode escrever um novo símbolo na célula.
   - A cabeça pode mover-se para a esquerda ou para a direita.
   - A máquina pode mudar de estado.
3. **Saída**: A máquina termina a operação quando um estado de aceitação ou rejeição é alcançado, produzindo a sequência final na fita.


## 4) **Diagrama de estados de uma máquina de Turing que soma 1 em sequência de inteiros binários (de 000 a 111)**

A Máquina de Turing que soma 1 em números binários de 3 bits (de 000 a 111) pode ser representada como segue:

### Diagrama de estados:
1. **Estado inicial (q0)**: Lê o primeiro bit da esquerda.
   - Se for 0, vai para o próximo bit (transição para q1).
   - Se for 1, muda para q2, invertendo o bit (fazendo a soma).

2. **Estado q1**: Se o próximo bit for 0, ele será alterado para 1 e a máquina termina (transição para q_accept).

3. **Estado q2**: Continuar a somar os bits para garantir o carry.


## 5) **Máquina de Turing que calcula o sucessor de 111101**

- **Entrada**: 111101
- **Saída**: 111110
- **Estados de Transição**:
   - Comece lendo o último bit (posição mais à direita).
   - Se for 0, escreva 1 e termine.
   - Se for 1, escreva 0 e mova-se para o próximo bit à esquerda, repetindo o processo até encontrar 0.
  

## 6) **Máquina de Turing que aceita números binários e altera conforme a paridade**

A máquina faz o seguinte:
- Se o número binário for ímpar, subtrai 1.
- Se o número for par, adiciona 1.

**Casos de Teste**:
- **Entrada**: 101 (impar) → **Saída**: 100
- **Entrada**: 1010 (par) → **Saída**: 1011

**Estados de Transição**:
1. Leia o bit mais à direita.
2. Se for 1 (impar), subtraia 1 (transição para a célula anterior e altere o valor).
3. Se for 0 (par), adicione 1.
  
Referência:
- Hopcroft, J., Motwani, R., & Ullman, J. (2001). **Introduction to Automata Theory, Languages, and Computation**. Pearson Education.
