#Pinterestish App

[![Build Status](https://travis-ci.org/jomcode/fcc-pinterest.svg?branch=master)](https://travis-ci.org/jomcode/fcc-pinterest)
[![Test Coverage](https://codeclimate.com/github/jomcode/fcc-pinterest/badges/coverage.svg)](https://codeclimate.com/github/jomcode/fcc-pinterest/coverage)

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
*response body*

(* = authenticated endpoint)

#### Unauthorized Request
status 401
```
{
  error: 'Unauthorized'
}
```

#### GET /auth/verify *
status 200
```
{
  data: {
    ...user,
    isAuthenticated: true
  }
}
```

#### POST /posts *
status 201
```
{
  data: {
    ...post
  }
}
```

#### GET /posts
status 200
```
{
  data: [
    ...posts
  ]
}
```

#### GET /posts/user/:userId
status 200
```
{
  data: [
    ...posts
  ]
}
```

#### DELETE /posts/:postId *
status 204
```
No content
```

#### GET /login/twitter
Twitter sign in redirect

#### GET /logout/twitter *
status 200
```
{
  data: {
    isAuthenticated: false
  }
}
```

#### POST /users
status 201
```
{
  data: {
    ...user
  }
}
```

#### GET /users/:userId *
status 200
```
{
  data: {
    ...user
  }
}
```

#### DELETE /users/:userId *
status 204
```
No content
```

## Tests
`npm run test` runs server unit & functional tests, client unit & integration tests

`npm run server:coverage` run server unit tests, generate coverage report

`npm run server:coverage:func` run server functional tests, generate coverage report

`npm run coverage:combine` combines coverage reports

`npm run codeclimate` after setting ENV variable run this to push to codeclimate

**server**

`npm run test:server` runs unit tests

`npm run test:server:func` runs functional tests (requires redis and neo4j)

**client**

`npm run test:client` runs unit/integration tests and generates coverage report

## TODO
- dockerize client, server unit/integration/functional tests
- database seeding utility scripts for cli
- move removepost to its own module on client?
- cool refactoring stuff with ramda
- styling and polish on client
