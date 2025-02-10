# Manutenção de Frota

Sistema para gerenciamento de frota com foco no controle de pneus e análise de custos.

### Tecnologias utilizadas
- React
- Typescript

### Clone o projeto (frontend)
```bash
  git clone https://github.com/ricardochomicz/frota-app.git
```

### Clone o projeto (backend)
```bash
  git clone https://github.com/ricardochomicz/frota-backend.git
```

### Instale as dependências frontend
```bash
  cd frota-app
  npm install
```

### Instale as dependências backend
```bash
  cd frota-backend
  npm install
```

### Inicie o projeto frontend
```bash
  npm start
```

### Inicie o projeto backend
```bash
  docker-compose up --build
```

### Acesse o projeto
[http://localhost:3000](http://localhost:3000)

## Funcionalidades
- Registro
- Login
- CRUD de usuários
- CRUD de veículos
- CRUD manutenções
- CRUD de pneus
- Análise de custos
- Alerta de pneus para substituição
- Envio de e-mail para informar pneus para substituição

### Como usar

1. Acesse o sistema e na página de login, clique em "Crie sua conta aqui".
2. Faça seu login.
3. Faça o cadastro de veículos e pneus.
4. Faça o cadastro de manutenções.
 - É possível cadastrar uma manutenção para um veículo específico. Selecione o veículo no combobox, informe o tipo e a descrição da manutenção.
 - Clique am "Adicionar novo pneu", informe o código do pneu e clique em pesquisar.
 - Informe o KM instalação que deve ser igual ao KM atual do veículo e informe a KM indicada para substituição. Exemplo 1000 "km".
 - Clique em "Salvar".

5. Acesse a página de veículos e clique no botão "Atualizar KM", simulando que o  veículo estivesse chegado de viagem. Supondo que na instalação de um pneu o KM atual do veículo era 1000, e agora foi alterado para 1500. O KM de indicação para substituição era de 200, então o sistema vai informar que o pneu deve ser substituído. A notificação será por e-mail e indicador de notificação.

6. Acesse a página de manutenção e clique em editar a manutenção a qual tem a notificação de um sino. Ao lado dos pneus instalados aparecerá a mesma notificação. Clique em "Substituir pneu" e vai ser direcionado para página de análise de custos.

7. Na página de análise de custos, selecione o motivo da substituição, informe a KM Atual e informe uma observação. Os cálculos de custo por KM/Rodado e performance serão feitos automaticamente. O custo total da substituição será calculado automaticamente. Clique em "Salvar".

8. Na página de manutenção enquanto estiverem pneus a ser substituídos, ficara com o status de "PENDENTE", após todos os pneus substituídos, o status será alterado para "CONCLUÍDA".

9. Na página de análise de custo tem a relação de pneus que foram substituídos e suas respectivas análises de custos. Podendo ser gerado um relatório pelo mês selecionado em PDF ou Excel.

10. As verificaçãos são realizadas de hora em hora através de um cronjob, ou através do link "Verificar Pneus".

11. Na página de veículos clicando no botão "Manutenção e Pneus" é possível ver as manutenções e pneus instalados em cada veículo.


## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```bash
...
├── public
├── src
│   ├── components
│   |   ├── auth
|   |   ├── bootstrap
|   |   ├── cost_analysis
|   |   ├── maintenances
|   |   ├── vehicles
│   ├── context
│   ├── helpers
│   ├── services
│   ├── interfaces
│   ├── routes
│   └── services
├── .gitignore
├── tsconfig.json
├── package.json
├── README.md
└── App.tsx
```


#

