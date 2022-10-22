const { validateEntry, updateEntry } = require('./entryValidation');

const options = { language: { key: '{{key}} ' } };

const validateUserEntry = (entry) => {
  return validateEntry.validate(entry, options);
};

const validateEntryUpdate = (entry) => {
  return updateEntry.validate(entry, options);
};

module.exports = { validateUserEntry, validateEntryUpdate };
