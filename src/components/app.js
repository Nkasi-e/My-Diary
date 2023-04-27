/* eslint-disable prefer-arrow-callback */
const express = require('express');
require('dotenv').config();
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const session = require('express-session');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const authMiddleware = require('./middleware/authentication');
require('./middleware/googleAuth');

const swaggerDocument = YAML.load('./swagger.yaml');

// Database
const DB = require('./config/config');

// Routers
const entryRoute = require('./entries/entriesRoute');
const userRoute = require('./users/userRoute');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(
  session({
    secret: 'mysecrets',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/swagger', (req, res) => {
  res.send('<h1>DIARY API</h1><a href="/api-docs">Documentation</a>');
});

// swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const port = process.env.PORT;

app.use('/api/v1/diary', authMiddleware, entryRoute);
app.use('/api/v1/user', userRoute);

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  }
);

app.listen(port, async () => {
  console.log(`server is running on port ${port}...`);
  await DB.authenticate();
  console.log(`DB connected successfully`);
});

module.exports = app;
