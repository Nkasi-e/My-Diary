const jwt = require('jsonwebtoken');

// AUTHORIZING USERS
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Checking if auth header/Bearer token exist
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401).json({ message: `Invalid authentication` });
    throw new Error('Invalid token');
  }

  const token = authHeader.split(' ')[1];
  try {
    // Verifying token
    const payload = jwt.verify(token, process.env.JWT_SECRETE);
    const { userId, email } = payload;
    const user = { userId, email };
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: `Not authorized to access this route` });
  }
};

module.exports = authMiddleware;