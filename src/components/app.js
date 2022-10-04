const express = require('express');
require('dotenv').config();
const cors = require('cors');

// Database
const DB = require('./config/config');

// Routers
const entryRoute = require('./entries/entriesRoute');

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.use('/api/v1/diary', entryRoute);

app.listen(port, async () => {
  console.log(`server is running on port ${port}...`);
  await DB.authenticate();
  console.log(`DB connected successfully`);
});
