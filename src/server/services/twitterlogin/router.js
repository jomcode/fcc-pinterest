const getRouter = require('../../utilities').getRouter;
const isAuthenticated = require('../../middleware/isauthenticated');

const init = passport => {
  const router = getRouter();

  router.get('/home', (req, res) => {
    res.render('home', { user: req.user });
  });

  router.get('/login', (req, res) => {
    res.render('login');
  });

  router.get('/login/twitter', passport.authenticate('twitter'));

  router.get('/login/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/');
    });

  router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile', { user: req.user });
  });

  router.get('/logout/twitter', isAuthenticated, (req, res) => {
    req.logout();
    return res.status(200).json({ data: { isAuthenticated: false } });
  });

  return router;
};

module.exports = init;
