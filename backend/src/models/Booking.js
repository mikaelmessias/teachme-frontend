const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  date: Date,
  duration: Number,
  tech: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TechSchema'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserSchema'
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MentorSchema'
  },
  status: {
    type: String,
    enum: [
      'UNCONFIRMED',
      'CONFIRMED',
      'CANCELLED',
      'COMPLETED'
    ],
    default: 'UNCONFIRMED'
  }
});

module.exports = mongoose.model('Booking', BookingSchema);