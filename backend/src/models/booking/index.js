const Schema = require('mongoose').Schema;

const BookingSchema = new Schema({
  date: {
    type: Date,
    required: true
  },

  duration: {
    type: Number,
    required: true
  },

  techId: {
    type: Schema.Types.ObjectId,
    ref: 'tech',
    required: true
  },

  padawanId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  jediId: {
    type: Schema.Types.ObjectId,
    ref: 'jedi',
    required: true
  },

  status: {
    type: String,
    enum: [
      'UNCONFIRMED',
      'CONFIRMED',
      'CANCELLED',
      'COMPLETED'
    ],
    default: 'UNCONFIRMED',
    required: true
  },

  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
}, {
  timestamps: true
});

module.exports = BookingSchema;