const dotenv = require('dotenv');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../users/model/userModel');

dotenv.config('.env');

const {
  CLIENT_ID,
  CLIENT_SECRET,
  JWT_SECRETE,
  JWT_LIFETIME,
  FACEBOOK_ID,
  FACEBOOK_SECRET,
} = process.env;

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
      callbackURL: `http://localhost:3000/auth/google/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          where: { email: profile.emails[0].value },
        });
        if (existingUser) {
          const payload = existingUser.dataValues;
          const token = jwt.sign(payload, JWT_SECRETE, {
            expiresIn: JWT_LIFETIME,
          });
          return done(null, { user: existingUser, token });
        }
        const hashPassword = await bcrypt.hash(profile.id, 10);

        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: hashPassword,
        });
        const payload = newUser.dataValues;
        const token = jwt.sign(payload, JWT_SECRETE, {
          expiresIn: JWT_LIFETIME,
        });
        return done(null, { user: newUser, token });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_ID,
      clientSecret: FACEBOOK_SECRET,
      callbackURL: `http://localhost:3000/auth/facebook/callback`,
      profileFields: ['email', 'displayName'],
    },
    async (_req, _refreshToken, _accessToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          where: { email: profile.emails[0].value },
        });
        if (existingUser) {
          const payload = existingUser.dataValues;
          const token = jwt.sign(payload, JWT_SECRETE, {
            expiresIn: JWT_LIFETIME,
          });
          return done(null, { user: existingUser, token });
        }
        const hashPassword = await bcrypt.hash(profile.id, 10);

        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: hashPassword,
        });
        const payload = newUser.dataValues;
        const token = jwt.sign(payload, JWT_SECRETE, {
          expiresIn: JWT_LIFETIME,
        });
        return done(null, { user: newUser, token });
      } catch (err) {
        return done(err);
      }
    }
  )
);
