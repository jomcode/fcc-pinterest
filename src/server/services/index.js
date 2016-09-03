/* Services */
const authentication = require('./authentication');
const post = require('./post');
const twitterLogin = require('./twitterlogin');
const user = require('./user');

module.exports = (app, passport) => {
  authentication(app);
  post(app);
  twitterLogin(app, passport);
  user(app);
};
