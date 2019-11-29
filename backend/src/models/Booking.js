const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  date: String,
  hour: String,
  duration: Number,
  tech: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tech',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor'
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