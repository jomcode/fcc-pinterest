const getRouter = require('../../utilities').getRouter;

const init = service => {
  const router = getRouter();

  return router;
};

module.exports = init;
