const Booking = require('../models/Booking');

module.exports = {
  async store(req, res) {
    const { date } = req.body;
    const { duration } = req.body;
    const { tech } = req.body;
    const { user } = req.body;
    const { mentor } = req.body;
    const { status } = req.body;

    let booking = await Booking.findOne({ date, user, mentor });

    if(!booking) {
      booking = await Booking.create({
        date,
        duration,
        tech,
        user,
        mentor,
        status
      });
    }

    return res.json(booking);
  }
}