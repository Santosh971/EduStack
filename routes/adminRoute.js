const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// One-time use: Reset admin credentials
// DELETE THIS FILE AFTER USE IN PRODUCTION!
router.post('/admin/reset-credentials', async (req, res) => {
  try {
    // Delete all existing admins
    const deleteResult = await Admin.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing admin(s)`);

    // Create new admin with updated credentials
    const newAdmin = new Admin({
      email: 'admin@edustack.ca',
      password: 'edustack123', // Will be hashed by pre-save hook
      name: 'Admin'
    });

    await newAdmin.save();
    console.log('New admin created successfully');

    res.status(200).json({
      success: true,
      message: 'Admin credentials reset successfully',
      admin: {
        email: newAdmin.email,
        name: newAdmin.name
      }
    });
  } catch (error) {
    console.error('Reset error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to reset admin credentials',
      error: error.message
    });
  }
});

module.exports = router;