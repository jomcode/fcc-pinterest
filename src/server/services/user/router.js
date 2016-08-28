const express = require('express');

const init = service => {
  const router = express.Router();

  router.param('userId', (req, res, next, id) => {
    // fetch from database, set req.user equal to user
    next();
  });

  router.route('/users/:userId?')

  // TODO handle if id is not found
  .get((req, res) => {
    if (!req.params.userId) return res.status(400).json({ error: 'Bad Request' });
    const id = req.params.userId.slice();

    return service.get(id)
      .then(result => {
        const formatted = result.reduce((prev, curr) => curr, {}); // array to obj
        delete formatted._fields[0].properties.password; // remove password
        res.status(200).json({ data: result });
      })
      .catch(e => {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  })

  // .patch((req, res) => {})
  // .put((req, res) => {})

  .post((req, res) => {
    const data = Object.assign({}, req.body.data);

    return service.create(data)
      .then(result => {
        // const formatted = Object.assign({}, result[0]);
        const formatted = result.reduce((prev, curr) => curr, {}); // array to obj
        delete formatted._fields[0].properties.password; // remove password
        res.status(201).json({ data: formatted });
      })
      .catch(e => {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  })

  // TODO handle if id is not found
  .delete((req, res) => {
    if (!req.params.userId) return res.status(400).json({ error: 'Bad Request' });
    const id = req.params.userId.slice();

    return service.remove(id)
      .then(result => {
        // if (result === 0)
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
