const { Record } = require('./models/entriesSchema');
const { validateUserEntry, validateEntryUpdate } = require('./entryHelper');
const errorResponse = require('../middleware/errorResponse');

// Creating diary entry
const postEntry = async (req, res) => {
  const { title, body } = req.body;
  try {
    const { error } = validateUserEntry(req.body);
    if (error) {
      const errorField = error.details[0].context.key;
      const errorMessage = error.details[0].message;
      return errorResponse(res, 400, errorMessage, errorField);
    }
    const data = await Record.create({ title, body });
    res
      .status(201)
      .json({ message: `Diary entry created successfully`, Entry: data });
  } catch (e) {
    res.status(500).json({
      message: `Internal server error`,
      e,
    });
    console.log(e);
  }
};

// Get all diary entries
const viewAllEntries = async (req, res) => {
  try {
    const data = await Record.findAll();
    res.json({ message: `All Entries`, total: data.length, Entries: data });
  } catch (e) {
    res.status(500).json({ message: `Internal server error` });
    // console.log(e);
  }
};

// Getting a single diary entry
const viewSingleEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Record.findByPk(id);
    if (!data) {
      return errorResponse(
        res,
        404,
        `Entry with ID NO. ${id} doesn't exist`,
        'id'
      );
    }
    res.json({ message: `Entry found`, total: data.length, entry: data });
  } catch (error) {
    res.status(500).json({
      message: `Internal server error`,
    });
  }
};

// Update entry
const modifyEntry = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  try {
    const { error } = validateEntryUpdate(req.body);
    if (error) {
      const errorField = error.details[0].context.key;
      const errorMessage = error.details[0].message;
      return errorResponse(res, 400, errorMessage, errorField);
    }
    const data = await Record.findOne({ where: { id } });
    if (!data) {
      return errorResponse(
        res,
        404,
        `Entry with ID NO. ${id} doesn't exist`,
        'id'
      );
    }
    await Record.update({ title, body }, { where: { id } });
    res.status(202).json({
      message: `Entry with ID number ${id} updated successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: `Internal server error` });
  }
};

// Delete a single Diary Entry
const deleteEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Record.findOne({ where: { id } });
    if (!data) {
      return errorResponse(
        res,
        404,
        `Entry with ID NO. ${id} doesn't exist`,
        'id'
      );
    }
    await data.destroy();
    res.status(204).json({ message: `Successfully deleted entry` });
  } catch (err) {
    res.status(500).json({ message: `Internal server error` });
  }
};

module.exports = {
  viewAllEntries,
  postEntry,
  viewSingleEntry,
  deleteEntry,
  modifyEntry,
};
