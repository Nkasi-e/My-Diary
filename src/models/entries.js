const { Sequelize, DataTypes } = require("Sequelize");
const sequelize = require("../connfig/config");

const Entry = sequelize.define("entry", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = {
  Entry,
};
