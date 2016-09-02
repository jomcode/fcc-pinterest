/* Services */
const authentication = require('./authentication');
const post = require('./post');
const twitterLogin = require('./twitterlogin');

module.exports = (app, passport) => {
  authentication(app);
  post(app);
  twitterLogin(app, passport);
};
