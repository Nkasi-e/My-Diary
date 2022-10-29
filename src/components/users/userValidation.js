const Joi = require('joi');
const messages = require('../utils/messages');

const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const registerPassError =
  'The password must contain at least 8 characters including at least one uppercase, one lowercase, one number';

const validateRegister = Joi.object({
  name: Joi.string().required().min(1).max(50).messages(messages),
  email: Joi.string().required().email().min(3).messages(messages),
  password: Joi.string()
    .min(8)
    .required()
    .regex(pattern)
    .message(registerPassError)
    .messages(messages),
});

const validateLogin = Joi.object({
  email: Joi.string().required().email().min(3).messages(messages),
  password: Joi.string().required().min(5).messages(messages),
});

const updateUser = Joi.object({
  name: Joi.string().messages(messages),
  email: Joi.string().messages(messages),
  password: Joi.string().messages(messages),
});
module.exports = {
  validateRegister,
  validateLogin,
  updateUser,
};
