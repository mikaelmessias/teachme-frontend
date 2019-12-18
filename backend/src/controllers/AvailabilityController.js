const { Mentor, User } = require('../models/index');

module.exports = {
  async store(req, res) {
    const { decoded } = req;
    const { availableOn } = req.body;

    const response = {
      mentor: {},
      status: 201,
      error: []
    }

    let mentor = null;

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

    if(mentor) {
      if(availableOn) {
        if(availableOn.length)  {
          mentor.availableOn = availableOn;
          mentor.save();

          response.mentor = mentor;
        }
        else {
          response.status = 400;
          response.error.push("Argument array is empty");
        }
      }
      else {
        response.status = 400;
        response.error.push("Argument expected");
      }
    }

    return res.status(response.status).json(response);
  }
}