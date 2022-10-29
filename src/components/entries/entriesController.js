const { Record } = require('./models/entriesSchema');
const { validateUserEntry, validateEntryUpdate } = require('./entryHelper');
const errorResponse = require('../middleware/errorResponse');

// Creating diary entry
const postEntry = async (req, res) => {
  const { userid } = req.user;
  const { title, body } = req.body;

  try {
    // Checking for error request from user
    const { error } = validateUserEntry(req.body);
    if (error) {
      const errorField = error.details[0].context.key;
      const errorMessage = error.details[0].message;
      return errorResponse(res, 400, errorMessage, errorField);
    }

    // creating a new entry
    const data = await Record.create({ title, body, userid });
    res
      .status(201)
      .json({ message: `Diary entry created successfully`, Entry: data });
  } catch (e) {
    res.status(500).json({
      message: `Internal server error`,
    });
    console.log(e);
  }
};

// Get all diary entries
const viewAllEntries = async (req, res) => {
  const { userid } = req.user;
  try {
    const user = await Record.findOne({ where: { userid } });
    if (!user)
      return errorResponse(
        res,
        204,
        `No diary logs associated with the provided user details`,
        'user not found'
      );

    const data = await Record.findAll({ where: { userid } });
    res.json({ message: `All Entries`, total: data.length, Entries: data });
  } catch (e) {
    res.status(500).json({ message: `Internal server error` });
    console.log(e);
  }
};

// Getting a single diary entry
const viewSingleEntry = async (req, res) => {
  const { userid } = req.user;
  const { id } = req.params;
  try {
    const data = await Record.findOne({ where: { id } });

    // checking if data entry exist
    if (!data) {
      return errorResponse(
        res,
        404,
        `Entry with ID NO. ${id} doesn't exist`,
        'id'
      );
    }

    // checking if the entry belongs to the user
    const user = await Record.findOne({ where: { id, userid } });
    if (!user) {
      return errorResponse(
        res,
        401,
        `You are not authorized to view this section`,
        'authorization'
      );
    }

    // returning the entry data
    res.json({
      message: `Entry found`,
      total: data.length,
      entry: data,
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal server error`,
    });
    console.log(error);
  }
};

// Update entry
const modifyEntry = async (req, res) => {
  const { userid } = req.user;
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    // checking for user error with joi
    const { error } = validateEntryUpdate(req.body);
    if (error) {
      const errorField = error.details[0].context.key;
      const errorMessage = error.details[0].message;
      return errorResponse(res, 400, errorMessage, errorField);
    }

    // checking if the data entry exist
    const data = await Record.findOne({ where: { id } });
    if (!data) {
      return errorResponse(
        res,
        404,
        `Entry with ID NO. ${id} doesn't exist`,
        'id'
      );
    }

    // checking if the entry belongs to the user making the request
    const user = await Record.findOne({ where: { id, userid } });
    if (!user)
      return errorResponse(
        res,
        401,
        `You are not authorized to update this section`,
        'authorization'
      );

    // updating the data entry
    await Record.update({ title, body }, { where: { id, userid } });
    res.status(202).json({
      message: `Entry with ID number ${id} updated successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: `Internal server error` });
    console.log(error);
  }
};

// Delete a single Diary Entry
const deleteEntry = async (req, res) => {
  const { userid } = req.user;
  const { id } = req.params;

  try {
    const data = await Record.findOne({ where: { id } });

    // checking if data entry exist
    if (!data) {
      return errorResponse(
        res,
        404,
        `Entry with ID NO. ${id} doesn't exist`,
        'id'
      );
    }

    // checking if the entry belongs to the user sending the request
    const user = await Record.findOne({ where: { id, userid } });
    if (!user)
      return errorResponse(
        res,
        401,
        `You are not authorized to delete this section`,
        'authorization'
      );

    // deleting the data entry
    await data.destroy();
    res.status(204).json({ message: `Successfully deleted entry` });
  } catch (err) {
    res.status(500).json({ message: `Internal server error` });
    console.log(err);
  }
};

module.exports = {
  viewAllEntries,
  postEntry,
  viewSingleEntry,
  deleteEntry,
  modifyEntry,
};
