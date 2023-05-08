const { Sequelize } = require('sequelize');
const db = require('../../config/config');

const Record = db.define(
  'records',
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    body: {
      type: Sequelize.STRING(700),
      allowNull: false,
    },
    userid: {
      type: Sequelize.BIGINT,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
    Sequelize: 'sequelize',
  }
);

module.exports = {
  Record,
};
