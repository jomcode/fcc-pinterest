const isAuthenticated = (req, res, next) => req.user ?
  next() :
  res.redirect('/');

export default isAuthenticated;
