if (process.env.NODE_ENV !== 'production') require('dotenv').config();

module.exports = {
  appUrl: process.env.APP_URL || 'http://127.0.0.1:8080',
  port: process.env.PORT || 3030,
  neo4j: process.env.GRAPHENEDB_URL || 'bolt://localhost',
  redis: process.env.REDIS_URL || 'redis://localhost:6379',
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackUrl: process.env.TWITTER_CALLBACK_URL
  },
  salt: process.env.SALT,
  sessionSecret: process.env.SESSION_SECRET
};
