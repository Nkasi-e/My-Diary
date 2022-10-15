const bcrypt = require('bcryptjs');
const Joi = require('joi');
const schema = require('./userValidation');

const options = { abortEarly: false };

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

async function comparePassword(password, userPassword) {
  const match = await bcrypt.compare(password, userPassword);
  return match;
}

function validateRegisterDetails(user) {
  return Joi.validate(user, schema.userSchema);
}

function validateLoginDetails(user) {
  return Joi.validate(user, schema.loginSchema);
}

module.exports = {
  hashPassword,
  comparePassword,
  validateRegisterDetails,
  validateLoginDetails,
};
