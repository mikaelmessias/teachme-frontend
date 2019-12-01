const Mentor = require('../models/Mentor');
const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { decoded } = req;

    const mentor = await Mentor.findOne({ user_id: decoded.id });

    mentor.skills.push({
      "tech": req.body.tech,
      "price": req.body.price
    });

    mentor.save();

    return res.json(mentor);
  },

  async remove(req, res) {
    const { decoded } = req;    

    Mentor.updateOne({ user_id: decoded.id }, {
      "$pull": {
        "skills": {
          "_id": req.body.skillId
        }
      }
    }, { safe: true, multi:true }, (err, raw) => {});

    const mentor = await Mentor.findOne({ user_id: decoded.id });

    return res.json(mentor);
  }
}