const Booking = require('../models/Booking');
const User = require('../models/User');
const Mentor = require('../models/Mentor');
const Tech = require('../models/Tech');

module.exports = {
  async index(req, res) {
    const { decoded } = req;
    
    const user = await User.findById(decoded.id);

    if(!user) {
      return res.status(404).json({
        error: "User does not exists"
      });
    }
    
    let bookings = null;

    if(user.access === "PADAWAN") {
      bookings = await Booking.find().where('user').equals(decoded.id)
      .populate('tech').populate('user').populate('mentor').populate('updatedBy');
    }
    else if(user.access === "MENTOR") {
      const mentor = await Mentor.findOne({
        user_id: decoded.id
      });

      bookings = await Booking.find({
        mentor: mentor._id
      }).populate('tech').populate('user').populate('updatedBy');
    }

    return res.json(bookings);
  },

  async store(req, res) {
    const { decoded } = req;    

    if(!await User.findById(decoded.id)) {
      return res.status(404).json({
        error: 'User does not exists'
      });
    }

    const mentor = await Mentor.findById(req.body.mentor);

    if(!mentor) {
      return res.status(404).json({
        error: 'Mentor does not exists'
      });
    }

    if(!await Tech.findById(req.body.tech)) {
      return res.status(404).json({
        error: 'Tech does not exists'
      });
    }

    const { date } = req.body

    if(await Booking.findOne({ date, mentor})) {
      return res.status(400).json({
        error: 'There is a booked attendance for the same date and mentor'
      });
    }

    const booking = await Booking.create({
      ...req.body,
      ...req.params,
      updatedBy: decoded.id,
      user: decoded.id
    });

    await booking.populate('tech').populate('user').populate('mentor').execPopulate();
    await booking.populate('mentor.user_id').execPopulate();

    return res.json(booking);
  },

  async update(req, res) {
    const { decoded } = req;
    const booking_id = req.params.booking;

    if(!await User.findById(decoded.id)) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    if(!await Booking.findById(booking_id)) {
      return res.status(404).json({
        error: "Booking not found"
      })
    }

    const update = await Booking.updateOne({
      _id: booking_id,
    }, { 
      ...req.body,
      updatedBy: decoded.id
    });

    const booking = await Booking.findById(booking_id);

    return res.json(booking);
  }
}