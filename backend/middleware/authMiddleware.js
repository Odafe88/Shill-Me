const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided. Unauthorized.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the ID from the token payload
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found. Unauthorized.' });
    }

    // Attach user data to the request object
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, // Borrower or Lender
      walletAddress: user.walletAddress,
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid token. Unauthorized.' });
  }
};

module.exports = authMiddleware;
