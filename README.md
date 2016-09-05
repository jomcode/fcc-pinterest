#Pinterestish App
[Heroku Link](https://jomcode-fcc-pinterest.herokuapp.com)

## Built With
Data: neo4j (records), redis (sessions)

Client: react, react-router, redux, SASS, fetch, karma, mocha, chai, sinon, enzyme

Server: express, passport, seraph (neo4j), mocha, chai, sinon

Tools: webpack, babel, react-hot-loader, nodemon, eslint

Misc: session based authentication via Twitter's OAuth1 API

## Server Info

### Server Config / Environment Variables
- **TWITTER_CONSUMER_KEY** twitter sign in consumer key
- **TWITTER_CONSUMER_SECRET** twitter sign in consumer secret
- **TWITTER_CALLBACK_URL** twitter sign in callback url
- **SESSION_SECRET** session secret
- **SALT** hash salt
- **GRAPHENEDB_URL** neo4j url ex 'http://user:pass@host:port'

### Endpoints (JSON API)
TODO

## Tests
**server**

`npm run test:server` runs unit tests

`npm run test:server:func` runs functional tests (requires redis and neo4j)

## TODO
- finish client tests
- database seeding utility scripts for cli
- implement codeceptjs acceptance testing with webdriverio
- dockerize server functional test environment
- dockerize acceptance test environment
- move removepost to its own module on client?
- cool refactoring stuff with ramda
- styling and polish on client
- add info to readme about endpoints and how things work
