# O Estado da Arte em Saúde Digital no Contexto do SUS: Tecnologias, Usabilidade e Oportunidades para Pesquisadores, Clínicos e Pacientes

Este relatório apresenta uma análise aprofundada do estado da arte em saúde digital, com foco específico no ecossistema do Sistema Único de Saúde (SUS) no Brasil. A pesquisa abrange a arquitetura estratégica nacional, implementações tecnológicas bem-sucedidas, desafios críticos de usabilidade e engajamento do paciente, e o potencial do emergente ecossistema de dados para a pesquisa. O objetivo é fornecer uma base de evidências robusta para orientar o desenvolvimento de novas soluções digitais que atendam às necessidades de pesquisadores, clínicos e pacientes no contexto brasileiro. A análise está fundamentada em publicações científicas chave, cuja relevância é contextualizada por meio de métricas de citação, oferecendo um panorama claro das iniciativas mais impactantes e das lições aprendidas.

**Tabela 1: Sumário e Relevância Científica dos Artigos-Chave em Saúde Digital no Brasil**

|Citação Completa do Artigo|Resumo da Tecnologia e Funcionalidades|Público-Alvo Principal|Principais Conclusões (Usabilidade e Implementação)|Nº de Citações (Últimos 5 Anos)|
|---|---|---|---|---|
|**Moura Júnior, L. de A. (2021).** "A Estratégia de Saúde Digital para o Brasil 2020 - 2028." _J. Health Inform., 13_(1), I.|Plataforma nacional de dados (Rede Nacional de Dados em Saúde - RNDS) com tecnologias de nuvem pública, Blockchain e Data Lake para interoperabilidade e inovação.|Gestores, Clínicos, Pacientes, Pesquisadores|Define a arquitetura estratégica para a saúde digital no Brasil. Enfatiza a RNDS como pilar central e a necessidade de um "Espaço de Colaboração" multissetorial para o sucesso da estratégia.|**27+** 2|
|**Chagas, M. E. V., et al. (2025).** "Specialized medical care in primary care using telemedicine in Northeast Brazil: a descriptive study, Rio Grande do Norte, Brazil, 2022-2023." _Epidemiol Serv Saúde, 34_, e20240256.|Plataforma de telemedicina (TeleNordeste) para interconsultas síncronas e trianguladas (paciente, médico da APS, especialista) para cardiologia, neurologia, psiquiatria e endocrinologia.|Clínicos e Pacientes|Alta resolutividade (98.8% dos casos resolvidos na APS), reduzindo tempo de espera (mediana de 7 dias) e barreiras geográficas. Demonstra um modelo de sucesso para a integração de cuidados.|**~2** 10|
|**De Boni, R. B., et al. (2025).** "Interest, uptake, and feasibility trial of a real-life digital health intervention to improve lifestyle in Brazil." _Digit Health, 11_.|Plataforma de saúde digital (VIVA!) via PC/smartphone para mudança de estilo de vida, com desafios e pontuações para engajamento.|Pacientes|Usabilidade moderada (MARS ≈ 3). Desafio crítico com alta atrição (retenção de 4.5% em 12 semanas) e viés de adesão (mulheres, alta escolaridade), destacando a necessidade de estratégias de engajamento e equidade.|**~0-1** 32|
|**Pernencar, C., et al. (2022).** "Systematic mapping of digital health apps – A methodological proposal based on the World Health Organization classification of interventions." _Digit Health, 8_.|Proposta metodológica para mapear e analisar aplicativos de saúde com base na classificação de Intervenções de Saúde Digital (DHI) da OMS e na System Usability Scale (SUS).|Pesquisadores e Desenvolvedores|Destaca a importância de adaptar intervenções digitais ao contexto local, pois as diretrizes da OMS são abertas. Valida a System Usability Scale como método eficaz para comparar soluções de saúde digital.|**140+** 34|

## O Panorama Estratégico da Saúde Digital no Brasil: A Arquitetura da RNDS

Qualquer projeto de saúde digital concebido para o Sistema Único de Saúde (SUS) deve ser desenvolvido não como uma solução isolada, mas como um componente potencial do ecossistema nacional de saúde digital. Este ecossistema é definido e orientado pela Estratégia de Saúde Digital para o Brasil 2020-2028 (ESD28), que estabelece a arquitetura e os princípios para a transformação digital do setor. Compreender esta estrutura macro é, portanto, um pré-requisito fundamental para o design de qualquer nova tecnologia que vise relevância e sustentabilidade a longo prazo.

### A Visão da Estratégia de Saúde Digital para o Brasil (ESD28)

