const { Sequelize } = require('Sequelize');
const db = require('../../config/config');

const Record = db.define(
  'records',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    body: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  Record,
};
