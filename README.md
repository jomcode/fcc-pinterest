#Pinterestish App
[Heroku Link](https://jomcode-fcc-pinterest.herokuapp.com)

## Info
Data: neo4j (records), redis (sessions)

Client: react, react-router, redux, SASS, fetch

Server: express, passport, seraph (neo4j)

Tools: webpack, babel, react-hot-loader, nodemon, eslint

Misc: authentication via Twitter's OAuth1 API

## Config / Environment Variables
- **TWITTER_CONSUMER_KEY** twitter sign in consumer key
- **TWITTER_CONSUMER_SECRET** twitter sign in consumer secret
- **TWITTER_CALLBACK_URL** twitter sign in callback url
- **SESSION_SECRET** session secret
- **SALT** hash salt
- **GRAPHENEDB_URL** neo4j url ex 'http://user:pass@host:port'

## Tests
**server**

`npm run test:server` runs unit tests

`npm run test:server:func` runs functional tests (requires redis and neo4j)

## TODO
- client tests
- cool refactoring stuff with ramda
- styling and polish on client
- dockerize server functional test environment
- dockerize acceptance tests (client/server)
