const Joi = require('joi');
const { titleErrorMessage, bodyErrorMessage } = require('../utils/messages');

const validateEntry = Joi.object({
  title: Joi.string().required().min(5).messages(titleErrorMessage),
  body: Joi.string().required().min(5).max(800).messages(bodyErrorMessage),
});

const updateEntry = Joi.object({
  title: Joi.string().required().min(5).messages(titleErrorMessage),
  body: Joi.string().min(5).max(800).messages(bodyErrorMessage),
});
module.exports = {
  validateEntry,
  updateEntry,
};
