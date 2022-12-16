const { Sequelize } = require('Sequelize');
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
      type: Sequelize.STRING,
      allowNull: false,
    },
    userid: {
      type: Sequelize.BIGINT,
      // references: {
      //   // Explicitly tells Sequelize to create a foreign key relation with `Users`.`id`
      //   model: 'User',
      //   key: 'id',
      // },
      // field: 'id',
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
