const express = require('express');

const init = service => {
  const router = express.Router();

  router.param('userId', (req, res, next, id) => {
    // fetch from database, set req.user equal to user
    next();
  });

  router.route('/users/:userId?')

  .get((req, res) => {
    res.json({ user: 'get /users/:userId?' });
  })

  .patch((req, res) => {
    res.json({ user: 'patch /users/:userId?' });
  })

  .put((req, res) => {
    res.json({ user: 'put /users/:userId?' });
  })

  .post((req, res) => {
    const data = Object.assign({}, req.body.data);

    service.create(data)
      .then(result => {
        // const formatted = Object.assign({}, result[0]);
        const formatted = result.reduce((prev, curr) => curr, {});
        delete formatted._fields[0].properties.password; // remove password
        res.status(201).json({ data: formatted });
      })
      .catch(e => console.error(e));
  })

  .delete((req, res) => {
    res.json({ user: 'delete /users/:userId?' });
  });

  return router;
};

module.exports = init;
