const { database } = require("../db/database");
const pool = require("../db/db");
const {
  getAllUsers,
  registerUsers,
  getSingleUser,
} = require("../utils/queries");

//Get all users entries
const getEntries = async (req, res) => {
  await pool.query(getAllUsers, (err, result) => {
    if (err) throw Error;
    res.json(result.rows);
  });
};

const postEntries = async (req, res) => {
  const { name, email, password } = req.body;
  database.user.push({
    name,
    email,
    password,
    date: new Date(),
  });
  res.json(database.user[database.user.length - 1]);
};

module.exports = {
  getEntries,
  postEntries,
};
