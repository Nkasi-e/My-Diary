const { User } = require('./model/userModel');
const {
  hashPassword,
  comparePassword,
  validateRegisterDetails,
  validateLoginDetails,
} = require('./userHelper');

/**
 * @description - create user controller
 *
 */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // const { error } = validateRegisterDetails(req.body);
    // if (error) return res.status(401).json({ message: `Registration failed` });
    const user = await User.create({ name, email, password: hashPassword });
    return res.json({ user });
  } catch (error) {
    console.log('empty');
  }
};

/**
 * @description - Login user controller
 */

const loginUser = async (req, res) => {
  try {
    console.log('login user');
  } catch (error) {
    console.log('empty');
  }
};

const getUser = async (req, res) => {
  try {
    res.send('single user');
  } catch (error) {
    console.log('empty');
  }
};

const updateUser = async (req, res) => {
  try {
    console.log('Update user');
  } catch (error) {
    console.log('empty');
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
};
