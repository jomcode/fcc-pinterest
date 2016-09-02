/* Services */
const authentication = require('./authentication');

module.exports = app => {
  authentication(app);
};
