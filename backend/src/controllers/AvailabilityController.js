const Mentor = require('../models/Mentor');
const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { decoded } = req;

    const mentor = await Mentor.findOne({ user_id: decoded.id });

    if(req.body.days)  {
      mentor.availableAt = req.body.days;
      mentor.save();
    }
    else {
      return res.status(400).json({
        error: "At least 1 argument expected"
      })
    }

    return res.json(mentor);
  }
}