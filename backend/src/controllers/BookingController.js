const Booking = require('../models/Booking');
const User = require('../models/User');
const Mentor = require('../models/Mentor');

module.exports = {
  async store(req, res) {
    const { date, hour, duration, tech, status } = req.body;
    const { user_id } = req.headers;
    const { mentor_id } = req.params;

    const user = await User.findById(user_id);
    const mentor = await Mentor.findById(mentor_id);

    if(!user) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    if(!mentor) {
      return res.status(400).json({ error: 'Mentor does not exists '});
    }

    let booking = await Booking.findOne({ date, hour, mentor: mentor_id });

    if(booking) {
      return res.status(409).json({ error: 'There is a booked attendance for the same date and menthor' });
    }

    booking = await Booking.create({
      date,
      hour,
      duration,
      tech,
      user: user_id,
      mentor: mentor_id,
      status
    });

    await booking.populate('tech').populate('user').populate('mentor').execPopulate();

    return res.json(booking);
  }
}