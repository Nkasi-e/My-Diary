const { sequelize } = require('sequelize');
const db = require('../../config/config');

const Record = db.define(
  'records',
  {
    id: {
      type: sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: sequelize.STRING,
      allowNull: false,
    },
    body: {
      type: sequelize.STRING,
      allowNull: false,
    },
    userid: {
      type: sequelize.BIGINT,
      // references: {
      //   // Explicitly tells sequelize to create a foreign key relation with `Users`.`id`
      //   model: 'User',
      //   key: 'id',
      // },
      // field: 'id',
    },
    date: {
      type: sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  Record,
};
