const express = require('express');

const isAuthenticated = require('../../middleware/isauthenticated');

const init = service => {
  const router = express.Router();

  router.post('/posts', isAuthenticated, (req, res) => {
    const data = Object.assign(req.body.data);

    return service.create(data)
      .then(result => {
        res.status(201).json({ data: result });
      })
      .catch(e => {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

  // get all posts by userId
  // TODO validate id, handle id not found
  router.get('/posts/user/:userId', (req, res) => {
    if (!req.params.userId) return res.status(400).json({ error: 'Bad Request' });
    const id = req.params.userId.slice();
    const query = { userId: id };

    return service.find({ query })
      .then(result => {
        res.status(200).json({ data: result });
      })
      .catch(e => {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

  // TODO clean this up
  router.get('/posts', (req, res) => {
    return service.find()
      .then(result => {
        res.status(200).json({ data: result });
      })
      .catch(e => {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

  // TODO restrict to owner / user only, handle id not found or invalid id
  // check userId from session against the database
  router.delete('/posts/:postId', isAuthenticated, (req, res) => {
    if (!req.params.postId) return res.status(400).json({ error: 'Bad Request' });
    const id = req.params.postId.slice();

    return service.remove(id)
      .then(result => {
        // if (result < 1)
        res.status(204).json();
      })
      .catch(e => {
        console.error(e);
        console.error('ERROR STACK-->', e.stack);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

  return router;
};

module.exports = init;
