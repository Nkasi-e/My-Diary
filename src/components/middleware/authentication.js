const jwt = require('jsonwebtoken');

// AUTHORIZING USERS
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  // Checking if auth header/Bearer token exist
  if (!token || !token.startsWith('Bearer ')) {
    res.status(401).json({ message: `Invalid authentication` });
    throw new Error('Invalid token');
  }

  const accessToken = token.split(' ')[1];
  try {
    // Verifying token
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    const { userId, email } = payload;
    const user = { userId, email };
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: `Not authorized to access this route` });
  }
};

module.exports = authMiddleware;
