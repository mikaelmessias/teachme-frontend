const mongoose = require('mongoose');
const Tech = require('./Tech');

const MentorSchema = new mongoose.Schema({
  name: String,
  birthdate: Date,
  address: String,
  cpf: Number,
  email: String,
  password: String,
  description: String,
  skills: [{
    tech: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tech',
      required: true
    },
    price: Number    
  }],
  availableOn: [{
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
  }],
  avatar: String
});

module.exports = mongoose.model('Mentor', MentorSchema);