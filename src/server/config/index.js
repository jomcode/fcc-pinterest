if (process.env.NODE_ENV !== 'production') require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3030,
  neo4j: process.env.DATABASE_URL || 'bolt://localhost',
  redis: {
    host: 'localhost',
    port: 6379
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackUrl: process.env.TWITTER_CALLBACK_URL
  },
  salt: process.env.SALT,
  sessionSecret: process.env.SESSION_SECRET
};
