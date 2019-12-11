const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  date: Date,
  duration: Number,
  tech: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tech'
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
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', BookingSchema);