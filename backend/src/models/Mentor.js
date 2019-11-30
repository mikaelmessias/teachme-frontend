const mongoose = require('mongoose');
const Tech = require('./Tech');

const MentorSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skills: [{
    tech: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tech'
    },
    price: Number    
  }],
  availableAt: [{
    type: String,
    enum: [
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
      'SUNDAY'
    ]
  }]
});

module.exports = mongoose.model('Mentor', MentorSchema);