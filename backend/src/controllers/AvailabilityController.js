const Mentor = require('../models/Mentor');
const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { decoded } = req;

    if(!await User.findById(decoded.id)) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    const mentor = await Mentor.findOne({ user_id: decoded.id });

    if(!mentor) {
      return res.status(403).json({
        error: "Access not allowed for this user"
      })
    }

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