const Joi = require('joi');

const userSchema = {
  name: Joi.string().required().min(1).max(50),
  email: Joi.string().required().email().min(3),
  password: Joi.string().min(5).max(20),
};

const loginSchema = {
  email: Joi.string().required().email().min(3),
  password: Joi.string().required().min(5).max(20),
};

module.exports = {
  userSchema,
  loginSchema,
};
