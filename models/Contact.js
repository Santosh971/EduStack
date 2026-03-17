const mongoose = require('mongoose');

const VALID_COURSES = ['A1', 'A2', 'B1', 'B2'];

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  mobileNo: {
    type: String,
    required: true,
    trim: true
  },
  courses: {
    type: [String],
    required: true,
    enum: VALID_COURSES,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one course must be selected'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);