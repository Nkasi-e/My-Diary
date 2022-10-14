const bcrypt = require('bcryptjs');
const Joi = require('joi');
const schema = require('./userValidation');

const options = { language: { key: '{{key}' } };

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

async function comparePassword(password, userPassword) {
  const match = await bcrypt.compare(password, userPassword);
  return match;
}

function validateRegisterDetails(user) {
  return Joi.validate(user, schema.userSchema, options);
}

function validateLoginDetails(user) {
  return Joi.validate(user, schema.loginSchema, options);
}

module.exports = {
  hashPassword,
  comparePassword,
  validateRegisterDetails,
  validateLoginDetails,
};
