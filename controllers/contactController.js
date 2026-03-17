const Contact = require('../models/Contact');

// POST /api/contact - Create a new contact submission
const createContact = async (req, res) => {
  try {
    const { name, email, mobileNo, courses } = req.body;

    // Validate required fields
    if (!name || !email || !mobileNo || !courses || courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, email, mobileNo, courses'
      });
    }

    // Create new contact
    const contact = new Contact({
      name,
      email,
      mobileNo,
      courses
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// GET /api/admin/contacts - Get all contact submissions
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
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
  createContact,
  getAllContacts
};