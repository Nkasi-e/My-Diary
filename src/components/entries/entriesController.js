const { Record } = require("./models/entriesSchema");

//Creating diary entries
const postEntries = async (req, res) => {
  const { title, body, date } = req.body;
  try {
    const data = await Record.create({ title, body, date });
    res.status(201).json({ message: `Diary entry created successfully`, data });
  } catch (e) {
    res.status(500).json({
      message: `Unable to create diary entry ${title},`,
      error: e.message,
    });
  }
};

//Get all diary entries
const viewAllEntries = async (req, res) => {
  try {
    const data = await Record.findAll();
    res.json({ message: `All Entries`, data });
  } catch (e) {
    res
      .status(404)
      .json({ message: `Unable to get Entries`, error: e.message });
  }
  // res.json(data);
};

//Getting a single diary entry
const viewSingleEntry = (req, res) => {};

//Update entry
const modifyEntry = (req, res) => {};

//Delete a single Diary Entry
const deleteEntry = (req, res) => {};

module.exports = {
  viewAllEntries,
  postEntries,
  viewSingleEntry,
  deleteEntry,
  modifyEntry,
};
