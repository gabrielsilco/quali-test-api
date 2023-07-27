# quali-test-api

## Descrição

Esta aplicação é um teste para a empresa Qualicorp. Trata-se de um CRUD para a criação de pacientes, coletando dados importantes para diagnóstico médico.

## Dificuldades

As maiores dificuldades no desenvolvimento desta aplicação foi em relação ao uso do Neo4J. Precisei ler bastante a documentação oficial para configurar e realizar as queries corretamente.

## Facilidades

Com relação às facilidades creio que foi com relação à criação das rotas no NodeJS.

## O que pode ser melhorado

Muito ainda pode ser melhorado no projeto. Algumas sugestões:

- Além de pacientes, também ser possível cadastrar médicos e criar uma relação entre eles.
- Estruturar melhor o projeto, criando pastas para config, controllers, models e etc.
- Implementar autenticação.
- Implementar testes unitários.
- Implementar SWAGGER.

## Como rodar

Para rodar o projeto a partir da pasta raiz apenas rode o comando:

```
node src/app.js

```