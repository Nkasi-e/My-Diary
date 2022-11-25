const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('./model/userModel');
const {
  validateRegisterDetails,
  validateLoginDetails,
  validateEmail,
  validatePassword,
} = require('./userHelper');
const errorResponse = require('../middleware/errorResponse');
const {
  sendWelcomeEmail,
  sendGoodbyeEmail,
  sendResetPasswordEmail,
  sendSuccessPasswordEmail,
} = require('../utils/mail');

const { LINK_LIFETIME, JWT_SECRETE } = process.env;

/**
 * @description - Create/Register user controller
 */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
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

    // sending welcome email to user after registering successfully
    sendWelcomeEmail(user.email, user.name);

    // creating jsonwebtoken
    const token = user.createJWT({ userid: user.id, email: user.email });
    res
      .status(201)
      .json({ message: `Registration successful`, user: user, token });
  } catch (e) {
    res.status(500).json({ error: 'Internal Server Error' });
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
        'Invalid'
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
        `This account does not exist`,
        'Invalid account'
      );
    await User.findAll({ where: { id } });
    res.status(200).json({ message: `My Profile`, user });
  } catch (error) {
    res.status(500).json({ error: `Internal server error` });
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

    // sending goodbye email to user after deletion
    sendGoodbyeEmail(user.email, user.name);
    // send response
    res.status(204).json({ message: `Account deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error` });
  }
};

// getting user info with token
const userInfo = async (req, res) => {
  const { token } = req.params;
  try {
    const payLoad = jwt.verify(token, process.env.JWT_SECRETE);
    if (!payLoad) errorResponse(res, 400, `token is not valid`, 'token');
    res.status(200).json({ success: true, payLoad });
  } catch (e) {
    res.status(500).json({ error: `Internal Server Error` });
  }
};

// FORGOT PASSWSWORD FLOW

/**
 * @descriptions - controller handling forgot password request from user and sending link for resetting the password
 */
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Handling user error
    const { error } = validateEmail(req.body);
    if (error) {
      const errorField = error.details[0].context.key;
      const errorMessage = error.details[0].message;
      return errorResponse(res, 400, errorMessage, errorField);
    }

    // checking for user
    const user = await User.findOne({ where: { email } });
    if (!user)
      return errorResponse(res, 404, `The email doesn't exist`, 'email');
    const secret = JWT_SECRETE + user.password;
    const payload = {
      email: user.email,
      id: user.id,
      name: user.name,
    };

    // signing a new jwt for user and sending link
    const token = jwt.sign(payload, secret, { expiresIn: '10m' });
    const link = `http://localhost:3000/api/v1/user/reset-password/${user.id}/${token}`;

    // sending reset link to email address
    sendResetPasswordEmail(user.email, link);
    res.status(200).json({
      message: `Password reset link has been sent to your email ${email}`,
    });
  } catch (e) {
    res.status(500).json({ error: `Internal Server Error` });
  }
};

/**
 * @descriptions - Demo respons on the browser
 */
const linkMessage = (req, res) => {
  const { id, token } = req.params;
  res.status(200).send({
    message: `Use the link below to reset your password`,
    link: `${id}/${token}`,
  });
};

/**
 * @descriptions - Controller for reseting the users password and saving the new password to the database.
 */
const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    // checking for user error
    const { error } = validatePassword(req.body);
    if (error) {
      const errorField = error.details[0].context.key;
      const errorMessage = error.details[0].message;
      return errorResponse(res, 400, errorMessage, errorField);
    }

    // checking for user in database
    const user = await User.findOne({ where: { id } });
    if (!user) return errorResponse(res, 400, `Invalid ID...`, 'id');
    const secret = process.env.JWT_SECRETE + user.password;

    // verifying users token
    const payload = jwt.verify(token, secret);

    // hashing new password before saving
    const hashPassword = await bcrypt.hash(password, 10);

    /// updating user's password
    await user.update({ password: hashPassword }, { where: { id } });

    // sending success mail
    sendSuccessPasswordEmail(user.email, user.name);
    res.status(200).json({
      success: true,
      message: `You have successfully reset your password`,
    });
    return payload;
  } catch (e) {
    res.status(500).json({ error: `Internal Server error` });
  }
};

module.exports = {
  registerUser,
  loginUser,
  userProfile,
  deleteAccount,
  userInfo,
  forgotPassword,
  resetPassword,
  linkMessage,
};
