---
draft: true
---

**Roteiro para Vídeo: Projeto de Sistema de Gerenciamento de Arquivos**

---

**[Introdução - 1 minuto]**

* "Olá, eu sou Yan Braga, e hoje vou apresentar o meu projeto final para a disciplina de Técnicas Avançadas em Projeto de Software."
* "O projeto consiste na implementação de um sistema de gerenciamento de arquivos utilizando os padrões de design Singleton, Proxy e Decorator."
* "Vamos explorar como esses padrões melhoram o controle de acesso, otimizam o desempenho e permitem a adição modular de funcionalidades."

---

**[Técnica 1: Singleton - 3 minutos]**

* "Primeiro, vamos falar sobre o padrão Singleton."
* "O Singleton garante que uma classe tenha apenas uma instância e fornece um ponto global de acesso a ela. Isso é útil para gerenciar recursos compartilhados e garantir a integridade do sistema."
* "No meu projeto, usei a técnica 'initialization-on-demand holder idiom' para garantir a inicialização preguiçosa e segura em ambientes multithreaded."
* "O código implementado utiliza uma classe interna estática para manter a instância única, criando-a apenas quando necessário, sem a necessidade de sincronização explícita."

  **Código Exemplo:**
  ```java
  public class GerenciadorDeArquivos {
      private GerenciadorDeArquivos() {}

      private static class Holder {
          private static final GerenciadorDeArquivos INSTANCE = new GerenciadorDeArquivos();
      }

      public static GerenciadorDeArquivos getInstance() {
          return Holder.INSTANCE;
      }
  }
  ```

* "As vantagens incluem controle centralizado e economia de recursos, enquanto as desvantagens incluem um ponto único de falha e dependências globais."
* "Identifiquei melhorias como técnicas avançadas de sincronização e a adoção de injeção de dependências para reduzir a dependência global."

---

**[Técnica 2: Proxy - 3 minutos]**

* "Agora, vamos falar sobre o padrão Proxy."
* "O Proxy fornece um substituto ou marcador para outro objeto, controlando o acesso ao objeto real e permitindo funcionalidades adicionais, como controle de acesso e carregamento sob demanda."
* "Implementei dois tipos de Proxy: um Proxy Virtual para adiar o carregamento de arquivos e um Proxy de Proteção para gerenciar o acesso baseado em permissões."

  **Código Exemplo:**
  ```java
  public interface Arquivo {
      void mostrar();
  }

  public class ArquivoReal implements Arquivo {
      private String nomeArquivo;

      public ArquivoReal(String nome) {
          this.nomeArquivo = nome;
          carregar();
      }

      private void carregar() {
          System.out.println("Carregando " + nomeArquivo);
      }

      @Override
      public void mostrar() {
          System.out.println("Mostrando " + nomeArquivo);
      }
  }

  public class ArquivoProxy implements Arquivo {
      private ArquivoReal arquivoReal;
      private String nomeArquivo;

      public ArquivoProxy(String nome) {
          this.nomeArquivo = nome;
      }

      @Override
      public void mostrar() {
          if (arquivoReal == null) {
              arquivoReal = new ArquivoReal(nomeArquivo);
          }
          arquivoReal.mostrar();
      }
  }
  ```

* "As vantagens incluem controle de acesso e otimização de recursos, enquanto as desvantagens incluem complexidade adicional e potencial sobrecarga de desempenho."
* "Propostas de melhorias incluem eficiência nas verificações de segurança e a implementação de caching para melhorar o desempenho."

---

**[Técnica 3: Decorator - 3 minutos]**

* "Por fim, vamos abordar o padrão Decorator."
* "O Decorator permite adicionar responsabilidades a objetos de forma dinâmica e flexível, sem alterar a classe base."
* "Utilizei o padrão para adicionar funcionalidades de logging e caching ao sistema de gerenciamento de arquivos."

  **Código Exemplo:**
  ```java
  public interface Arquivo {
      void mostrar();
  }

  public class ArquivoReal implements Arquivo {
      private String nomeArquivo;

      public ArquivoReal(String nome) {
          this.nomeArquivo = nome;
      }

      @Override
      public void mostrar() {
          System.out.println("Mostrando " + nomeArquivo);
      }
  }

  public abstract class ArquivoDecorator implements Arquivo {
      protected Arquivo arquivoDecorado;

      public ArquivoDecorator(Arquivo arquivo) {
          this.arquivoDecorado = arquivo;
      }

      public void mostrar() {
          arquivoDecorado.mostrar();
      }
  }

  public class LoggingDecorator extends ArquivoDecorator {
      public LoggingDecorator(Arquivo arquivo) {
          super(arquivo);
      }

      @Override
      public void mostrar() {
          System.out.println("Logging: Mostrando arquivo");
          super.mostrar();
      }
  }

  public class CachingDecorator extends ArquivoDecorator {
      private boolean cache = false;

      public CachingDecorator(Arquivo arquivo) {
          super(arquivo);
      }

      @Override
      public void mostrar() {
          if (!cache) {
              super.mostrar();
              cache = true;
          } else {
              System.out.println("Cache: Mostrando arquivo a partir do cache");
          }
      }
  }
  ```

* "As vantagens incluem modularidade e extensibilidade, enquanto as desvantagens são complexidade e gerenciamento dos decoradores."
* "Melhorias propostas incluem gerenciar a ordem dos decoradores e avaliar o impacto no desempenho."

---

**[Conclusão - 2 minutos]**

* "Para concluir, a aplicação dos padrões Singleton, Proxy e Decorator no sistema de gerenciamento de arquivos demonstrou suas capacidades de fornecer controle de acesso, otimização de desempenho e extensibilidade modular."
* "Embora tenham sido identificadas algumas dificuldades e desvantagens, as melhorias propostas visam aprimorar o sistema e garantir sua eficácia e robustez no futuro."
* "Obrigado por assistir. Estou à disposição para responder qualquer pergunta que possam ter."

---
