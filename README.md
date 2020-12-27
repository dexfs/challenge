# Challenge
## ❯ Table of contents

- [Requerimentos](#-requirements)
- [Bibliotecas](#-libraries)
- [Instalação](#-installation)
- [Arquivo de configuração](#-environment-file)
- [Rodando a aplicação](#-running-the-app)
- [Tests](#-tests)

- [Routes and Payloads](#-routes-and-payloads)

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

## ❯ Installation

```bash
$ npm
```

Database with docker

```
$ docker-compose up -d
```
> Isto vai criar o container com a aplicação rodando na porta 3000.
> As opções de enviroments(NODE_ENV): production | develpment | test
> O docker-compose usa o .env.develpoment

## ❯ Enviroment file

Antes de executar a aplicação é necessário criar o arquivo .env.development
```bash
$ cp .env.example .env.development
```
> Configure a API_KEY do Giphy
> Os Endpoints dos serviços já estão configuradosk, porém podem ser ajustados se for necessário.
## ❯ Running the app

```bash
# development
$ npm run dev
```
## ❯ Running the app with Docker
```bash
# development
$ docker-compose up -d

# OR with visible logs
$ docker-compose up
```


> Antes de executar a aplicação é necessário criar o arquivo .env.test
## ❯ Tests

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
