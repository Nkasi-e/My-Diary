const Joi = require('joi');

const validateEntry = (user) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(500).required(),
    body: Joi.string().min(5).max(700).required(),
  });
  return schema.validate(user);
};

module.exports = {
  validateEntry,
};
