//getting all users from  the database
const getAllEntries = "SELECT * FROM record";

//Getting a single user from the database
const getSingleEntry = "SELECT * FROM record WHERE id = $1";

//Checking if email already exist
const existingEmail = "SELECT s FROM users s WHERE s.email = $1";

//Registering users into the database
const registerEntry =
  "INSERT INTO record (title, description, date) VALUES($1, $2, $3)";

//Deleting Users
const removeEntry = "DELETE FROM record WHERE id = $1";

module.exports = {
  getAllEntries,
  registerEntry,
  getSingleEntry,
  existingEmail,
  removeEntry,
};
