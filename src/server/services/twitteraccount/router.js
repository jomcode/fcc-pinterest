const express = require('express');

const init = service => {
  const router = express.Router();

  router.param('twitterId', (req, res, next, id) => {
    next();
  });

  return router;
};

module.exports = init;
