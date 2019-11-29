const mongoose = require('mongoose');

const TechSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Tech', TechSchema);