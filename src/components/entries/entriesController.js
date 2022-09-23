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
const viewSingleEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Record.findByPk(id);
    if (data === null) {
      return res.status(404).json({ message: `Entry with id ${id} not found` });
    }
    res.json({ message: `Entry found`, data: data });
  } catch (error) {
    res.status(500).json({
      message: `Error occurred. Please try again later`,
      error: error.message,
    });
  }
};

//Update entry
const modifyEntry = async (req, res) => {
  const { id } = req.params;
  const { title, body, date } = req.body;
  try {
    const data = await Record.findOne({ where: { id } });
    if (data === null) {
      return res
        .status(404)
        .json({ message: `Invalid entry ID ${id}. Entry not found` });
    }
    await Record.update({ title, body, date }, { where: { id } });
    res.json({
      message: `Entry with ID number ${id} updated successfully`,
      data: res.body,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Updating entry failed`, error: error.message });
  }
};

//Delete a single Diary Entry
const deleteEntry = (req, res) => {};

module.exports = {
  viewAllEntries,
  postEntries,
  viewSingleEntry,
  deleteEntry,
  modifyEntry,
};
