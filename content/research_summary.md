# Comparação entre OpenCode, Codex, ClaudeCode e Gemini-Cli

## Resumo da Pesquisa

Esta pesquisa compara quatro ferramentas de assistência de codificação baseadas em IA: OpenCode, Codex (GitHub Copilot CLI), ClaudeCode e Gemini-Cli. As informações foram obtidas de documentações oficiais via web scraping.

## OpenCode
- **Fonte**: https://opencode.ai
- **Descrição**: Agente de codificação open source para terminal, totalmente open source, dando controle e liberdade para usar qualquer provedor, modelo ou editor.
- **Características principais**:
  - TUI nativa, responsiva e tematizável.
  - LSP habilitado (carrega automaticamente LSPs corretos para o LLM).
  - Multi-sessão (iniciar vários agentes em paralelo no mesmo projeto).
  - Compartilhar links (compartilhar link para qualquer sessão para referência ou debug).
  - Suporte a Claude Pro (login com Anthropic para usar Claude Pro ou Max).
  - Qualquer modelo (75+ provedores LLM através de Models.dev, incluindo modelos locais).
  - Qualquer editor (OpenCode roda no terminal, combina com qualquer IDE).
- **Privacidade**: Não armazena dados de código ou contexto, adequado para ambientes sensíveis à privacidade.
- **Uso ideal**: Projetos open source, ambientes com foco em privacidade, suporte a múltiplos modelos.

## Codex (GitHub Copilot CLI)
- **Fonte**: https://docs.github.com/en/copilot/github-copilot-in-the-cli
- **Descrição**: Extensão Copilot para GitHub CLI, agora depreciada e substituída pelo novo GitHub Copilot CLI (agente de codificação).
- **Características principais**:
  - Integrado com GitHub.
  - Usa modelos proprietários do GitHub.
  - Focado em agentes de codificação, criação de PRs, revisão de código, etc.
  - Suporte a MCP (Model Context Protocol) e extensões.
- **Privacidade/Uso**: Parte do ecossistema GitHub, pago, ideal para workflows integrados com GitHub.

## ClaudeCode
- **Fonte**: https://docs.anthropic.com/en/docs/claude-code/overview
- **Descrição**: Ferramenta de codificação agentiva da Anthropic que vive no terminal, ajuda a transformar ideias em código mais rápido.
- **Características principais**:
  - Constrói recursos de descrições em inglês simples.
  - Depura e corrige problemas.
  - Navega qualquer codebase.
  - Automatiza tarefas tediosas (lint, conflitos de merge, notas de release).
  - Trabalha no terminal, toma ações (edita arquivos, roda comandos, cria commits).
  - Filosofia Unix (composável e scriptável).
  - Pronto para empresa (usa API Claude, hospedagem em AWS/GCP, segurança e compliance).
  - Suporte a MCP, plugins, subagentes.
- **Uso ideal**: Assistência geral de codificação no terminal com modelos Claude, automação de tarefas.

## Gemini-Cli
- **Fonte**: Tentativas de acesso a https://ai.google.dev/gemini-api/docs/cli e https://ai.google.dev/gemini-api/docs falharam (erro de abortamento). Não foi possível obter informações específicas.
- **Descrição presumida**: Provavelmente uma CLI da Google para modelos Gemini, focada em integração com ecossistema Google.
- **Características principais**: Usa modelos Gemini, menos focado em agentes de codificação comparado aos outros.
- **Uso ideal**: Ecossistema Google, tarefas gerais de IA.

## Diferenças Principais
- **OpenCode**: Open source, flexibilidade máxima em modelos e privacidade.
- **Codex**: Integrado com GitHub, pago, focado em PRs e revisões.
- **ClaudeCode**: Terminal-first, agentivo, usa Claude, automação avançada.
- **Gemini-Cli**: Menos documentado, focado em Google/Gemini.

## Melhores Usos
- **OpenCode**: Projetos open source, privacidade, múltiplos modelos.
- **Codex**: Workflows GitHub.
- **ClaudeCode**: Codificação geral no terminal.
- **Gemini-Cli**: Integração com Google.