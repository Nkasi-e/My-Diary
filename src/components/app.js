const express = require('express');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const authMiddleware = require('./middleware/authentication');

const swaggerDocument = YAML.load('./swagger.yaml');

// Database
const DB = require('./config/config');

// Routers
const entryRoute = require('./entries/entriesRoute');
const userRoute = require('./users/userRoute');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

app.get('/swagger', (req, res) => {
  res.send('<h1>DIARY API</h1><a href="/api-docs">Documentation</a>');
});

// swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const port = process.env.PORT;

app.use('/api/v1/diary', entryRoute);
app.use('/api/v1/user', userRoute);

app.listen(port, async () => {
  console.log(`server is running on port ${port}...`);
  await DB.authenticate();
  console.log(`DB connected successfully`);
});
