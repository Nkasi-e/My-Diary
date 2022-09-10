const { database } = require("../db/database");
const pool = require("../db/db");
const {
  getAllEntries,
  registerEntry,
  getSingleEntry,
} = require("../utils/queries");

//Creating diary entries
const postEntries = (req, res) => {
  const { title, description, date } = req.body;
  pool.query(registerEntry, [title, description, date], (err, result) => {
    if (err) {
      throw err;
    }
    res.status(201).json("Entry Successful");
  });
};

//Get all diary entries
const viewAllEntries = (req, res) => {
  pool.query(getAllEntries, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result.rows);
  });
};

//Getting a single diary entry

module.exports = {
  viewAllEntries,
  postEntries,
};
