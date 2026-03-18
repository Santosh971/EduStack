/**
 * Script to reset admin credentials
 * Run: node scripts/resetAdmin.js
 */

const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const resetAdmin = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/edustack';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected');

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
    console.log('');
    console.log('===================================');
    console.log('   NEW ADMIN CREDENTIALS');
    console.log('===================================');
    console.log('Email: admin@edustack.ca');
    console.log('Password: edustack123');
    console.log('===================================');
    console.log('');
    console.log('✅ Admin reset successfully!');
    console.log('⚠️  IMPORTANT: Delete this script after use in production!');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

resetAdmin();