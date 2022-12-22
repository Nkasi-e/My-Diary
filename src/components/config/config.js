const { sequelize } = require('sequelize');

const { DATABASE, DB_USER, DB_PASSWORD } = process.env;

// eslint-disable-next-line new-cap
module.exports = new sequelize(DATABASE, DB_USER, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
