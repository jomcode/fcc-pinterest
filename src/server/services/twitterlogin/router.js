const express = require('express');

const init = passport => {
  const router = express.Router();

  router.get('/home', (req, res) => {
    res.render('home', { user: req.user });
  });

  router.get('/login', (req, res) => {
    res.render('login');
  });

  router.get('/login/twitter', passport.authenticate('twitter'));

  router.get('/login/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/home');
    });

  router.get('/profile', (req, res) => {
    res.render('profile', { user: req.user });
  });

  return router;
};

module.exports = init;
