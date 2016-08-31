const express = require('express');

const isAuthenticated = require('../../middleware/isauthenticated');

const init = service => {
  const router = express.Router();

  router.get('/auth/verify', isAuthenticated, (req, res) => {
    const user = Object.assign({}, req.user, { isAuthenticated: true });
    return res.status(200).json({ data: user });
  });

  return router;
};

module.exports = init;