A ESD28 representa a consolidação de uma visão estratégica para superar a fragmentação histórica dos sistemas de informação em saúde no Brasil.1 Construída sobre as bases de iniciativas anteriores como o e-SUS e o Digisus, a estratégia visa intensificar e unificar os esforços em direção a uma plataforma nacional integrada, interoperável e centrada no cidadão.2 O documento delineia sete prioridades claras para a implementação da saúde digital, abrangendo desde a governança até a infraestrutura. De particular relevância para a adoção de novas tecnologias é a Prioridade 5, que foca na "Formação e Capacitação de Recursos Humanos".5 Este ponto reconhece que a tecnologia por si só é insuficiente; o sucesso depende da capacitação e da literacia digital dos profissionais de saúde, um fator determinante para a aceitação e o uso efetivo de novas ferramentas.

A estratégia define um público-alvo abrangente, visando beneficiar todos os atores do sistema de saúde: usuários, cidadãos, pacientes, gestores, profissionais de saúde e organizações.1 Essa amplitude estabelece um mandato claro para que novas soluções sejam projetadas com funcionalidades e níveis de usabilidade que atendam às necessidades distintas de cada um desses grupos.

### A Rede Nacional de Dados em Saúde (RNDS) como Pilar Tecnológico

No coração da ESD28 está a Rede Nacional de Dados em Saúde (RNDS), concebida para ser a plataforma digital central para inovação, troca de informações e prestação de serviços de saúde em todo o Brasil até 2028.1 A arquitetura tecnológica da RNDS é notavelmente moderna e robusta, empregando sistemas de nuvem pública, tecnologia Blockchain para segurança e integridade, e a construção de um Data Lake para a Saúde.1 Esta fundação indica uma aposta em escalabilidade, segurança e flexibilidade analítica, estabelecendo um padrão técnico com o qual novos projetos devem buscar compatibilidade.

A viabilidade e o poder da RNDS foram demonstrados de forma conclusiva durante a pandemia de COVID-19. O programa de imunização serviu como um teste de estresse em escala real e uma prova de conceito para a plataforma. A implementação bem-sucedida do aplicativo "Conecte SUS Cidadão", que forneceu um cartão de vacinação digital unificado a milhões de brasileiros, e do "Vacinômetro", que ofereceu dados de saúde pública quase em tempo real, provou a capacidade da RNDS de integrar dados de milhares de fontes distintas e entregar valor direto tanto para o paciente individual quanto para a gestão de saúde pública.1

### O Desafio da Governança e Colaboração

A ESD28 reconhece que a transformação digital não pode ser um esforço puramente governamental. O sucesso da estratégia depende da criação de um "Espaço de Colaboração" vibrante, que envolva ativamente centros de pesquisa e ensino, fornecedores de soluções tecnológicas, organizações de saúde públicas e privadas, e sociedades técnico-científicas.1 Esta visão implica que novos projetos devem ser desenvolvidos com uma mentalidade de parceria e integração, em vez de operarem em silos isolados. Embora a liderança do Ministério da Saúde seja considerada indispensável, o framework apela a uma ampla participação da sociedade, criando simultaneamente uma oportunidade para a inovação e um desafio complexo de governança e alinhamento para novas iniciativas.

A materialização deste espaço colaborativo exige a criação de uma estrutura organizacional clara, com objetivos, legislação, critérios éticos e legais, e mecanismos de financiamento que incentivem a geração de conhecimento, serviços e produtos inovadores alinhados às prioridades do SUS.1

### Implicações Estratégicas para Novos Projetos

A análise da arquitetura estratégica nacional revela duas implicações fundamentais para qualquer novo projeto de saúde digital no SUS. Primeiramente, a **interoperabilidade deve ser um princípio de design fundamental**. A ESD28 não é apenas um documento de política; é um projeto arquitetônico para o futuro da saúde digital no Brasil, com a RNDS como sua espinha dorsal.1 O sucesso do Conecte SUS, que agregou dados de vacinação de fontes municipais, estaduais e privadas em um único registro para o cidadão, é a prova viva desse modelo. Consequentemente, um novo projeto que crie um silo de dados está, por definição, desalinhado com a estratégia nacional e corre um risco elevado de se tornar obsoleto. A arquitetura do projeto deve, desde o início, prever o uso de padrões de dados (como HL7 FHIR) e APIs que permitam a comunicação e a troca de informações com a RNDS.

Em segundo lugar, as soluções digitais no SUS devem atender a um **mandato duplo**: melhorar o cuidado clínico individual e, ao mesmo tempo, fortalecer a gestão da saúde pública. A resposta à pandemia catalisou a RNDS para atender a uma crise de saúde pública, e seu primeiro grande produto de sucesso foi uma ferramenta de uso individual (o cartão de vacinação) alimentada por dados populacionais.1 Isso demonstra que o ecossistema está sendo construído para servir a esses dois propósitos simultaneamente. Um novo projeto que se concentre exclusivamente, por exemplo, no monitoramento de resultados relatados pelo paciente para acompanhamento clínico estaria perdendo uma oportunidade estratégica. O design deve considerar como esses dados, uma vez anonimizados e agregados, podem ser estruturados para apoiar os objetivos de pesquisa e vigilância epidemiológica que são centrais para a missão do SUS e da ESD28.

