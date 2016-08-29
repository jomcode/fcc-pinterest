const Strategy = require('passport-twitter').Strategy;

const twitterConfig = require('../').twitter;

const init = passport => {
  passport.use(new Strategy({
    consumerKey: twitterConfig.consumerKey,
    consumerSecret: twitterConfig.consumerSecret,
    callbackURL: twitterConfig.callbackUrl
  },
  function (token, tokenSecret, profile, cb) {
    return cb(null, profile);
  }));
};

module.exports = init;
