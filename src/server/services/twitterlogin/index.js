/* Twitter Login Service */
const router = require('./router');

module.exports = (app, passport) => {
  app.use(router(passport));
};
