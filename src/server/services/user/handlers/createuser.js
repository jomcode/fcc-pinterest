const R = require('ramda');

const handler = (service, req, res) => {
  const data = Object.assign({}, req.body.data);

  return service.create(data)
    .then(result => {
      const formatted = result.reduce((prev, curr) => curr, {}); // array to obj
      delete formatted._fields[0].properties.password; // remove password
      res.status(201).json({ data: formatted });
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

const curried = R.curry(handler);

module.exports = curried;
