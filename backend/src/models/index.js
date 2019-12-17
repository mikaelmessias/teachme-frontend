const model = require('mongoose').model;

const UserSchema = require('./user');
const MentorSchema = require('./mentor');
const TechSchema = require('./tech');
const BookingSchema = require('./booking');

module.exports = {
  User: model('user', UserSchema, 'users'),
  Mentor: model('mentor', MentorSchema, 'mentors'),
  Tech: model('tech', TechSchema, 'techs'),
  Booking: model('booking', BookingSchema, 'bookings')
}