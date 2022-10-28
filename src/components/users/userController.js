const { User, hashPassword } = require('./model/userModel');
const {
  validateRegisterDetails,
  validateLoginDetails,
} = require('./userHelper');
const errorResponse = require('../middleware/errorResponse');
const { where } = require('../config/config');

/**
 * @description - Create/Register user controller
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { error } = validateRegisterDetails(req.body);

    // Handling client error
    if (error) {
      const errorField = error.details[0].context.key;
      const errorMessage = error.details[0].message;
      return errorResponse(res, 400, errorMessage, errorField);
    }

    // Checking for existing user
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return errorResponse(res, 409, 'The email already exists.', 'email');

    // creating new user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Deleting password before sending response
    delete user.dataValues.password;

    // creating jsonwebtoken
    const token = user.createJWT({ userid: user.id, email: user.email });
    res.json({ message: `Registration successful`, user: user, token });
  } catch (e) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.log(e);
  }
};

/**
 * @description - Logging in Users
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = validateLoginDetails(req.body);
    if (error) {
      const errorField = error.details[0].context.key;
      const errorMessage = error.details[0].message;
      return errorResponse(res, 400, errorMessage, errorField);
    }

    // Checking user
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser)
      return errorResponse(res, 400, "The email doesn't exist", 'email');

    // Comparing user password
    const compare = existingUser.password;
    const match = await existingUser.comparePassword(password, compare);
    if (!match)
      return errorResponse(
        res,
        400,
        'The email or password is Invalid',
        'email/password'
      );

    // deleting password before sending response
    const user = existingUser.dataValues;
    delete existingUser.dataValues.password;

    // Creating JWT for client
    const token = existingUser.createJWT({
      userid: user.id,
      email: user.email,
    });
    res.json({ message: `Login successful`, user, token });
  } catch (e) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @description - controller for getting personal user profile information
 */
const userProfile = async (req, res) => {
  const { userid } = req.user;
  const id = userid;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user)
      return errorResponse(
        res,
        404,
        `This account has been deleted`,
        'Invalid account'
      );
    await User.findAll({ where: { id } });
    res.json({ message: `My Profile`, user });
  } catch (error) {
    res.status(500).json({ error: `Internal server error` });
    console.log(error);
  }
};

/**
 * @description - controller for deleting user Account
 */
const deleteAccount = async (req, res) => {
  const { userid } = req.user;
  const id = userid;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user)
      return errorResponse(
        res,
        404,
        `The account doesn't exist`,
        'Invalid account'
      );
    await user.destroy({ where: { id } });
    res.json({ message: `Account deleted successfully` });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  userProfile,
  deleteAccount,
};
