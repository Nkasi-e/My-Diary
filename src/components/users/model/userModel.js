const { Sequelize } = require('sequelize');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/config');

const User = db.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      // validate: {
      //   validatePassword: function (password) {
      //     if (
      //       !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)
      //     ) {
      //       throw new Error(
      //         'The password must contain at least 8 characters including at least one uppercase, one lowercase, one number'
      //       );
      //     }
      //   },
      // },
    },
    date: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    Sequelize: 'sequelize',
  }
);

// hash password fn
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
});

// Hook for comparing password
User.prototype.comparePassword = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};

// Creating jsonwebtoken
User.prototype.createJWT = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

module.exports = {
  User,
};