## Tecnologias de Suporte ao Cuidado Clínico: Lições da Telessaúde no SUS

Enquanto a ESD28 define o mapa estratégico, as implementações práticas de telessaúde oferecem lições valiosas sobre como a tecnologia pode efetivamente apoiar o cuidado clínico no dia a dia. A análise de modelos bem-sucedidos, como o Projeto TeleNordeste, demonstra que as intervenções digitais mais eficazes são aquelas que se integram e fortalecem os fluxos de trabalho e as relações clínicas existentes. Em um país com as dimensões e desigualdades do Brasil, essas tecnologias emergem como ferramentas poderosas para aumentar a resolutividade da Atenção Primária à Saúde (APS) e promover a equidade no acesso a cuidados especializados.

### O Modelo TeleNordeste: Resolutividade na Atenção Primária

O Projeto TeleNordeste, uma iniciativa desenvolvida no âmbito do Programa de Apoio ao Desenvolvimento Institucional do SUS (PROADI-SUS), serve como um estudo de caso exemplar.6 O projeto conectou centros de atenção primária em municípios do Rio Grande do Norte a médicos especialistas localizados no Rio Grande do Sul, abordando especialidades críticas como cardiologia, neurologia, psiquiatria e endocrinologia.8

A tecnologia central é uma plataforma de telemedicina segura que gerencia o registro de pacientes, o agendamento de consultas e, crucialmente, a realização de interconsultas por videoconferência de forma "triangulada".7 Este modelo envolve a participação simultânea do paciente, do médico da APS e do especialista remoto, criando um ambiente colaborativo de cuidado.

Os resultados são notáveis e demonstram um impacto profundo na organização do cuidado. O tempo médio de espera por uma consulta especializada foi reduzido para uma mediana de apenas 7 dias.9 Mais impressionante ainda, de um total de 572 pacientes atendidos, 565 (correspondendo a 98,8%) tiveram suas queixas completamente resolvidas no âmbito da atenção primária, sem a necessidade de encaminhamento para um atendimento presencial especializado.6 Este dado representa uma poderosa evidência da capacidade da tecnologia de superar barreiras geográficas e resolver um dos maiores gargalos do SUS, especialmente em regiões como o Nordeste, que historicamente sofre com uma das menores densidades de médicos por habitante do país.9

### Funcionalidades e Usabilidade para o Clínico

O sucesso do modelo TeleNordeste não reside apenas na tecnologia de videoconferência, mas no processo clínico que ela habilita. O médico da APS não é um mero intermediário, mas um participante ativo na consulta. Sob a orientação remota do especialista, ele pode realizar exames físicos, manobras diagnósticas e fornecer o contexto clínico do paciente, enriquecendo significativamente a qualidade da avaliação.8 Esta interação transforma a teleconsulta em uma poderosa ferramenta de educação continuada, capacitando o profissional da atenção primária a cada caso discutido.11

A plataforma foi projetada para se integrar ao fluxo de trabalho clínico, suportando desde o registro do paciente e o agendamento até a consulta e a evolução no prontuário.8 Essa integração é um fator chave para a sua adoção e eficácia. Outras experiências, como a do TelessaúdeRS, corroboram a importância de funcionalidades que vão além da consulta, incluindo ferramentas para telerregulação, monitoramento da qualidade e auditoria dos atendimentos, estabelecendo um ciclo de feedback essencial para a melhoria contínua dos serviços.13

### O Impacto na Gestão do Cuidado e na Equidade

O modelo TeleNordeste ataca diretamente o problema dos "vazios assistenciais" 10, um desafio estrutural do SUS causado pela concentração de especialistas nos grandes centros urbanos. Ao levar o conhecimento especializado a áreas remotas e desassistidas, a telessaúde promove a equidade no acesso, um dos princípios fundamentais do sistema.14 Ao aumentar a capacidade de resolução da atenção primária, o sistema alivia a pressão sobre os serviços de média e alta complexidade, permitindo uma alocação mais eficiente dos recursos e otimizando o fluxo de pacientes na rede de atenção à saúde.

### Implicações Estratégicas para Novos Projetos

A experiência da telessaúde no SUS oferece duas implicações cruciais para o desenvolvimento de novas ferramentas clínicas. A primeira é que o **fator "humano no circuito" (human-in-the-loop) é um elemento crítico para o sucesso**. O êxito do TeleNordeste não se deve apenas à tecnologia, mas ao processo colaborativo que ela viabiliza. O modelo de consulta triangulada preserva e fortalece a relação central entre o médico da APS e o paciente, utilizando a tecnologia como uma ponte para trazer o conhecimento do especialista.7 Este modelo, com sua taxa de resolução de 98,8% 6, contrasta fortemente com abordagens que tentam desintermediar o clínico, como visto em aplicativos de saúde autogerenciados que enfrentam taxas de atrito altíssimas. A lição é clara: no contexto do SUS, o caminho mais promissor para a saúde digital é um modelo híbrido, no qual a tecnologia capacita e amplia as relações humanas existentes, em vez de tentar substituí-las.

