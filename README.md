# TypeScript GraphQL Backend
This is a sample Node.js backend to provide a GraphQL API to fetch the list of companies, cities, and specialties.

## Project structure
```
├── config
|  ├── default.json
|  └── production.json
├── jsons
|  └── db.json
├── src
|  ├── db
|  |  ├── index.ts
|  |  └── types
|  |  |  ├── City.d.ts
|  |  |  ├── Company.d.ts
|  |  |  └── Speciality.d.ts
|  ├── graphql
|  |  ├── index.ts
|  |  └── object-types
|  |  |  ├── city.ts
|  |  |  ├── company.ts
|  |  |  ├── index.ts
|  |  |  └── speciality.ts
|  └── server.ts
└── tsconfig.json
```

> This directory tree has been generated by the [**tree**](https://github.com/thatisuday/tree) CLI.

### config
The `config/` directory contains the JSON-based environment configuration files for the application. Using the [**config**](https://www.npmjs.com/package/config) package, we can access one of these JSON files. This package uses `NODE_ENV` environment variable to provide one of these JSON files through the `config.get()` API. We have saved server configuration and other settings.

### jsons
The `jsons/` directory contains `db.json` to store **companies**, **cities** and **specialities** in the JSON format. This file act as a temporary database and it is used by `lowdb` to provide an easy API to perform persistent CRUD operations.

### src
The `src/` directory contains the source-code of our application.
- The `db` directory contains `db/index.ts` file which exports `lowdb` API wrapped around `jsons/db.json` file for the CRUD operations. The [**lowdb**](https://www.npmjs.com/package/lowdb) package provides high-level interface to work with JSON files using `lodash` functions.
- The `graphql` directory contains GraphQL related programs. The `graphql/types` directory contains GraphQL object types for the **Company**, **City** the company operates in and **Speciality** a company has. The `graphql/index.ts` file exposes the GraphQL schema.
- The `server.ts` file contains **Express** server implementation. The GraphQL API is exposed on `/graph` route using `express-graphql` middleware.

## Other Features
- We use `$db` and `$graphql` alias to target `src/db` and `src/graphql` directories respectively. This is done using [**module-alias**](https://www.npmjs.com/package/module-alias) package. These aliases are configured inside `server.ts` file.
- We use [**cross-env**](https://www.npmjs.com/package/cross-env) package to run NPM scripts. Since Windows OS does not support Unix-style environment variable declaration in commands, this is very useful for cross-platform use.

## Run/Build Application
### Start Express server in Development mode
```
$ npm run start:dev
$ open http://127.0.0.1:3000/graph
```

This command internally runs **nodemon** command. Using `nodemon.json` configuration, we run `server.ts` with `ts-node` and watch for any file changes in the `src` directory. The API URL should be displayed in the terminal when the server starts.

### Build Project and Run in Production mode

```
$ npm run build
```

This command builds the entire `src` directory and outputs compiled JavaScript files in the `dist` directory. Build configuration is present inside `tsconfig.json`.
> Ideally `dist` directory should be ignored but I have kept it in the commit just for a better understanding of the output.

```
$ npm run start
$ open http://127.0.0.1:8080/graph
```

This command starts the `dist/server.js` file with `node`. However, it would be ideal to run this server in the backend. We can do that using `$ npm run start:daemon` command. This starts the server with [**pm2**](https://www.npmjs.com/package/pm2) and scales the instance to 3 parallel processes.


## Improvements
- We can create a better wrapper around `db` instance and provide methods to process data rather than doing inside GraphQL resolvers.
- We can use [**type-graphql**](https://github.com/MichalLytek/type-graphql) to modularize GraphQL objects and their resolvers.
