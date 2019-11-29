const Mentor = require('../models/Mentor');

module.exports = {
  async store(req, res) {
    const { name } = req.body;
    const { birthdate } = req.body;
    const { address } = req.body;
    const { cpf } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const { description } = req.body;
    const { skills } = req.body;
    const { availableOn } = req.body;
    const { avatar } = req.body;

    let mentor = await Mentor.findOne({ email });

    if(!mentor) {
      mentor = await Mentor.create({
        name,
        birthdate,
        address,
        cpf,
        email,
        password,
        description,
        skills,
        availableOn,
        avatar
      }); 
    }

    return res.json(mentor);
  } 
};