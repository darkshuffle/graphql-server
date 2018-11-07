# Node Graphql Server

A simple project investigating graphql setup and its use cases, as well as tooling.
It uses:

* graphql-yoga - a fully-featured GraphQL server. It is based on Express.js and a few other libraries to help you build production-ready GraphQL servers.

* prisma - a graphql to database connector

### Installation

This project uses the yarn package manager to handle all dependencies

```
yarn install
```

It is useful to have the graphql cli installed as well

```
yarn global add graphql-cli
```

Prisma needs to be started to generate the schema and set up the connection to the Prisma layer

```
prisma deploy
```

This step will hopefully be made redundant with containerisation

To start up the project use

```
node src/index.js
```

Graphql playground will be available on localhost:3000 running the command will open this with both application and database layer connections available as described in .graphqlconfig.yml

```
graphql playground
```

### Using Prisma

Prisma is used to create database bindings allowing a full CRUD API to be generated automatically for database operations. This allows us to delegate database calls to this database layer which will be resolved and managed by Prisma.

This is beneficial from the point of view that grahpql queries with nested resolvers can very quickly become difficult to manage. The node layer (Application Schema) still acts as an entry point for the the database layer so operations such as authorisation or logic can take place here before or after database interaction.

### To do

Containerise the whole project to run Prisma on a local instance with a single entry point for the whole project
