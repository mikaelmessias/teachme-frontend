const Schema = require('mongoose').Schema;

const MentorSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    unique: true
  },

  skills: [{
    techId: {
      type: Schema.Types.ObjectId,
      ref: 'tech',
      required: true
    },
    price: {
      type: Number,
      required: true
    }
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
    ],
    required: true
  }]
}, {
  timestamps: true
});

module.exports = MentorSchema;