const Joi = require('joi');

const validateEntry = Joi.object({
  title: Joi.string().required().min(5),
  body: Joi.string().required().min(5),
});

const updateEntry = Joi.object({
  title: Joi.string().required(),
  body: Joi.string(),
});
module.exports = {
  validateEntry,
  updateEntry,
};
