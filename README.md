# Agenda Pet Shop

🔗 **[Abrir o projeto](https://pedrozxx.github.io/Mundo-Pet/)**

Aplicação web responsiva para gerenciamento de agendamentos em pet shop, desenvolvida com HTML, CSS e JavaScript puros. O projeto permite visualizar a agenda por data, cadastrar novos atendimentos em um modal acessível, organizar automaticamente os horários por período do dia e remover agendamentos existentes sem recarregar a página. 

## Visão geral

O sistema foi criado com foco em uma experiência intuitiva tanto no desktop quanto no mobile. A interface apresenta um cabeçalho com identidade visual do projeto, seletor de tema, botão de novo agendamento, painel de resumo do dia e três seções principais da agenda: manhã, tarde e noite. 

Cada seção possui ícone, nome do período e faixa de horário, enquanto cada atendimento mostra horário, nome do pet, nome do tutor, telefone e descrição do serviço. Os dados são organizados dinamicamente no lado do cliente, sem dependência de backend. 

<img width="1895" height="941" alt="mundo pet " src="https://github.com/user-attachments/assets/6bdeee57-2440-4d81-bb33-4fa16a4d61a4" />


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


## Estrutura da interface

A interface foi dividida em áreas bem definidas para melhorar legibilidade e navegação. O cabeçalho reúne a marca, o botão de troca de tema e a ação principal de cadastrar um novo horário, enquanto a área superior do conteúdo mostra resumo do dia e controle de data. 

Abaixo dessa área, a agenda aparece em três cards principais. Cada card representa um período do dia e recebe os agendamentos conforme a hora selecionada pelo usuário no cadastro. 

## Regras de negócio

As regras principais ficam concentradas no JavaScript da aplicação. Quando o usuário envia o formulário, os dados passam por validação de preenchimento obrigatório, verificação de telefone, análise do intervalo permitido de horário e checagem de conflito com outros agendamentos da mesma data. 

Depois de validado, o compromisso é inserido na lista em memória, reposicionado conforme o horário e exibido no período correspondente. Caso a data exibida seja alterada, a tela recalcula apenas os itens daquele dia e atualiza os indicadores do resumo. 

### Stack

- HTML5 semântico. 
- CSS3 com variáveis, `clamp()`, media queries e `color-mix()`. 
- JavaScript Vanilla para manipulação do DOM, validação, ordenação e controle do modal. 
- Fonte Satoshi via Fontshare. 
- SVG inline para identidade visual e ícones principais. 


## Organização do código

A estrutura foi mantida simples para facilitar leitura e estudo. O arquivo principal concentra três camadas: marcação HTML para a estrutura, CSS para estilo e responsividade, e JavaScript para estado, eventos e regras da agenda. 

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

## Licença

Este projeto pode ser utilizado como base de estudo, portfólio ou adaptação para projetos acadêmicos e pessoais. Recomenda-se adicionar uma licença explícita no repositório, como MIT, caso o objetivo seja disponibilizar o código publicamente para reutilização.

## Licenca

Distribuido sob a licenca MIT. Veja [`LICENSE`](LICENSE) para mais detalhes.

## Autor

**Pedro Augusto Darolt** - [GitHub](https://github.com/pedrozxx) - [LinkedIn](https://www.linkedin.com/in/pedro-darolt/) - pedrocod.dev@gmail.com
