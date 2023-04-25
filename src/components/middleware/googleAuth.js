const dotenv = require('dotenv');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../users/model/userModel');

dotenv.config('.env');

const { CLIENT_ID, CLIENT_SECRET } = process.env;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: `http://localhost:3000/auth/callback`,
      passReqToCallback: true,
    },
    // eslint-disable-next-line prefer-arrow-callback
    function (_request, _accessToken, _refreshToken, profile, done) {
      done(null, profile);
    }
  )
);
