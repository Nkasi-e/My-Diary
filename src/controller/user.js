const { database } = require("../db/database");
const { pool } = require("../db/db");
const {
  getAllEntries,
  registerEntry,
  getSingleEntry,
  removeEntry,
  UpdateEntry,
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

//Update entry
const modifyEntry = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  pool.query(getSingleEntry, [id], (err, result) => {
    if (result.rowCount <= 0) {
      return res.status(404).send(`No diary entry with the given ID No. ${id}`);
    }
    pool.query(UpdateEntry, [description, id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(`Diary with id No. ${id} successfully updated`);
    });
  });
};

//Delete a single Diary Entry
const deleteEntry = (req, res) => {
  const { id } = req.params;
  pool.query(removeEntry, [id], (err, result) => {
    if (result.rowCount <= 0) {
      return res.status(404).json(`Invalid request, entry does not exit`);
    } else {
      res.json({ message: `Diary with ID No. ${id} successfully deleted` });
    }
  });
};

module.exports = {
  viewAllEntries,
  postEntries,
  viewSingleEntry,
  deleteEntry,
  modifyEntry,
};
