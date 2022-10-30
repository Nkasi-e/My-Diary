const Joi = require('joi');
const {
  nameErrorMessage,
  emailErrorMessage,
  passwordErrorMessage,
} = require('../utils/messages');

const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const registerPassError =
  'The password must contain at least 8 characters including at least one uppercase, one lowercase, one number';

const validateRegister = Joi.object({
  name: Joi.string().required().min(1).max(50).messages(nameErrorMessage),
  email: Joi.string().required().email().min(3).messages(emailErrorMessage),
  password: Joi.string()
    .min(8)
    .required()
    .regex(pattern)
    .message(registerPassError)
    .messages(passwordErrorMessage),
});

const validateLogin = Joi.object({
  email: Joi.string().required().email().min(3).messages(emailErrorMessage),
  password: Joi.string().required().min(5).messages(passwordErrorMessage),
});

const updateUser = Joi.object({
  name: Joi.string().messages(nameErrorMessage),
  email: Joi.string().messages(emailErrorMessage),
  password: Joi.string().messages(passwordErrorMessage),
});
module.exports = {
  validateRegister,
  validateLogin,
  updateUser,
};
