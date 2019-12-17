const Schema = require('mongoose').Schema;

const TechSchema = new Schema({
  description: {
    type: String,
    required: true,
    unique: true
  },

  thumbnail: {
    type: String,
    required: true
  }
}, {
  timestamps: true,

  toJSON: { virtuals: true }
});

TechSchema.virtual('thumbnailURL').get(function() {
  return `http://localhost:3333/files/thumbnail/${this.thumbnail}`;
});

module.exports = TechSchema;