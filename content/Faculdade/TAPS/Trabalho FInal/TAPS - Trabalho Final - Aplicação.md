---
title: Sumário Inicial
description: Esse documento é supostamente o sumário e a página inicial de todo o meu site baseado nas anotações do Obsidian.
aliases:
  - indexação
  - Índice
tags:
  - index-tag
  - indice-tag
draft: true
date: 2024-07-26
creation date: 2024-07-26 14:42
modification date: sexta-feira 26º julho 2024 14:43:19
---

## Implementação Utilizada

O projeto é um sistema de gerenciamento de arquivos que utiliza os padrões de design Singleton, Proxy e Decorator para garantir controle de acesso, otimização de desempenho e modularidade.

### Arquitetura Geral

O sistema é composto por três partes principais:
1. **Gerenciador de Arquivos:** Controla a única instância do sistema e fornece o ponto de acesso global.
2. **Sistema de Acesso a Arquivos:** Usa proxies para gerenciar o acesso e otimizar o carregamento de arquivos.
3. **Sistema de Funcionalidades Adicionais:** Usa decoradores para adicionar funcionalidades de forma modular.

### Técnica 1: Singleton

#### Implementação

O padrão Singleton assegura que o `GerenciadorDeArquivos` tenha uma única instância em todo o sistema. Utilizamos a técnica "initialization-on-demand holder idiom" para garantir segurança em ambientes com múltiplas threads e inicialização preguiçosa.

```java
public class GerenciadorDeArquivos {
    private static class Holder {
        private static final GerenciadorDeArquivos INSTANCE = new GerenciadorDeArquivos();
    }

    private GerenciadorDeArquivos() {
        // Inicializa o sistema de arquivos
    }

    public static GerenciadorDeArquivos getInstance() {
        return Holder.INSTANCE;
    }
}
```

#### Aplicação no Projeto

- **Controle Centralizado:** A classe `GerenciadorDeArquivos` centraliza todas as operações de acesso a arquivos.
- **Economia de Recursos:** Impede a criação de múltiplas instâncias, economizando memória e outros recursos.

### Técnica 2: Proxy

#### Implementação

O padrão Proxy foi usado para criar um `ProxyDeArquivo` que controla o acesso e o carregamento dos arquivos apenas quando necessário. O proxy também verifica permissões antes de acessar o arquivo real.

```java
public interface Arquivo {
    void mostrar();
}

public class ArquivoReal implements Arquivo {
    private String nomeArquivo;

    public ArquivoReal(String nomeArquivo) {
        this.nomeArquivo = nomeArquivo;
        carregarArquivo();
    }

    private void carregarArquivo() {
        // Lógica para carregar o arquivo
    }

    @Override
    public void mostrar() {
        // Lógica para mostrar o arquivo
    }
}

public class ProxyDeArquivo implements Arquivo {
    private ArquivoReal arquivoReal;
    private String nomeArquivo;

    public ProxyDeArquivo(String nomeArquivo) {
        this.nomeArquivo = nomeArquivo;
    }

    @Override
    public void mostrar() {
        if (arquivoReal == null) {
            arquivoReal = new ArquivoReal(nomeArquivo);
        }
        verificarPermissoes();
        arquivoReal.mostrar();
    }

    private void verificarPermissoes() {
        // Lógica para verificar permissões de acesso
    }
}
```

#### Aplicação no Projeto

- **Controle de Acesso:** O `ProxyDeArquivo` verifica permissões e carrega o arquivo apenas quando necessário, melhorando o desempenho.
- **Otimização de Recursos:** Adia o carregamento do arquivo até que seja realmente necessário.

### Técnica 3: Decorator

#### Implementação

O padrão Decorator foi aplicado para adicionar funcionalidades como logging e caching ao sistema de arquivos. O `DecoratorDeArquivo` permite adicionar essas funcionalidades de forma modular.

```java
public abstract class ArquivoDecorator implements Arquivo {
    protected Arquivo arquivoDecorado;

    public ArquivoDecorator(Arquivo arquivoDecorado) {
        this.arquivoDecorado = arquivoDecorado;
    }

    @Override
    public void mostrar() {
        arquivoDecorado.mostrar();
    }
}

public class LoggingDecorator extends ArquivoDecorator {
    public LoggingDecorator(Arquivo arquivoDecorado) {
        super(arquivoDecorado);
    }

    @Override
    public void mostrar() {
        logarAcesso();
        super.mostrar();
    }

    private void logarAcesso() {
        // Lógica para registrar o acesso ao arquivo
    }
}

public class CachingDecorator extends ArquivoDecorator {
    private boolean cacheDisponivel;

    public CachingDecorator(Arquivo arquivoDecorado) {
        super(arquivoDecorado);
    }

    @Override
    public void mostrar() {
        if (!cacheDisponivel) {
            super.mostrar();
            cacheDisponivel = true;
        }
        // Lógica para exibir o arquivo a partir do cache
    }
}
```

#### Aplicação no Projeto

- **Modularidade:** Adiciona funcionalidades de logging e caching sem alterar a classe base `Arquivo`.
- **Composição de Funcionalidades:** Vários decoradores podem ser aplicados em cadeia para combinar múltiplas funcionalidades.

### Conclusão

O sistema de gerenciamento de arquivos demonstrou a aplicação eficaz dos padrões Singleton, Proxy e Decorator. O Singleton garantiu uma instância única e centralizada, o Proxy controlou o acesso e otimizou o carregamento de arquivos, e o Decorator adicionou funcionalidades de forma modular. A integração desses padrões melhorou a eficiência e o controle do sistema, mostrando a importância de escolher e aplicar padrões de design apropriados para resolver problemas específicos.

---
