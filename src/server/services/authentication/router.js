const express = require('express');

const isAuthenticated = require('../../middleware/isauthenticated');

const init = service => {
  const router = express.Router();

  router.get('/auth/verify', isAuthenticated, (req, res) => {
    return res.status(200).json({ data: { isAuthenticated: true } });
  });

  return router;
};

module.exports = init;
