const { Record } = require('./models/entriesSchema');

// Creating diary entry
const postEntry = async (req, res) => {
  const { title, body } = req.body;
  try {
    const { error } = req.body;
    if (error) {
      return res
        .status(404)
        .json({ message: `Unable to create entry ${title},` });
    }
    const data = await Record.create({ title, body });
    res
      .status(201)
      .json({ message: `Diary entry created successfully`, Entry: data });
  } catch (e) {
    res.status(500).json({
      message: `Error Occurred`,
      error: e.message,
    });
  }
};

// Get all diary entries
const viewAllEntries = async (req, res) => {
  try {
    const data = await Record.findAll();
    res.json({ message: `All Entries`, total: data.length, Entries: data });
  } catch (e) {
    res.status(500).json({ message: `Error occurred`, e });
  }
};

// Getting a single diary entry
const viewSingleEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Record.findByPk(id);
    if (!data) {
      return res
        .status(404)
        .json({ message: `Entry with id ${id} does not exist` });
    }
    res.json({ message: `Entry found`, total: data.length, entry: data });
  } catch (error) {
    res.status(500).json({
      message: `Error occurred. Please try again later`,
      error: error,
    });
  }
};

// Update entry
const modifyEntry = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  try {
    const data = await Record.findOne({ where: { id } });
    if (!data) {
      return res
        .status(404)
        .json({ message: `Invalid entry ID ${id}. Entry not found` });
    }
    await Record.update({ title, body }, { where: { id } });
    res.status(202).json({
      message: `Entry with ID number ${id} updated successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: `Updating entry failed`, error: error });
  }
};

// Delete a single Diary Entry
const deleteEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Record.findOne({ where: { id } });
    if (!data) {
      return res
        .status(404)
        .json({ message: `Entry with ID No. ${id} does not exist` });
    }
    await data.destroy();
    res.status(204).json({ message: `Successfully deleted entry` });
  } catch (err) {
    res.status(500).json({ message: `Deleting failed`, error: err });
  }
};

module.exports = {
  viewAllEntries,
  postEntry,
  viewSingleEntry,
  deleteEntry,
  modifyEntry,
};
