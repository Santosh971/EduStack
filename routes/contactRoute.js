const express = require('express');
const router = express.Router();
const { createContact, getAllContacts } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

// POST /api/contact - Submit contact form (public)
router.post('/contact', createContact);

// GET /api/admin/contacts - Get all contacts (admin - protected)
router.get('/admin/contacts', protect, getAllContacts);

module.exports = router;