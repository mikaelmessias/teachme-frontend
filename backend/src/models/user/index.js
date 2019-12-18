const Schema = require('mongoose').Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  birthdate: {
    type: Date,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  cpf: {
    type: Number,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  biography: {
    type: String,
    required: true
  },

  avatar: {
    type: String,
    required: true
  },

  access: {
    type: String,
    enum: [
      'PADAWAN',
      'JEDI'
    ],
    default: 'PADAWAN'
  }
}, {
  timestamps: true,

  toJSON: { virtuals: true }
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
    return jwt.sign({ id: this.id, access: this.access }, "secret", {
      expiresIn: 86400
    });
  }
};

UserSchema.virtual('avatarURL').get(function() {
  return `http://localhost:3333/files/avatar/${this.avatar}`;
});

module.exports = UserSchema;