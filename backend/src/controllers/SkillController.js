const { Mentor, User, Tech } = require('../models/index');

module.exports = {
  async store(req, res) {
    const { decoded } = req;
    const { techId } = req.body;

    const response = {
      mentor: {},
      status: 201,
      error: []
    }

    let mentor = null;
    let isDuplicate = false;

    await Mentor.findOne({ userId: decoded.id })
      .populate('userId')
      .populate('skills.tech')
      .then(data => {
        if (!data) {
          response.status = 404;
          response.error.push('Mentor not found');
        }
        else {
          mentor = data;
        }
      })
      .catch(err => {
        console.log(err);

        response.status = 400;
        response.error.push(err.message);
      })
      .finally();

    if (mentor) {
      if (!await Tech.findById(techId)) {
        response.status = 404;
        response.error.push('The tech id is invalid');
      }
      else {
        mentor.skills.forEach(skill => {
          if (skill.techId._id == techId) {
            isDuplicate = true;
          }
        });

        if (isDuplicate) {
          response.status = 400;
          response.error.push('Skill already registred');
        }
        else {
          mentor.skills.push(req.body);
          mentor.save();

          response.mentor = mentor;
        }
      }
    }

    return res.status(response.status).json(response);
  },

  async destroy(req, res) {
    const { decoded } = req;
    const { techId } = req.params;

    const response = {
      mentor: {},
      status: 201,
      error: []
    }

    const filter = { userId: decoded.id }
    const update = { $pull: {'skills': {'techId': techId }}};
    const options = { new: true };

    await Mentor.findOneAndUpdate(filter, update, options)
      .populate('userId')
      .populate('skills.techId')
      .then(mentor => {
        console.log(mentor);
        response.mentor = mentor;
      })
      .catch(err => {
        console.log(err);

        response.status = 400;
        response.error.push(err.message);
      })
      .finally(_ => {
        return res.status(response.status).json(response);
      });
  }
}