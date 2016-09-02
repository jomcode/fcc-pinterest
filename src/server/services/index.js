/* Services */
const authentication = require('./authentication');
const post = require('./post');

module.exports = app => {
  authentication(app);
  post(app);
};
