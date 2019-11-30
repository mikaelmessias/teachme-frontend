const Mentor = require('../models/Mentor');
const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { email } = req.body;
    const { filename } = req.file;

    let user = await User.findOne({ email });
    let mentor;

    if(user) {
      mentor = await Mentor.findOne({ user_id: user._id });
    }
    else {
      user = await User.create({
        ...req.body,
        access: "MENTOR",
        avatar: filename
      });

      let availableAt = req.body.availableOn.split(',');
      let skills = req.body.skills.split(';').map(
        info => ({
          tech: info.split(',')[0],
          price: info.split(',')[1]
        })
      )

      mentor = await Mentor.create({
        user_id: user._id,
        skills,
        availableAt
      });
    }

    await mentor.populate('user_id').populate('skills.tech').execPopulate();

    return res.json(mentor);
  } 
};