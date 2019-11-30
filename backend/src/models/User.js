const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  birthdate: String,
  address: String,
  cpf: Number,
  email: String,
  password: String,
  description: String,
  avatar: String
});

module.exports = mongoose.model('User', UserSchema);