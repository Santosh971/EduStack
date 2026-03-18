const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT Token
const generateToken = (adminId) => {
  return jwt.sign(
    { adminId },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: '7d' }
  );
};

// POST /api/admin/login - Admin login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Debug: Log incoming request (remove in production later)
    console.log('Login attempt:', { email: email?.toLowerCase() });

    // Validate required fields
    if (!email || !password) {
      console.log('Login failed: Missing email or password');
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    // Debug: Check if admin was found
    console.log('Admin found:', !!admin);

    if (!admin) {
      console.log('Login failed: Admin not found for email:', email.toLowerCase());
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Compare password
    const isMatch = await admin.comparePassword(password);

    // Debug: Check password match
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('Login failed: Password mismatch for email:', email.toLowerCase());
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(admin._id);

    console.log('Login successful for:', email.toLowerCase());

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// POST /api/admin/register - Create initial admin (for setup only)
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: email, password, name'
      });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin with this email already exists'
      });
    }

    // Create new admin
    const admin = new Admin({
      email: email.toLowerCase(),
      password,
      name
    });

    await admin.save();

    // Generate token
    const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: {
        token,
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  login,
  register
};