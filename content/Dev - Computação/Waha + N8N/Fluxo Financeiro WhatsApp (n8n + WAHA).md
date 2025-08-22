
---

# 📑 Fluxo Financeiro WhatsApp (n8n + WAHA)

Este fluxo integra o WhatsApp com Google Sheets para gerenciar finanças pessoais de forma conversacional.  
O usuário interage enviando mensagens no WhatsApp, e o sistema interpreta, classifica e registra automaticamente.

---

## 🔄 Visão Geral da Experiência do Usuário

1. Usuário envia mensagem no WhatsApp.
    
2. O bot marca a mensagem como lida.
    
3. O sistema interpreta a intenção do usuário:
    
    - **1 → Lançar Transação** (entrada/saída).
        
    - **2 → Pedir Resumo**.
        
    - **3 → Ajustar Saldo manual**.
        
    - **4 → Pagamento de Fatura**.
        
4. O fluxo atualiza as planilhas do Google Sheets:
    
    - `Contas` → saldos/limites.
        
    - `Transacoes` → histórico.
        
    - `MemoriaTemporaria` → estado da conversa.
        
5. O usuário recebe feedback em mensagens de confirmação ou resumo.
    

---

## 🧩 Nodos Detalhados

### **1. Webhook**

- **Função**: Ponto de entrada. Recebe mensagens do WhatsApp via WAHA.
    
- **Saída**: Payload com dados crus (quem enviou, texto, horário, etc.).
    

---

### **2. Preparar_Dados_Mensagem** (`Set`)

- **Função**: Extrai campos úteis do payload inicial.
    
- **Atributos extraídos**:
    
    - `session` → ID da sessão WhatsApp.
        
    - `chatId` → ID do chat.
        
    - `pushName` → Nome do contato.
        
    - `payload_id` → ID da mensagem.
        
    - `event` → Tipo de evento (ex: `message`).
        
    - `message` → Texto enviado.
        
    - `fromMe` → Se a msg foi enviada pelo próprio bot.
        
    - `messageTime` → Timestamp atual.
        

---

### **3. Marcar_Mensagem_Como_Lida** (`WAHA - Send Seen`)

- **Função**: Marca a mensagem recebida como “visualizada”.
    

---

### **4. Filtrar_Conversas_Autorizadas** (`Switch`)

- **Função**: Permite apenas mensagens de números cadastrados (Yan e Raquel).
    
- **Condição**:
    
    ```js
    {{ $('Dados').item.json.chatId == ('555191866752@c.us' || '554899232678@c.us') 
       && ($('Dados').item.json.event=='message') }}
    ```
    

---

### **5. É_Resposta_Numérica?** (`If`)

- **Função**: Verifica se a mensagem é apenas um número (regex `^\d+$`).
    
- **Caminhos**:
    
    - ✅ **Sim** → Buscar memória e continuar fluxo de transação.
        
    - ❌ **Não** → Envia para classificação de intenção.
        

---

### **6. Classificar_Intencao_Usuario** (`AI Agent`)

- **Função**: Classifica a mensagem do usuário em 4 intenções.
    
- **Prompt de Sistema**:
    
    ```
    Você é um assistente classificador de intenções para um bot de finanças pessoais.  
    Responda APENAS com o número da categoria.
    
    Categorias:
    1. Lançar Transação
    2. Pedir Resumo
    3. Ajustar Saldo
    4. Pagar Fatura
    ```
    

---

### **7. Roteamento_Intencao** (`Switch`)

- **Função**: Direciona para o subfluxo certo.
    
- **Saídas**:
    
    - `1` → Fluxo de Transação.
        
    - `2` → Fluxo de Resumo.
        
    - `3` → Fluxo de Ajuste.
        
    - `4` → Fluxo de Pagamento.
        

---

## 🚀 Fluxo 1 — Lançar Transação

### **8. Extrair_Detalhes_Transacao** (`AI Agent`)

