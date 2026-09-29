# Mundo Pet — agenda de atendimentos

Demonstração de uma agenda de pet shop em HTML, CSS e JavaScript, com validação de formulário, conflito de horários e persistência no navegador.

[Abrir demonstração](https://pedrozxx.github.io/Mundo-Pet/) · [Testes](https://github.com/pedrozxx/Mundo-Pet/actions/workflows/ci.yml)

## Funcionalidades

- Consultar a agenda por data, organizada em manhã, tarde e noite.
- Cadastrar e remover atendimentos, com nome do pet, tutor, telefone e serviço.
- Bloquear dois atendimentos no mesmo horário e data.
- Validar campos obrigatórios, telefone e janela de 06:00 a 22:00.
- Alternar tema e salvar dados em `localStorage`.

É uma demonstração local: **não tem servidor, login, sincronização ou backup**. Use dados fictícios. Os registros ficam associados ao navegador e à origem do site, e podem desaparecer se o armazenamento for limpo ou bloqueado.

## Executar

```bash
git clone https://github.com/pedrozxx/Mundo-Pet.git
cd Mundo-Pet
```

Abra `index.html` em um navegador moderno. Para usar uma origem HTTP estável, abra a pasta com o Live Server do VS Code ou, caso tenha Python instalado:

```bash
python -m http.server 8000
```

Acesse <http://localhost:8000>. O aplicativo não precisa de Node.js nem de instalação de pacotes para funcionar; Node.js 22 é usado apenas nos testes.

## Testes

```bash
npm ci
npm test
```

Os testes usam o executor nativo do Node e jsdom para carregar o HTML e o script reais. Verificam que dados persistidos não injetam atributos/HTML, que registros inválidos não quebram a agenda e que excluir um atendimento preserva os demais e atualiza o armazenamento. Não cobrem todos os fluxos do formulário nem substituem testes em navegador.

Para conferir manualmente: crie uma consulta futura, tente repetir o horário, recarregue a página e remova a consulta. Confira também navegação por teclado, fechamento do modal e troca de tema.

## Estrutura

```text
index.html             estrutura e formulário
style.css              layout, responsividade e temas
script.js              estado, validação, persistência e DOM
tests/agenda.test.cjs   testes de regressão
.github/workflows/ci.yml testes em push e pull request
```

## Decisões e limites

- **JavaScript puro:** mantém o fluxo de eventos e a manipulação do DOM explícitos para estudo.
- **Persistência local:** basta para a demonstração, mas não impede conflitos entre computadores diferentes.
- **Conflito por horário exato:** o projeto não calcula duração de serviços nem agenda por profissional.
- **Horários de hoje:** o formulário exige, no mínimo, a próxima hora inteira e bloqueia datas passadas.
- **Armazenamento não confiável:** registros carregados passam por validação de estrutura; valores inseridos no HTML são escapados.
- **Falha de gravação:** a aplicação continua em memória se o navegador bloquear o armazenamento; ainda não há aviso específico de perda de persistência.

Antes de usar como sistema real seriam necessários backend, controle de acesso, regras de concorrência e tratamento adequado dos dados pessoais.

## Autoria e licença

Pedro Augusto Darolt · [GitHub](https://github.com/pedrozxx) · [LinkedIn](https://www.linkedin.com/in/pedro-darolt/).
Distribuído sob [licença MIT](LICENSE).
