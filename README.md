# Manutenção de Frota

Este projeto foi criado com [Create React App](https://github.com/facebook/create-react-app).

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

## Estrutura de Pastas

- **public/**: Contém arquivos estáticos como `index.html`, `manifest.json` e `robots.txt`.
- **src/**: Contém o código-fonte do projeto.
  - **components/**: Contém os componentes React organizados por funcionalidade.
    - **auth/**: Componentes relacionados à autenticação.
    - **bootstrap/**: Componentes de inicialização.
    - **cost_analysis/**: Componentes de análise de custos.
    - **maintenances/**: Componentes de manutenção.
    - **tires/**: Componentes relacionados a pneus.
    - **users/**: Componentes de usuários.
    - **vehicles/**: Componentes de veículos.
  - **context/**: Contém os contextos React, como `AuthContext.tsx`.
  - **helpers/**: Funções auxiliares, como `Helpers.tsx` e `PaceJs.tsx`.
  - **interfaces/**: Contém as interfaces TypeScript.
  - **routes/**: Definições de rotas do aplicativo.
  - **services/**: Serviços para comunicação com APIs.
  - **validations/**: Esquemas de validação.
  - **websocket.tsx**: Configuração do WebSocket.