A segunda implicação é o reconhecimento da **tele-educação como um subproduto valioso da teleassistência**. O modelo de interconsulta fornece aprendizado implícito e baseado em casos reais para os médicos da atenção primária, aumentando suas competências e confiança ao longo do tempo. Estudos sobre o tema confirmam que os médicos participantes demonstram uma "forte intenção de aplicar o conhecimento adquirido" e que as teleconsultas promovem "educação e treinamento contínuos".11 Isso significa que a plataforma não é apenas uma ferramenta de prestação de serviços, mas também um motor escalável de desenvolvimento profissional contínuo. Este benefício educacional representa um retorno sobre o investimento significativo e muitas vezes subestimado, e deve ser uma consideração de design central para qualquer novo projeto digital voltado para clínicos no SUS.

## Intervenções Digitais Direcionadas ao Paciente: O Desafio do Engajamento e da Equidade

Se a telessaúde mediada por profissionais demonstra um caminho de sucesso, as intervenções digitais diretas ao paciente (DHI - Digital Health Interventions) apresentam um cenário mais complexo e desafiador. A análise crítica de aplicativos de saúde voltados para o autogerenciamento, como o aplicativo VIVA!, revela que a usabilidade técnica, embora necessária, é insuficiente para garantir o sucesso. A verdadeira barreira reside nos problemas mais difíceis de engajamento sustentado, mudança de comportamento e, crucialmente, no design equitativo que reconheça e aborde a profunda desigualdade digital e social presente na população usuária do SUS.

### O Estudo de Viabilidade do App VIVA!

O estudo da plataforma VIVA! oferece um olhar sóbrio e baseado em evidências sobre os desafios das DHIs no Brasil. O VIVA! foi concebido como uma intervenção de saúde digital, acessível via PC ou smartphone, com o objetivo de promover mudanças de estilo de vida (como dieta e atividade física) entre usuários do SUS no Rio de Janeiro.15

A fase de recrutamento mostrou um interesse inicial promissor: de 3.812 indivíduos alcançados, 27,2% expressaram interesse em participar. Desses, 65,4% efetivamente se inscreveram, resultando em 401 participantes no estudo.15 Esses números, no entanto, já indicam um funil com perdas significativas em cada etapa, sugerindo que mesmo a fase de adesão inicial é um obstáculo para uma parcela considerável da população-alvo.

### A Dura Realidade da Usabilidade e Retenção

A avaliação de usabilidade do aplicativo foi realizada utilizando a _Mobile App Rating Scale_ (MARS), uma ferramenta validada para essa finalidade. O VIVA! obteve pontuações modestas, com uma média de aproximadamente 3 em uma escala de 5. O quesito com a maior nota foi a estética, indicando que o aplicativo era visualmente agradável, mas possivelmente deficiente em outras dimensões da experiência do usuário, como funcionalidade ou engajamento.15

Contudo, os dados de retenção e adesão são os mais alarmantes e reveladores. A taxa de retenção de usuários após 12 semanas foi de apenas 4,5%. A taxa média de adesão aos desafios propostos pelo aplicativo foi de 11,2%.15 Estes resultados são um balde de água fria na expectativa de que um aplicativo, por si só, possa sustentar uma mudança de comportamento a longo prazo. Eles expõem a imensa dificuldade de manter os usuários engajados em intervenções de saúde autogerenciadas, um fenômeno amplamente documentado na literatura internacional, mas aqui quantificado no contexto do SUS.

### O Viés Sociodemográfico e a Questão da Equidade

Talvez a descoberta mais crítica do estudo VIVA! seja o perfil demográfico dos participantes que aderiram e se engajaram. A esmagadora maioria era composta por mulheres (73,3%) e, notavelmente, por indivíduos com ensino superior (61,6%).15 Este é um exemplo clássico de como a "exclusão digital" se manifesta na prática. Uma intervenção projetada para a população geral do SUS acaba sendo desproporcionalmente utilizada por um subgrupo que já possui mais recursos educacionais e, possivelmente, maior literacia digital e em saúde.

A conclusão do estudo serve como um aviso contundente: se as desigualdades de acesso digital e de literacia não forem ativamente abordadas no design das intervenções, as DHIs correm o risco real de não apenas falhar em atingir as populações mais vulneráveis, mas de exacerbar as iniquidades em saúde já existentes.15

### Implicações Estratégicas para Novos Projetos

A experiência do VIVA! gera duas implicações profundas para o design de projetos digitais voltados para pacientes no SUS. A primeira é que **o engajamento é um problema muito mais difícil de resolver do que a usabilidade**. O aplicativo VIVA! tinha uma usabilidade aceitável, mas isso não se traduziu em retenção ou adesão.15 Isso significa que uma interface intuitiva e sem atritos é apenas o requisito mínimo para entrar no jogo. O verdadeiro desafio está em projetar para a motivação, a mudança de comportamento e a percepção de valor a longo prazo. Isso exige uma abordagem que vá além do design de UI/UX e incorpore profundamente os princípios da ciência comportamental, como o uso de técnicas de mudança de comportamento (BCTs) baseadas em evidências, personalização, feedback significativo e suporte social.17

