const passport = require('passport');

module.exports = app => {
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google'), 
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/auth/twitter',
    passport.authenticate('twitter')
  );

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/auth/current_user',
    (req, res) => {
      res.send(req.user);
    }
  );

  app.get('/auth/logout',
    (req, res) => {
      req.logout();
      res.redirect('/');
    }
  );
};