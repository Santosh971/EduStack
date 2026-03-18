const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');

// POST /api/admin/login - Admin login
router.post('/admin/login', login);

// POST /api/admin/register - Create new admin (use for initial setup)
router.post('/admin/register', register);

module.exports = router;