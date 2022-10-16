const { User } = require('./model/userModel');

/**
 * @description - create user controller
 *
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const duplicate = await User.findOne({ where: { email } });

    if (duplicate)
      return res.status(409).json({ message: `email already exist` });

    const user = await User.create({
      name,
      email,
      password,
    });
    const token = user.createJWT({ userId: user.id, email: user.email });
    res.json({ user: user, token });
  } catch (e) {
    console.log(e);
  }
};
// FOR LOGGING INTO A USER ACCOUNT
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'please provide email and password' });
    }
  } catch (e) {
    res.send(404);
  }

  res.send('login');
};
async function deleteAccount(req, res) {
  res.send('delete acc');
}

module.exports = {
  registerUser,
  loginUser,
};
