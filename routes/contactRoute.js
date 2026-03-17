const express = require('express');
const router = express.Router();
const { createContact, getAllContacts } = require('../controllers/contactController');

// POST /api/contact - Submit contact form
router.post('/contact', createContact);

// GET /api/admin/contacts - Get all contacts (admin)
router.get('/admin/contacts', getAllContacts);

module.exports = router;