# Agenda Pet Shop

Aplicação web responsiva para gerenciamento de agendamentos em pet shop, desenvolvida com HTML, CSS e JavaScript puros. O projeto permite visualizar a agenda por data, cadastrar novos atendimentos em um modal acessível, organizar automaticamente os horários por período do dia e remover agendamentos existentes sem recarregar a página. 

## Visão geral

O sistema foi criado com foco em uma experiência intuitiva tanto no desktop quanto no mobile. A interface apresenta um cabeçalho com identidade visual do projeto, seletor de tema, botão de novo agendamento, painel de resumo do dia e três seções principais da agenda: manhã, tarde e noite. 

Cada seção possui ícone, nome do período e faixa de horário, enquanto cada atendimento mostra horário, nome do pet, nome do tutor, telefone e descrição do serviço. Os dados são organizados dinamicamente no lado do cliente, sem dependência de backend. 

## Objetivo do projeto

Este projeto foi desenvolvido para simular uma agenda digital de atendimentos para um pet shop. A proposta central é facilitar o controle dos compromissos diários, reduzindo conflitos de horário e tornando o fluxo de cadastro e exclusão mais rápido para o usuário. 

Além do aspecto funcional, o projeto também foi pensado como exercício de boas práticas de front-end, incluindo responsividade, acessibilidade, estrutura semântica, feedback visual e manipulação dinâmica do DOM com JavaScript. 

## Funcionalidades

- Visualização dos agendamentos separados por manhã, tarde e noite. 
- Exibição da agenda por data selecionada no topo da interface. 
- Cadastro de novos atendimentos via modal. 
- Ordenação automática dos agendamentos por horário dentro da seção correta. 
- Remoção imediata de qualquer agendamento existente. 
- Validação de campos obrigatórios no formulário. 
- Bloqueio de horários fora da janela permitida entre 06:00 e 22:00. 
- Prevenção de conflitos, impedindo dois agendamentos no mesmo horário para a mesma data. 
- Exibição de mensagens de erro claras por campo inválido. 
- Interface adaptada para dispositivos móveis e desktops. 
- Suporte a tema claro e escuro com alternância manual. 

## Requisitos implementados

| Requisito | Implementação |
|---|---|
| Visualizar agenda | A tela principal renderiza os compromissos do dia selecionado em listas por período.  |
| Agrupamento por seção | Os atendimentos são distribuídos automaticamente em Manhã, Tarde e Noite.  |
| Card da seção | Cada bloco possui ícone, nome do período e faixa horária.  |
| Dados do agendamento | Cada item mostra horário, pet, tutor, telefone e descrição do serviço.  |
| Novo agendamento | O botão “Novo agendamento” abre um modal com formulário completo.  |
| Fechamento do modal | O modal pode ser fechado ao cancelar, concluir ou pressionar escape com tratamento apropriado.  |
| Foco inicial | O primeiro campo do formulário recebe foco logo após a abertura do modal.  |
| Troca de data | Alterar a data do topo atualiza imediatamente a agenda exibida.  |
| Exclusão de item | O botão de remoção exclui a linha instantaneamente da interface.  |
| Regra de conflito | O JavaScript impede cadastro duplicado no mesmo horário e mesma data.  |
| Validação obrigatória | Todos os campos principais são validados antes do envio.  |
| Restrição de horário | Apenas horários entre 06:00 e 22:00 são aceitos.  |

## Estrutura da interface

A interface foi dividida em áreas bem definidas para melhorar legibilidade e navegação. O cabeçalho reúne a marca, o botão de troca de tema e a ação principal de cadastrar um novo horário, enquanto a área superior do conteúdo mostra resumo do dia e controle de data. 

Abaixo dessa área, a agenda aparece em três cards principais. Cada card representa um período do dia e recebe os agendamentos conforme a hora selecionada pelo usuário no cadastro. 

### Seções visuais principais

- **Header:** logo em SVG, título da aplicação, alternância de tema e botão de novo agendamento. 
- **Resumo do dia:** data selecionada, quantidade total de compromissos e próximo atendimento. 
- **Controle de data:** campo de seleção da agenda e botão para voltar para hoje. 
- **Agenda:** cards de manhã, tarde e noite com lista dinâmica de atendimentos. 
- **Modal:** formulário completo com validação em linha. 

## Regras de negócio

As regras principais ficam concentradas no JavaScript da aplicação. Quando o usuário envia o formulário, os dados passam por validação de preenchimento obrigatório, verificação de telefone, análise do intervalo permitido de horário e checagem de conflito com outros agendamentos da mesma data. 

Depois de validado, o compromisso é inserido na lista em memória, reposicionado conforme o horário e exibido no período correspondente. Caso a data exibida seja alterada, a tela recalcula apenas os itens daquele dia e atualiza os indicadores do resumo. 

### Faixas de horário

| Período | Horário |
|---|---|
| Manhã | 06:00 às 11:59  |
| Tarde | 12:00 às 17:59  |
| Noite | 18:00 às 22:00  |

## Tecnologias utilizadas

O projeto foi construído sem frameworks, com foco em fundamentos do front-end. Toda a aplicação está em um único arquivo HTML com estilos embutidos e script JavaScript responsável pelas interações e atualizações dinâmicas da agenda. 

