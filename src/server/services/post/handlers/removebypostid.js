const R = require('ramda');

const handler = (service, req, res) => {
  if (!req.params.postId) return res.status(400).json({ error: 'Bad Request' });
  const id = req.params.postId.slice();

  return service.remove(id)
    .then(result => {
      // if (result < 1)
      res.status(204).json({ data: result });
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

const curried = R.curry(handler);

module.exports = curried;