A segunda implicação é que **uma abordagem digital "tamanho único" é inerentemente inequitativa no contexto do SUS**. O viés demográfico observado no estudo VIVA! não é uma anomalia, mas um resultado previsível de uma estratégia de implementação genérica.15 Isso prova que uma intervenção digital padrão será mais acessível e utilizável por aqueles que já possuem os mais altos níveis de capital social, educacional e digital. O SUS é fundamentado nos princípios da universalidade e da equidade. Para que um projeto digital esteja verdadeiramente alinhado a esses princípios, ele deve incorporar estratégias de design específicas para promover a equidade. Isso pode incluir o desenvolvimento de interfaces multimodais (por exemplo, funcionalidades baseadas em SMS ou voz para usuários com baixa literacia), conteúdo culturalmente adaptado e, de forma crucial, a integração da ferramenta digital com o trabalho de agentes comunitários de saúde ou equipes da APS, que podem apoiar a adesão e o uso por pacientes menos familiarizados com a tecnologia. O projeto não pode simplesmente estar "disponível" para todos; ele deve ser projetado para ser

_acessível_, _compreensível_ e _eficaz_ para todos.

## A Usabilidade como Fator Crítico de Sucesso: Frameworks e Evidências

A usabilidade é um pilar fundamental para a adoção e o sucesso de qualquer tecnologia de saúde digital. As experiências brasileiras e internacionais convergem na necessidade de uma avaliação rigorosa e multifacetada da usabilidade, combinando métricas quantitativas padronizadas com insights qualitativos e contextuais. A utilização de frameworks estabelecidos, como os da Organização Mundial da Saúde (OMS), fornece uma base sistemática para analisar e projetar intervenções eficazes e adequadas ao complexo ambiente do SUS.

### Frameworks Quantitativos em Ação

A avaliação da usabilidade no contexto da saúde digital no Brasil tem se beneficiado da aplicação de ferramentas quantitativas validadas internacionalmente.

- **System Usability Scale (SUS):** Esta escala é amplamente reconhecida e foi citada em um estudo brasileiro como um método eficaz para comparar diferentes soluções de saúde digital.19 Sua aplicação no benchmarking de aplicativos relacionados à COVID-19 no Brasil permitiu uma comparação padronizada entre diferentes soluções, oferecendo uma pontuação única e de fácil interpretação.20 Em outro estudo, focado em um aplicativo para pacientes com doenças crônicas, a escala SUS foi utilizada para avaliar a percepção dos usuários, que relataram um alto nível de usabilidade, demonstrando a aplicabilidade da ferramenta para medir a facilidade de uso em projetos no contexto nacional.22
    
- **Mobile App Rating Scale (MARS):** Utilizada no ensaio clínico do aplicativo VIVA!, a MARS oferece uma avaliação mais detalhada e multidimensional do que a escala SUS.15 Ela não mede apenas a usabilidade percebida, mas também avalia a qualidade do aplicativo em domínios como engajamento, funcionalidade, estética e qualidade da informação. A aplicação da MARS no estudo VIVA! permitiu identificar que, embora a estética do aplicativo fosse bem avaliada, outras áreas poderiam ser deficientes, fornecendo um diagnóstico mais granular para futuras melhorias.
    

### A Perspectiva Internacional: As Diretrizes da OMS

A Organização Mundial da Saúde (OMS) oferece uma "Classificação de intervenções de saúde digital (DHI)" que serve como um framework conceitual robusto para o planejamento e a análise de projetos.19 Esta classificação ajuda a categorizar as funcionalidades de uma solução digital com base em seu público-alvo (clientes/pacientes, profissionais de saúde, gestores do sistema de saúde) e no desafio específico do sistema de saúde que ela se propõe a resolver.

O estudo de Pernencar et al. (2022), que realizou um mapeamento sistemático de aplicativos de saúde no Brasil, demonstrou como a classificação da OMS pode ser usada para conduzir uma análise do estado da arte de forma estruturada e comparável.20 Uma das conclusões mais importantes deste trabalho, que obteve alta repercussão científica, é que as diretrizes da OMS são intencionalmente "abertas" e devem ser adaptadas ao contexto local.19 Isso reforça que a simples importação de uma solução que funciona em outro país, sem uma adaptação cuidadosa às realidades dos fluxos de trabalho, infraestrutura e cultura do SUS, tem alta probabilidade de fracassar.

### Além das Métricas: O Design Centrado no Usuário (UCD)

A abordagem metodológica proposta por Pernencar et al. (2022) não se baseou apenas em métricas e classificações, mas foi fundamentada nos princípios do Design Centrado no Usuário (UCD).19 O UCD é um processo de design iterativo que foca na compreensão profunda das necessidades, objetivos e contextos dos usuários finais desde as fases iniciais do projeto, geralmente por meio de estudos de campo, entrevistas e testes de usabilidade.

