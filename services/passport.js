const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose');

const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id); 
  done(null, user);
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleSecretKey,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      user = await new User({ googleId: profile.id }).save();
    }

    done(null, user);
  })
);

passport.use(
  new TwitterStrategy({
    consumerKey: keys.twitterKey,
    consumerSecret: keys.twitterSecretKey,
    callbackURL: '/auth/twitter/callback'
  },
  async (token, tokenSecret, profile, done) => {
    let user = await User.findOne({ twitterId: profile.id });

    if (!user) {
      user = await new User({ twitterId: profile.id }).save();
    }

    done(null, user);
  })
);