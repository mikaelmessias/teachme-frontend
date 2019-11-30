const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { email } = req.body;
    const { filename } = req.file;

    let user = await User.findOne({ email });

    if(!user) {
      user = await User.create({
        ...req.body,
        avatar: filename
      }
      );
    }

    return res.json(user);
  }
};