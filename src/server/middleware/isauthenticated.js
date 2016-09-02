// check for req.user from passport
const isAuthenticated = (req, res, next) => req.user ?
  next() :
  res.status(401).json({ error: 'Unauthorized' });

module.exports = isAuthenticated;
