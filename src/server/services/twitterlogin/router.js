const getRouter = require('../../utilities').getRouter;
const isAuthenticated = require('../../middleware/isauthenticated');
const handlers = require('./handlers');

const init = passport => {
  const router = getRouter();

  router.get('/login/twitter', passport.authenticate('twitter'));

  router.get('/login/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    handlers.loginCallback
  );

  router.get('/logout/twitter', isAuthenticated, handlers.logout);

  return router;
};

module.exports = init;
