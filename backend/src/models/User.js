const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

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

UserSchema.pre("save", async function hashPassword(next) {
  if(!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password);
  },

  generateToken() {
    return jwt.sign({ id: this.id }, "secret", {
      expiresIn: 86400
    });
  }
};

module.exports = mongoose.model('User', UserSchema);