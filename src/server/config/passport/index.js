const configureTwitter = require('./twitter');

const configurePassport = passport => {
  configureTwitter(passport);

  // restore auth state across HTTP requests via serialization into/out of session
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  // TODO get user from database here
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
};

module.exports = configurePassport;