Esta abordagem contrasta com um modelo de desenvolvimento que cria um produto e o avalia apenas no final. A filosofia do UCD está diretamente alinhada com os desafios identificados no estudo VIVA!, cuja análise post-mortem apontou a necessidade de "melhorias iterativas" e de estratégias mais eficazes para sustentar o engajamento.15 Um processo de UCD teria como objetivo descobrir essas necessidades e testar soluções para elas durante o desenvolvimento, e não após o lançamento, aumentando significativamente as chances de sucesso do produto final.

### Implicações Estratégicas para Novos Projetos

A análise dos frameworks de usabilidade aponta para duas implicações estratégicas. A primeira é a necessidade de uma **abordagem triangulada para a avaliação da usabilidade**. Confiar em uma única métrica, como uma pontuação SUS, é insuficiente. Uma estratégia de avaliação robusta deve combinar múltiplas fontes de evidência: escalas quantitativas (como SUS e MARS) para benchmarking e monitoramento ao longo do tempo; métodos qualitativos (como entrevistas com usuários e estudos observacionais) para entender o "porquê" por trás dos números e descobrir problemas de usabilidade não antecipados; e uma estrutura de classificação sistemática, como a da OMS, para garantir que as funcionalidades avaliadas estejam alinhadas com os objetivos estratégicos.

A segunda implicação, e talvez a mais importante, é que **o "contexto é rei"**. A conclusão do trabalho altamente citado de Pernencar et al. sobre a necessidade de adaptação local não é uma observação trivial, mas um princípio de design fundamental.19 O SUS é um sistema de saúde único, complexo e extremamente heterogêneo. Uma ferramenta digital que funciona perfeitamente em um sistema de saúde privado ou em outro país pode falhar drasticamente no Brasil devido a diferenças nos fluxos de trabalho clínicos, nos níveis de literacia dos pacientes, na disponibilidade de infraestrutura de internet em áreas rurais ou na diversidade cultural. Portanto, a fase inicial de qualquer novo projeto deve incluir uma pesquisa formativa significativa — estudos de campo, observação e entrevistas com os usuários-alvo em seus ambientes reais de prática no SUS — para garantir que a solução proposta seja verdadeiramente adequada ao seu propósito e contexto.

## O Ecossistema de Dados em Saúde para Pesquisa: Potencialidades e Barreiras

Para o público de pesquisadores, o advento da saúde digital no Brasil representa uma transição de um cenário de dados fragmentados e de difícil acesso para um futuro promissor de dados integrados e de alta granularidade. A evolução do legado do DATASUS para a arquitetura unificada da Rede Nacional de Dados em Saúde (RNDS) tem o potencial de revolucionar a pesquisa em saúde no país. No entanto, a concretização desse potencial depende da superação de barreiras técnicas, de governança e culturais que ainda persistem.

### O Legado do DATASUS: Potencial e Limitações

O Departamento de Informática do SUS (DATASUS) é, historicamente, a maior e mais importante fonte de informações sobre o sistema de saúde brasileiro, possibilitando inúmeros estudos epidemiológicos e de gestão.23 Contudo, a utilização de seus bancos de dados para pesquisa é marcada por limitações significativas.

Uma revisão de escopo sobre o uso de dados do DATASUS em pesquisa cirúrgica, cujas conclusões são amplamente aplicáveis a outras áreas, identificou quatro domínios predominantes de problemas: a **falta de dados**, com campos essenciais frequentemente não preenchidos; a **confiabilidade questionável** das informações registradas; a **baixa precisão** dos dados; e, talvez o maior obstáculo, a **falta de integralização dos dados** entre os diversos sistemas de informação (por exemplo, SIA, SIH, SINAN), o que dificulta o acompanhamento da jornada completa do paciente no sistema.23

### A Promessa da RNDS para a Pesquisa

A RNDS, conforme delineada na ESD28, foi projetada especificamente para resolver o problema central da fragmentação de dados.1 Ao criar um repositório nacional unificado, a RNDS promete oferecer aos pesquisadores uma visão longitudinal e integrada da saúde do paciente. A escolha de uma arquitetura de Data Lake é particularmente estratégica para a pesquisa. Diferente de um banco de dados relacional tradicional, um Data Lake pode armazenar grandes volumes de dados em seus formatos nativos, tanto estruturados (como dados de exames) quanto não estruturados (como notas clínicas em texto livre).1

Esta flexibilidade abre a porta para análises muito mais sofisticadas, incluindo a aplicação de técnicas de _machine learning_, processamento de linguagem natural e outras abordagens de _big data_. O objetivo final é viabilizar uma "medicina de precisão" em escala nacional e alavancar o vasto potencial de dados gerados por prontuários eletrônicos e pela crescente "internet das coisas" (dispositivos vestíveis, monitores remotos, etc.) para a geração de conhecimento.24

