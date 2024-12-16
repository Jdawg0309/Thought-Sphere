const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    req.user = user; // Attach user to the request object
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
