//getting all users from  the database
const getAllUsers = "SELECT * FROM users";

//Registering users into the database
const registerUsers = "INSERT INTO users";

//Getting a single user from the database
const getSingleUser = "SELECT * FROM users WHERE id = $1";

module.exports = {
  getAllUsers,
  registerUsers,
  getSingleUser,
};
