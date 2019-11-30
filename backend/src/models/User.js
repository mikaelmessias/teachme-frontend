const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  birthdate: String,
  address: String,
  cpf: Number,
  email: String,
  password: String,
  description: String,
  avatar: String,
  access: {
    type: String,
    enum: [
      'PADAWAN',
      'MENTOR'
    ],
    default: 'PADAWAN'
  }
});

module.exports = mongoose.model('User', UserSchema);