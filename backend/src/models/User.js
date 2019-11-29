const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  birthdate: Date,
  address: String,
  cpf: Number,
  email: String,
  password: String,
  description: String,
});

module.exports = mongoose.model('User', UserSchema);