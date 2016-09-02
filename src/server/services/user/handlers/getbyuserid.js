const R = require('ramda');

const handler = (service, req, res) => {
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
};

const curried = R.curry(handler);

module.exports = curried;
