const Mentor = require('../models/Mentor');
const User = require('../models/User');
const Tech = require('../models/Tech');

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

    const { tech } = req.body;

    if(!await Tech.findOne({ _id: tech })) {
      return res.status(404).json({
        error: "The tech id is invalid"
      });
    }
    
    let isDuplicate = false;
    
    mentor.skills.forEach((item, index) => {
      if(item.tech == tech) {
        isDuplicate = true;
      }
    });

    if(isDuplicate) {
      return res.status(400).json({
        error: "Skill already registred"
      });
    }

    mentor.skills.push(req.body);
    mentor.save();

    await mentor.populate('user_id').populate('skills.tech').execPopulate();

    return res.json(mentor);
  },

  async destroy(req, res) {
    const { decoded } = req;

    await Mentor.updateOne({ user_id: decoded.id }, {
      "$pull": {
        "skills": {
          "tech": req.params.tech_id
        }
      }
    }, { safe: true, multi:true }, (err, raw) => {});

    const mentor = await Mentor.findOne({ user_id: decoded.id });

    await mentor.populate('user_id').populate('skills.tech').execPopulate();

    return res.json(mentor);
  }
}