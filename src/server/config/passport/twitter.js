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

    // only store userId and twitterId in session, user ids in deserializeUser
    // to fetch whatever else from database
    tas.get(twitterId)
      .then(result => {
        if (result.length < 1) {
          return tas.create({ twitterId, username })
            .then(r => {
              const userId = r[0]._fields[0].properties.userId;
              cb(null, { userId, twitterId });
            });
        }

        const userId = result[0]._fields[0].properties.userId;

        return cb(null, { userId, twitterId });
      })
      .catch(e => {
        cb(e, null);
      });
  }));
};

module.exports = init;