- **Função**: Estrutura a mensagem em JSON financeiro.
    
- **Prompt de Sistema**:
    
    ```
    Sua única função é extrair informações financeiras de uma mensagem e formatá-las em JSON.
    
    Estrutura:
    {
      "pessoa": "Nome Pessoa",
      "data": "AAAA-MM-DD",
      "mes": "Nome do Mês",
      "transacao": "Descrição",
      "tipo": "Entrada ou Despesa",
      "entrada": 0.00,
      "saida": 0.00
    }
    ```
    

---

### **9. Validar_JSON_Transacao** (`Code`)

```js
const rawOutput = $input.first().json.output;
const match = rawOutput.match(/{[\s\S]*}/);
if (match && match[0]) {
  return JSON.parse(match[0]);
}
return { error: "Nenhum JSON válido foi encontrado na resposta." };
```

---

### **10. Validar_Valores** (`Switch`)

- **Condição**:
    
    - Se `entrada == 0 && saida == 0` → erro.
        
    - Caso contrário → segue.
        

---

### **11. Guardar_Memoria_Temporaria** (`Google Sheets`)

- **Função**: Salva a transação temporariamente até a conta ser escolhida.
    

---

### **12. Buscar_Contas_Disponiveis** (`Google Sheets`)

- **Função**: Lista as contas cadastradas.
    

---

### **13. Formatar_Pergunta_Conta** (`Code`)

```js
const contas = $('Buscar_Contas').all();
let mensagem = "Entendido! Onde foi essa despesa?\n\n";
contas.forEach((conta) => {
  mensagem += `${conta.json.ID}. ${conta.json['Nome da Conta']}\n`;
});
return { mensagem };
```

---

### **14. Enviar_Pergunta_Conta** (`WAHA - Send Text`)

- Envia lista de contas para escolha.
    

---

### **15. Identificar_Conta** (`Google Sheets`)

- Busca a conta pelo número digitado.
    

---

### **16. Selecionar_Ultima_Memoria** (`Code`)

```js
const todasMemorias = $('Buscar_na_Memoria').all();
todasMemorias.sort((a, b) => b.json.Timestamp - a.json.Timestamp);
return todasMemorias[0];
```

---

### **17. Registrar_Transacao_Final** (`Google Sheets`)

- Grava a transação na aba `Transacoes`.
    

---

### **18. Calcular_Novo_Saldo** (`Code`)

```js
const conta = $('Identificar_Conta').first().json;
const tipoConta = conta.Tipo;
let saldoAntigo = parseFloat(conta['Saldo / Limite Disponível']);
if (Number.isNaN(saldoAntigo)) saldoAntigo = 0;

const memoria = $('Pegar_Ultima_Memoria').first().json;
const tipoTransacao = memoria.Tipo;
let valorTransacao = parseFloat(memoria.Valor);
if (Number.isNaN(valorTransacao)) valorTransacao = 0;

let novoSaldo = saldoAntigo;

if (tipoConta === 'Débito') {
  novoSaldo += (tipoTransacao === 'Entrada' ? valorTransacao : -valorTransacao);
} else if (tipoConta === 'Crédito') {
  novoSaldo += (tipoTransacao === 'Entrada' ? valorTransacao : -valorTransacao);
}

return { novoSaldo: novoSaldo.toFixed(2) };
```

---

### **19. Atualizar_Saldo_Conta** (`Google Sheets`)

- Atualiza saldo/limite disponível.
    

---

### **20. Limpar_Memoria_Temporaria** (`Google Sheets`)

- Apaga a memória usada.
    

---

### **21. Confirmar_Registro** (`WAHA - Send Text`)

- Mensagem final:  
    ✅ _“Transação registrada com sucesso!”_
    

---

## 🚀 Fluxo 2 — Pedir Resumo

### **22. Buscar_Saldos** (`Google Sheets`)

- Recupera todos os saldos.
    

