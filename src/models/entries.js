const { Sequelize, DataTypes } = require("Sequelize");
const db = require("../connfig/config");

const Entry = db.define("entry", {
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
});

module.exports = {
  Entry,
};
