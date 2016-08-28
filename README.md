#reactbp
starting point for full stack react apps.

**client**
- webpack development, production, and test configurations
- react-hot-loader 3 beta
- eslint with airbnb styleguide
- tests via karma, mocha, chai, sinon, enzyme
- code coverage via istanbul, babel-plugin-istanbul, karma-coverage
- normalize.css (extracted to vendor.css)
- polyfills via core-js

**server**
- nodemon for server restarts
- express
- dotenv for environment variables
- tests via mocha, chai, sinon, supertest

## npm scripts
**development**

`dev:server` develop server (nodemon restarts)

`dev:client` develop client (no hot module replacement)

`dev:client:hot` develop client (hot module replacement)

`dev:hot` develop server (nodemon restarts) and client (hot module replacement)

**production**

`build` build client production bundle (output to dist folder)

`start` runs server

**tests**

`test:client` run client tests via karma

`test:client:watch` run client tests and watch for changes to run again

`test:client:sanity` run client sanity tests (make sure things are working)

`test:server` run server tests via mocha

`test:server:watch` run server tests and watch for changes to run again

`test:server:sanity` run server sanity tests (make sure things are working)

`tdd:client` runs `dev:client` & `test:client:watch` concurrently

`tdd:client:hot` runs `dev:client:hot` & `test:client:watch` concurrently

`tdd:server` runs `dev:server` & `test:server:watch` concurrently

## config
create `.env` file and set variables

`PORT` express app. defaults to 3030

`WEBPACK_HOST` webpack-dev-server. defaults to localhost

`WEBPACK_PORT` webpack-dev-server. defaults to 8080

## TODO

- set up code coverage for server side
- decide where to initialize dotenv for server, etc
