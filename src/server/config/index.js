if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const url = require('url');

const neoUrl = url.parse(process.env.GRAPHENEDB_URL);

module.exports = {
  appUrl: process.env.APP_URL || 'http://127.0.0.1:8080',
  port: process.env.PORT || 3030,
  neo4j: {
    user: `${neoUrl.auth.split(':')[0]}`,
    pass: `${neoUrl.auth.split(':')[1]}`,
    server: `${neoUrl.protocol}//${neoUrl.host}`
  },
  redis: process.env.REDIS_URL || 'redis://localhost:6379',
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackUrl: process.env.TWITTER_CALLBACK_URL
  },
  salt: process.env.SALT,
  sessionSecret: process.env.SESSION_SECRET
};
