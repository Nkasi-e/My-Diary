const Joi = require('joi');

const validateRegister = Joi.object({
  name: Joi.string().required().min(1).max(50),
  email: Joi.string().required().email().min(3),
  password: Joi.string().min(5).required(),
});

const validateLogin = Joi.object({
  email: Joi.string().required().email().min(3),
  password: Joi.string().required().min(5).max(20),
});

const updateUser = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
});
module.exports = {
  validateRegister,
  validateLogin,
  updateUser,
};
