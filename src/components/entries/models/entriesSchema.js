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
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()'),
    },
  },
  {
    timestamps: true,
    createdat: 'createdAt',
    updatedt: 'updatedAt',
  }
);

module.exports = {
  Record,
};
