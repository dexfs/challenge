# Challenge
## ❯ Table of contents

- [Requerimentos](#-requirements)
- [Bibliotecas](#-libraries)
- [Arquivo de configuração](#-environment-file)
- [Rodando a aplicação](#-running-the-app)
- [Tests](#-tests)

## ❯ Requirements

- [Node.js](https://nodejs.org/en/)
- npm
- [Docker](https://docs.docker.com/get-docker/)

## ❯ Libraries
- [Express](https://expressjs.com/)
- [Jest](https://expressjs.com/)
- [Jest Extended](https://github.com/jest-community/jest-extended)
- [standardjs](https://standardjs.com/)
-
## ❯ Enviroment file

Antes de executar a aplicação é necessário criar o arquivo .env.development

Verifique o .env.example para obter as variáveis de ambiente que precisam ser definidas.
```bash
$ cp .env.example .env.development
```
> Configure a API_KEY do Giphy
> Os Endpoints dos serviços já estão configuradosk, porém podem ser ajustados se for necessário.

> A configuração é montada em `src/config/env.js`
## ❯ Running the app


```bash
# development
$ docker-compose up -d

# OR with visible logs
$ docker-compose up
```
> `http://localhost:3000/recipes?i=onion,tomato`

> Isto vai criar o container com a aplicação rodando na porta 3000.
> As opções de enviroments(NODE_ENV): production | develpment | test
> O docker-compose usa o .env.develpoment

## ❯ Tests

> Antes de executar a aplicação é necessário criar o arquivo .env.test
```bash
# running unit tests
$ npm run test:unit

# running integration tests
$ npm run test:integration

# running ci
$ npm run test:ci

# running all tests
$ npm test

# running tests with docker
$ docker-compose -f docker-compose.test.yaml up
```
