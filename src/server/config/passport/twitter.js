const Strategy = require('passport-twitter').Strategy;

const twitterConfig = require('../').twitter;
const twitterAccountService = require('../../services/twitteraccount/service');

const init = passport => {
  passport.use(new Strategy({
    consumerKey: twitterConfig.consumerKey,
    consumerSecret: twitterConfig.consumerSecret,
    callbackURL: twitterConfig.callbackUrl
  },
  (token, tokenSecret, profile, cb) => {
    const twitterId = profile.id;
    const username = profile.username;

    const tas = new twitterAccountService();

    tas.get(twitterId)
      .then(result => {
        if (result.length < 1) {
          tas.create({ twitterId, username })
            .then(r => cb(null, { twitterId, username }));
        }

        cb(null, { twitterId, username });
      })
      .catch(e => {
        cb(e, null);
      });
  }));
};

module.exports = init;
