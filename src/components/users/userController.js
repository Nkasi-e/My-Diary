const { User } = require('./model/userModel');
const {
  validateRegisterDetails,
  validateLoginDetails,
} = require('./userHelper');
const errorResponse = require('../middleware/errorResponse');

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
        'email'
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
 * @description - user profile
 */
const profile = async (req, res) => {
  return res.send(req.user);
};

module.exports = {
  registerUser,
  loginUser,
  profile,
};
