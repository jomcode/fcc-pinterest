const R = require('ramda');

const handler = (service, req, res) =>
  service.find()
    .then(result => {
      res.status(200).json({ data: result });
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    });

const curried = R.curry(handler);

module.exports = curried;
