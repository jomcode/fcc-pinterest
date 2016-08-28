const express = require('express');

const init = service => {
  const router = express.Router();

  router.param('postId', (req, res, next, id) => {
    next();
  });

  router.post('/posts', (req, res) => {
    const data = Object.assign(req.body.data);

    return service.create(data)
      .then(result => {
        const user = Object.assign({}, result[0]._fields[0]);
        const post = Object.assign({}, result[0]._fields[1]);
        delete user.properties.password; // remove password
        res.status(201).json({ data: { user, post } });
      })
      .catch(e => {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

  router.get('/posts/')

  return router;
};

module.exports = init;
