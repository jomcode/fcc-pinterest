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

  // get all posts by userId
  // TODO validate id, handle id not found
  router.get('/posts/user/:userId', (req, res) => {
    if (!req.params.userId) return res.status(400).json({ error: 'Bad Request' });
    const id = req.params.userId.slice();
    const query = { userId: id };

    return service.find({ query })
      .then(result => {
        const formatted = result.reduce((prev, curr) => {
          if (!prev.user) {
            const user = Object.assign({}, curr._fields[0]);
            delete user.properties.password; // remove password
            prev.user = user;
            prev.posts = [];
          }
          const post = Object.assign({}, curr._fields[1]);
          prev.posts.push(post);
          return prev;
        }, {});

        res.status(200).json({ data: formatted });
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
        const formatted = result.map(r => {
          const user = Object.assign({}, r._fields[0]);
          delete user.properties.password; // remove password
          const post = Object.assign({}, r._fields[1]);
          return { user, post };
        });

        res.status(200).json({ data: formatted });
      })
      .catch(e => {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

  // TODO restrict to owner / user only, handle id not found or invalid id
  router.delete('/posts/:postId', (req, res) => {
    if (!req.params.postId) return res.status(400).json({ error: 'Bad Request' });
    const id = req.params.postId.slice();

    return service.remove(id)
      .then(result => {
        // if (result < 1)
        res.status(204).json();
      })
      .catch(e => {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

  return router;
};

module.exports = init;