### Barreiras Estruturais, Técnicas e de Governança

Apesar do enorme potencial, a transição para este novo ecossistema de dados enfrenta barreiras significativas em múltiplas frentes.

- **Barreiras de Acesso e Qualidade:** Problemas estruturais do SUS, como a sobrecarga de trabalho dos profissionais, a falta de pessoal e a fragmentação dos serviços, impactam diretamente a qualidade dos dados na origem. Registros incompletos ou imprecisos nos pontos de atendimento são uma barreira fundamental para a qualidade dos dados agregados.25
    
- **Barreiras de Governança e Privacidade:** A concentração de dados de saúde sensíveis em um repositório nacional levanta questões críticas de privacidade e segurança.24 É imperativo o desenvolvimento de estruturas de governança de dados robustas, com diretrizes éticas claras e mecanismos legais (em conformidade com a Lei Geral de Proteção de Dados - LGPD) que regulem o acesso e o uso desses dados por pesquisadores, garantindo a proteção da privacidade do cidadão.
    
- **Barreiras Culturais e de Capacitação:** Frequentemente, observa-se uma cultura organizacional que não valoriza o uso de dados para a tomada de decisão, especialmente em nível municipal, e uma "pouca intimidade" dos gestores com os sistemas de informação.27 Essa barreira se estende à comunidade de pesquisa, que precisará desenvolver novas competências para explorar o potencial do
    
    _big data_ em saúde. A proficiência em linguagens de programação como R e Python e em metodologias de ciência de dados se tornará cada vez mais essencial.24
    

### Implicações Estratégicas para Novos Projetos

Duas implicações principais emergem para projetos que visam gerar dados para pesquisa no SUS. A primeira é que **a RNDS é uma condição necessária, mas não suficiente, para a pesquisa de alta qualidade**. Enquanto a arquitetura da RNDS promete resolver o problema _técnico_ da fragmentação de dados que aflige o DATASUS 23, ela não resolve automaticamente os problemas

_humanos e de processo_ que geram dados de baixa qualidade na ponta. O princípio de "lixo entra, lixo sai" (_garbage in, garbage out_) continua sendo um risco massivo. Para os pesquisadores, isso significa que, mesmo com a RNDS, etapas rigorosas de limpeza, validação e cautela metodológica continuarão sendo indispensáveis. Uma funcionalidade valiosa para um novo projeto seria, portanto, a criação de painéis de controle de qualidade de dados para os clínicos, oferecendo feedback sobre a completude de seus registros e incentivando uma melhor coleta de dados na fonte.

A segunda implicação é que estamos diante de um **novo paradigma para a pesquisa em saúde no Brasil**. A mudança da análise de bancos de dados administrativos isolados (DATASUS) para a consulta a um Data Lake nacional de saúde (RNDS) representa uma transformação fundamental. Isso exigirá que os pesquisadores desenvolvam novos conjuntos de habilidades e criará oportunidades para tipos de investigação que antes eram impossíveis. Para um novo projeto digital, a funcionalidade para o usuário "pesquisador" não pode se limitar a um simples botão de "exportar dados". A visão deve ser mais ambiciosa: oferecer um ambiente analítico seguro, em _sandbox_, com ferramentas pré-instaladas e APIs que permitam pesquisas computacionais avançadas e em larga escala, ao mesmo tempo em que se preserva rigorosamente a privacidade dos pacientes.

## Síntese e Recomendações Estratégicas para o Projeto

A análise abrangente do estado da arte da saúde digital no contexto do SUS revela um cenário de grande potencial, mas também de desafios complexos. A convergência de uma estratégia nacional ambiciosa, lições aprendidas com implementações práticas e uma compreensão mais profunda das necessidades dos usuários permite a formulação de recomendações estratégicas para orientar o desenvolvimento de um novo projeto. O sucesso dependerá da capacidade de navegar pela interação entre tecnologia, processos clínicos e o fator humano, construindo não uma ferramenta isolada, mas um componente conectado, equitativo e capacitador da infraestrutura de saúde digital do Brasil.

### Síntese dos Temas Transversais

Quatro temas transversais emergem consistentemente da análise das evidências:

1. **O Híbrido é Superior:** Modelos que utilizam a tecnologia para capacitar e conectar profissionais de saúde e pacientes (como o TeleNordeste) demonstram eficácia e resolutividade muito superiores a modelos puramente tecnológicos e autogerenciados (como o VIVA!), que sofrem com baixíssimo engajamento.
    
2. **Design para a Equidade:** Uma abordagem "tamanho único" está fadada a falhar na população diversa do SUS e pode aprofundar as desigualdades existentes. O projeto deve incorporar, desde sua concepção, estratégias proativas para atender usuários com diferentes níveis de literacia digital e em saúde.
    