### Stack

- HTML5 semântico. 
- CSS3 com variáveis, `clamp()`, media queries e `color-mix()`. 
- JavaScript Vanilla para manipulação do DOM, validação, ordenação e controle do modal. 
- Fonte Satoshi via Fontshare. 
- SVG inline para identidade visual e ícones principais. 

## Responsividade

A aplicação foi planejada para funcionar bem em diferentes larguras de tela. Em resoluções menores, o layout da área principal muda de duas colunas para uma coluna, os cards se reorganizam, o formulário do modal passa a uma coluna e os blocos de agendamento deixam de usar três colunas para priorizar leitura e toque. 

Também foram aplicadas medidas importantes para mobile, como botões com área mínima confortável, espaçamentos consistentes, inputs com boa altura e hierarquia visual clara. 

## Acessibilidade

Alguns cuidados de acessibilidade foram incorporados diretamente na interface. A página possui link de pular para o conteúdo, elementos semânticos como `header`, `main`, `section`, `article` e `dialog`, estados de foco visíveis e uso de `aria-label` em botões icônicos. 

O modal bloqueia o fundo visualmente com `backdrop`, recebe foco inicial no primeiro campo e permite fechamento controlado. Além disso, as mensagens de feedback e erros ajudam o usuário a entender o resultado das ações realizadas. 

## Organização do código

A estrutura foi mantida simples para facilitar leitura e estudo. O arquivo principal concentra três camadas: marcação HTML para a estrutura, CSS para estilo e responsividade, e JavaScript para estado, eventos e regras da agenda. 

### Blocos principais do JavaScript

- Controle de tema claro/escuro. 
- Definição dos dados iniciais de exemplo. 
- Funções utilitárias para data, período e telefone. 
- Função de renderização da agenda por data. 
- Funções de abertura e fechamento do modal. 
- Validação dos campos do formulário. 
- Inserção, ordenação e exclusão de agendamentos. 
- Feedback visual para ações concluídas. 

## Como executar o projeto

Como se trata de uma aplicação estática, a execução é simples. Basta baixar o arquivo HTML e abri-lo em qualquer navegador moderno. 

### Passo a passo

1. Clone este repositório.
2. Acesse a pasta do projeto.
3. Abra o arquivo `petshop-agenda.html` no navegador.

Também é possível utilizar extensões como Live Server no VS Code para uma experiência de desenvolvimento mais prática. 

## Estrutura sugerida do repositório

```text
petshop-agenda/
├── README.md
└── petshop-agenda.html
```

A aplicação foi entregue em arquivo único para simplificar portabilidade e testes. Isso facilita compartilhar, publicar no GitHub Pages ou adaptar futuramente para uma estrutura com arquivos separados. 

## Fluxo de uso

1. O usuário escolhe ou confirma a data da agenda no topo da página. 
2. A aplicação mostra apenas os agendamentos cadastrados para aquela data. 
3. Ao clicar em “Novo agendamento”, o modal é aberto com foco no primeiro campo. 
4. O formulário solicita tutor, pet, telefone, serviço, data e hora. 
5. O sistema valida os campos e impede horários inválidos ou conflitantes. 
6. Após salvar, o item aparece imediatamente na seção correta e em ordem cronológica. 
7. Caso o usuário remova um atendimento, a linha desaparece instantaneamente. 

## Pontos fortes do projeto

Este projeto se destaca por combinar simplicidade de implementação com uma boa experiência de uso. Mesmo sendo uma aplicação sem backend, ela entrega um fluxo completo de visualização, cadastro, validação e remoção de compromissos, com interface moderna e adaptável. 

Outro ponto forte é o uso de recursos atuais do CSS e de JavaScript sem bibliotecas externas pesadas. Isso torna o código mais fácil de estudar, manter e evoluir. 

## Melhorias futuras

Há várias possibilidades de evolução para transformar esta interface em uma solução mais robusta. Algumas sugestões:

- Persistir os dados com `localStorage` ou integração com API. 
- Adicionar edição de agendamentos já existentes. 
- Incluir filtros por serviço, tutor ou pet. 
- Implementar busca rápida na agenda. 
- Criar autenticação para funcionários do pet shop. 
- Adicionar confirmação visual antes da exclusão. 
- Separar o projeto em arquivos `index.html`, `style.css` e `script.js`. 
- Conectar com banco de dados e painel administrativo. 

## Aprendizados demonstrados

O projeto demonstra domínio prático de conceitos importantes de desenvolvimento front-end. Entre eles estão manipulação de DOM, eventos, formulários, responsividade, componentização visual por seções, acessibilidade básica e aplicação de regras de negócio no cliente. 

Também evidencia a capacidade de transformar requisitos funcionais em uma interface utilizável e organizada, com atenção ao comportamento esperado em diferentes dispositivos. 

## Licença

Este projeto pode ser utilizado como base de estudo, portfólio ou adaptação para projetos acadêmicos e pessoais. Recomenda-se adicionar uma licença explícita no repositório, como MIT, caso o objetivo seja disponibilizar o código publicamente para reutilização.
