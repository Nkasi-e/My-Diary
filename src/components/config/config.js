const { Sequelize } = require('sequelize');

const { DATABASE, DB_USER, DB_PASSWORD } = process.env;

// module.exports = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
//   host: 'localhost',
//   dialect: 'postgres',

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// });
const sequelize = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = { sequelize };
