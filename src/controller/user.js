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
const viewSingleEntry = (req, res) => {
  const { id } = req.params;
  pool.query(getSingleEntry, [id], (err, result) => {
    if (!result.rows.length) {
      return res.status(400).send(`No diary entry with ID ${id}`);
    }
    res.json(result.rows);
  });
};

module.exports = {
  viewAllEntries,
  postEntries,
  viewSingleEntry,
};
