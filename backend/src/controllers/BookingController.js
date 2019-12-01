const Booking = require('../models/Booking');
const User = require('../models/User');
const Mentor = require('../models/Mentor');
const Tech = require('../models/Tech');

module.exports = {
  async store(req, res) {
    const { decoded } = req;    

    if(!await User.findById(decoded.id)) {
      return res.status(404).json({ error: 'User does not exists' });
    }

    const mentor = await Mentor.findById(req.params.mentor);

    if(!mentor) {
      return res.status(404).json({ error: 'Mentor does not exists '});
    }

    if(!await Tech.findById(req.body.tech)) {
      return res.status(404).json({ error: 'Tech does not exists '});
    }

    const { date, hour } = req.body

    if(await Booking.findOne({ date, hour, mentor})) {
      return res.status(400).json({
        error: 'There is a booked attendance for the same date and mentor'
      });
    }

    const booking = await Booking.create({
      ...req.body,
      ...req.params,
      user: decoded.id
    });

    await booking.populate('tech').populate('user').populate('mentor').execPopulate();
    await booking.populate('mentor.user_id').execPopulate()

    return res.json(booking);
  }
}