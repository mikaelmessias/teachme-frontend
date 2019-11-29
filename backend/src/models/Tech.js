const mongoose = require('mongoose');

const TechSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  thumbnail: String
});

module.exports = mongoose.model('Tech', TechSchema);