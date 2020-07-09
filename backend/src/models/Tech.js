const mongoose = require('mongoose');

const TechSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  logo: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

TechSchema.virtual('logo_url').get(function () {
  return `http://localhost:3333/files/techLogo/${this.logo}`;
});

module.exports = mongoose.model('Tech', TechSchema, 'techs');
