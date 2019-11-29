const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { name } = req.body;
    const { birthdate } = req.body;
    const { address } = req.body;
    const { cpf } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const { description } = req.body;
    const { avatar } = req.body;

    let user = await User.findOne({ email });

    if(!user) {
      user = await User.create({
        name,
        birthdate,
        address,
        cpf,
        email,
        password,
        description,
        avatar
      })
    }

    return res.json(user);
  }
};