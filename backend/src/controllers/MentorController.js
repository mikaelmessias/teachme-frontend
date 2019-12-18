const { Mentor, User, Tech } = require('../models/index');
const mail = require('../config/mail/mail');

module.exports = {
  async index(req, res) {
    const { decoded } = req;
    const { description } = req.query;

    const response = {
      mentors: [],
      status: 200,
      error: []
    };

    if (!(await User.findById(decoded.id))) {
      response.status = 404;
      response.error.push("User not found");
    }
    else if (!description) {
      response.status = 404;
      response.error.push("Tech description expected");
    }
    else {
      let techId = null;

      await Tech.findOne({ description })
        .then(tech => {
          if(!tech) {
            response.status = 404;
            response.error.push("Tech not found");
          }
          else {
            techId = tech._id;
          }
        })
        .catch(err => {
          response.status = 400;
          response.error.push(err.message);
        })
        .finally();

      if(techId) {
        await Mentor.find()
          .where('skills.tech')
          .equals(techId)
          .populate('userId')
          .populate('skills.tech')
          .then(mentors => {
            if (mentors.length === 0) {
              response.status = 404;
              response.error.push("No mentors found for given paramater");
            }
            else {
              response.mentors = mentors;
            }
          })
          .catch(err => {
            console.log(err.message);

            response.status = 400;
            response.error.push(err.message);
          })
          .finally();
      }
    }

    return res.status(response.status).json(response)
  },

  async show(req, res) {
    const { decoded } = req;

    const response = {
      mentor: {},
      status: 200,
      error: []
    };

    await Mentor.findOne({ userId: decoded.id })
      .populate('userId')
      .populate('skills.tech')
      .then(mentor => {
        if (!mentor) {
          response.status = 404;
          response.error.push("User not found");
        }
        else {
          response.mentor = mentor;
        }
      })
      .catch(err => {
        console.log(err);

        response.status = 400;
        response.error.push(err.message);
      })
      .finally(_ => {
        return res.status(response.status).json(response);
      });
  },

  async store(req, res) {
    let { availableOn, skills } = req.body;
    const { filename } = req.file;

    const body = { ...req.body, access: "JEDI", avatar: filename };

    const response = {
      mentor: {},
      status: 201,
      error: []
    };

    let userMentor = null;

    await User.create(body)
      .then(user => {
        userMentor = user;
      })
      .catch(err => {
        console.log(err);

        response.status = 400;
        response.error.push(err.message);
      })
      .finally();

    if(userMentor) {
      availableOn = availableOn.split(',');
      skills = skills.split(';').map(
        info => ({
          tech: info.split(',')[0],
          price: info.split(',')[1]
        })
      );

      await Mentor.create({
        userId: userMentor._id,
        skills,
        availableOn
      })
        .then(async mentor => {
          mail.send("welcome", userMentor);

          response.mentor = await mentor.populate('userId').populate('skills.tech').execPopulate();
        })
        .catch(err => {
          console.log(err);

          response.status = 400;
          response.error.push(err.message);
        })
        .finally();
    }

    return res.status(response.status).json(response);
  }
};