---

### **23. Formatar_Resumo_Financeiro** (`Code`)

```js
const contas = $('Buscar_Saldos').all();
let mensagem = "📊 *Resumo Financeiro Atual* 📊\n\n";

const contasDebito = contas.filter(c => c.json.Tipo === 'Débito');
if (contasDebito.length > 0) {
  mensagem += "💰 *Saldos em Conta (Débito):*\n";
  contasDebito.forEach(conta => {
    let saldo = parseFloat(conta.json['Saldo / Limite Disponível']);
    if (Number.isNaN(saldo)) saldo = 0;
    mensagem += `- ${conta.json['Nome da Conta']}: R$ ${saldo.toFixed(2)}\n`;
  });
}

const contasCredito = contas.filter(c => c.json.Tipo === 'Crédito');
if (contasCredito.length > 0) {
  mensagem += "\n💳 *Limites Disponíveis (Crédito):*\n";
  contasCredito.forEach(conta => {
    let limite = parseFloat(conta.json['Saldo / Limite Disponível']);
    if (Number.isNaN(limite)) limite = 0;
    mensagem += `- ${conta.json['Nome da Conta']}: R$ ${limite.toFixed(2)}\n`;
  });
}

return { mensagem };
```

---

### **24. Enviar_Resumo_Financeiro** (`WAHA - Send Text`)

- Envia o resumo formatado.
    

---

## 🚀 Fluxo 3 — Ajustar Saldo

### **25. Extrair_Detalhes_Ajuste** (`AI Agent`)

- **Prompt de Sistema**:
    
    ```
    Sua única função é extrair o nome da conta e o novo valor de uma mensagem de ajuste de saldo.  
    Responda APENAS com:
    {"nome_conta": "Nome da Conta", "novo_valor": 1500.00}
    ```
    

---

### **26. Validar_JSON_Ajuste** (`Code`)

```js
const rawOutput = $input.first().json.output;
const match = rawOutput.match(/{[\s\S]*}/);
if (match && match[0]) {
  return JSON.parse(match[0]);
}
return { error: "Nenhum JSON válido foi encontrado na resposta." };
```

---

### **27. Buscar_Todas_Contas** (`Google Sheets`)

- Puxa lista de contas.
    

---

### **28. Filtrar_Conta_Ajuste** (`Code`)

```js
const nomeBusca = $('AI Extrair Ajuste').first().json.nome_conta.toLowerCase();
const todasAsContas = $('Encontrar_Conta_para_Ajuste').all();

const contaEncontrada = todasAsContas.find(item =>
  item.json['Nome da Conta'].toLowerCase().includes(nomeBusca)
);

if (contaEncontrada) return contaEncontrada;
return { error: "Nenhuma conta encontrada com esse nome." };
```

---

👉 _(Faltam conexões no fluxo para atualizar o saldo diretamente e enviar mensagem de confirmação.)_

---

## 🚀 Fluxo 4 — Pagamento de Fatura

### **29. Extrair_Detalhes_Pagamento** (`AI Agent`)

- **Prompt de Sistema**:
    
    ```
    Sua função é extrair de uma mensagem de pagamento de fatura o nome do cartão de crédito e o valor pago.  
    Responda APENAS com:
    {"nome_cartao": "Nome do Cartão", "valor_pago": 1200.00}
    ```
    

---

👉 _(Assim como no ajuste, falta conexão final para atualizar limite e confirmar pagamento.)_

---

## 📌 Pontos de Melhoria

-  Adicionar **mensagem de confirmação** para Ajuste e Pagamento.
    
-  Criar **tratamento de erros unificado** (respostas amigáveis quando IA não entende).
    
-  Melhorar UX do Resumo → separar “contas principais” em destaque.
    

---

👉 Quer que eu monte também um **diagrama em Mermaid** (fluxo visual) para anexar ao `.md`, ou prefere manter só a documentação textual detalhada?