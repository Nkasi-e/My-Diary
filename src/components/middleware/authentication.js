const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

// AUTHORIZING USERS
async function authorization(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      res.status(StatusCodes.UNAUTHORIZED);
      res.json({ message: 'invalid user token' });
      throw new Error('invalid user id');
    }
    const token = authHeader.split(' ')[1];
    //  verifying user token
    const payLoad = jwt.verify(token, process.env.JWT_SECRETE);
    const { userid, username } = payLoad;
    const user = { userid, username };

    // creating user object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      res.status(StatusCodes.UNAUTHORIZED);
      res.json({ message: ' invalid user token' });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.json({ message: 'Something went wrong' });
    }
  }
}

module.exports = authorization;
