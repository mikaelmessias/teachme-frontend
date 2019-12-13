const mongoose = require('mongoose');

const TechSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  thumbnail: String
}, {
  toJSON: {
    virtuals: true,
  }
});

TechSchema.virtual('thumbnail_url').get(function() {
  return `http://localhost:3333/files/thumbnail/${this.thumbnail}`;
});

module.exports = mongoose.model('Tech', TechSchema, 'techs');