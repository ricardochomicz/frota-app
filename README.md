# Manutenção de Frota

Sistema para gerenciamento de frota com foco no controle de pneus e análise de custos.

### Tecnologias utilizadas
- React
- Typescript

### Clone o projeto
```bash
  git clone https://github.com/ricardochomicz/frota-app.git
```

### Instale as dependências
```bash
  npm install
```

### Inicie o projeto
```bash
  npm start
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

Acesse o sistema e na página de login, clique em "Crie sua conta aqui"

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


## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Executa o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

A página será recarregada se você fizer edições.\
Você também verá quaisquer erros de lint no console.


