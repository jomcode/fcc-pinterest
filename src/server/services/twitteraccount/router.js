const getRouter = require('../../utilities').getRouter;

const init = service => {
  const router = getRouter();

  router.param('twitterId', (req, res, next, id) => {
    next();
  });

  return router;
};

module.exports = init;
