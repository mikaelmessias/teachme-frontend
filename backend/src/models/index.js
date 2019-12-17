const model = require('mongoose').model;

const UserSchema = require('./user');
const JediSchema = require('./jedi');
const TechSchema = require('./tech');
const BookingSchema = require('./booking');

module.exports = {
  User: model('user', UserSchema, 'users'),
  Jedi: model('jedi', MentorSchema, 'jedis'),
  Tech: model('tech', TechSchema, 'techs'),
  Booking: model('booking', BookingSchema, 'bookings')
}