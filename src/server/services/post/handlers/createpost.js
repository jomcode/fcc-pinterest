const R = require('ramda');

const handler = (service, req, res) => {
  const data = Object.assign(req.body.data);

  return service.create(data)
    .then(result => {
      res.status(201).json({ data: result });
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

const curried = R.curry(handler);

module.exports = curried;
