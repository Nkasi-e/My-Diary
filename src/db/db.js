const Pool = require("pg").Pool;
const Joi = require("joi");

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: "127.0.0.1",
//   database: process.env.DATABASE,
//   password: process.env.DB_SECRET,
//   port: 5432,
// });

const validateEntry = (user) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(500).required(),
    description: Joi.string().min(5).max(700).required(),
    date: Joi.string().min(3).max(100).required(),
  });
  return schema.validate(user);
};

module.exports = {
  pool,
  validateEntry,
};
