const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'gga_mep_secure_jwt_token_secret_2026';

// Admin Login
async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    const trimmedUser = username.trim();

    // Find user by username or email
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: trimmedUser },
          { email: trimmedUser }
        ]
      }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact administrator.'
      });
    }

    // Verify bcrypt password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Update lastLogin timestamp
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token (expires in 7 days)
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role || 'admin'
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication: ' + error.message
    });
  }
}

// Verify current session token
async function verifySession(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'username', 'email', 'role', 'isActive', 'lastLogin']
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'User invalid or inactive' });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
}

module.exports = {
  login,
  verifySession
};

