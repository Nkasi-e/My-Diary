const jwt = require('jsonwebtoken');
require('dotenv').config();

// AUTHORIZING USERS
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  // const token = req.headers['x-access-token'] || req.headers.authorization;

  // Checking if auth header/Bearer token exist
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: `Invalid authentication` });
  }

  const accessToken = token.split(' ')[1];
  try {
    // Verifying token
    const payLoad = jwt.verify(accessToken, process.env.JWT_SECRETE);

    const { userid, email } = payLoad;
    const user = { userid, email };

    // // To check token for loging out
    // req.token = token;

    // creating user object
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: `Not authorized to access this route` });
    console.log(error);
  }
};

module.exports = authMiddleware;