3. **Interoperabilidade como Pré-requisito:** O alinhamento com a arquitetura e os padrões da Rede Nacional de Dados em Saúde (RNDS) não é uma opção, mas um imperativo estratégico para garantir a relevância, a escalabilidade e o impacto do projeto a longo prazo.
    
4. **Dados com Dupla Finalidade:** Os dados gerados pela plataforma devem ser estruturados desde o início para servir a dois propósitos: apoiar a tomada de decisão clínica imediata e, secundariamente, alimentar a pesquisa e a gestão de saúde pública de forma segura e anonimizada.
    

### Recomendações para Funcionalidades e Usabilidade (Por Público-Alvo)

Com base nesses temas, as seguintes recomendações específicas são propostas para cada público-alvo do projeto:

#### Para Pacientes:

- **Fomentar a Aliança Terapêutica Digital:** Priorizar funcionalidades que conectem o paciente à sua equipe de saúde (médico, enfermeiro, agente comunitário), em vez de isolá-lo com um aplicativo. Ferramentas de comunicação segura e a capacidade de compartilhar dados com profissionais de confiança são essenciais para construir o que pode ser chamado de "aliança terapêutica digital".
    
- **Incorporar Ciência Comportamental:** Ir além da gamificação superficial (pontos e medalhas) e integrar técnicas de mudança de comportamento baseadas em evidências, como o estabelecimento de metas personalizadas e colaborativas, feedback acionável e módulos de suporte social que conectem pacientes com pares.
    
- **Estratégia de Comunicação Multimodal:** Para combater a exclusão digital, o projeto deve planejar uma estratégia de comunicação que não dependa exclusivamente de um smartphone moderno. Isso pode incluir notificações via SMS, interfaces simplificadas e, fundamentalmente, a integração com os fluxos de trabalho dos agentes comunitários de saúde, que podem atuar como facilitadores e apoiadores do uso da tecnologia no território.
    

#### Para Clínicos:

- **Painel de Controle Clínico Acionável:** Projetar um painel de visualização que traduza os dados gerados pelos pacientes em insights clínicos rápidos e acionáveis, em vez de apresentar fluxos de dados brutos. O objetivo é otimizar o tempo do profissional e apoiar a tomada de decisão.
    
- **"Prescrição" de Cuidado Digital:** Desenvolver ferramentas que permitam ao clínico "prescrever" planos de cuidado, conteúdos educacionais ou metas específicas para o paciente através da plataforma, integrando a ferramenta digital ao plano terapêutico formal.
    
- **Comunicação Integrada e Feedback de Qualidade:** Incorporar ferramentas de comunicação que facilitem a interação com pacientes e outros especialistas, espelhando os aspectos de sucesso do modelo TeleNordeste. Adicionalmente, implementar mecanismos de feedback sobre a qualidade dos dados registrados, incentivando o preenchimento completo e preciso das informações que alimentarão a pesquisa.
    

#### Para Pesquisadores:

- **Arquitetura de Dados "Pronta para Pesquisa":** Desde o início, a arquitetura do banco de dados deve ser planejada para a reutilização em pesquisa. Isso inclui a criação de dicionários de dados claros, a adesão a padrões de terminologia (como SNOMED CT ou LOINC) e o desenvolvimento de protocolos de anonimização e de-identificação que sejam robustos e conformes com a LGPD.
    
- **Modelo de Acesso Seguro e Avançado:** Em vez de oferecer apenas a exportação de arquivos CSV, o projeto deve vislumbrar um modelo de acesso a dados mais sofisticado e seguro. Uma possibilidade é a criação de um ambiente analítico em _sandbox_, onde pesquisadores autorizados possam executar suas análises em dados de-identificados sem a necessidade de extraí-los, garantindo maior segurança e controle.
    
- **Funcionalidades de Vinculação de Dados:** Projetar o sistema de forma que os dados gerados pela plataforma possam, no futuro, ser vinculados a outras fontes de dados dentro da RNDS. Isso permitirá a condução de estudos mais ricos e abrangentes, que cruzem dados clínicos, genômicos, sociais e comportamentais.
    

### Conclusão: Posicionando o Projeto para o Sucesso no Ecossistema de Saúde Digital do Brasil

Em suma, o caminho para o desenvolvimento de uma solução de saúde digital de sucesso no Brasil não é construir uma "ilha" tecnológica, por mais avançada que seja. O sucesso depende da capacidade do projeto de se posicionar como um cidadão responsável e colaborativo dentro do ecossistema de saúde digital emergente do país. Isso exige um compromisso profundo com a interoperabilidade alinhada à RNDS, um design centrado no ser humano que fortaleça as relações de cuidado em vez de substituí-las, uma dedicação inabalável à equidade para alcançar os mais vulneráveis, e uma visão de futuro que reconheça cada interação clínica como uma oportunidade para gerar conhecimento. Ao abraçar essa complexidade, o projeto pode transcender a mera entrega de funcionalidades e contribuir significativamente para a construção de um Sistema Único de Saúde mais eficiente, equitativo e inteligente.