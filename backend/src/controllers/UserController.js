const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { email } = req.body;
    const { filename } = req.file;

    try {
      if(await User.findOne({ email })) {
        return res.status(400).json({
          error: "User already exists"
        });
      }

      const user = await User.create({
        ...req.body,
        avatar: filename
      });

      return res.status(201).json(user);
    }
    catch (err) {
      return res.status(400).json({
        error: "User registration failed"
      })
    }
  },

  async update(req, res) {
    const { decoded } = req;
    const filename = req.file ? req.file.filename : null;

    if(!await User.findOne({ _id: decoded.id })) {
      return res.status(404).json({
        error: "User not found"
      })
    }
    
    if(filename) {
      await User.updateOne({ _id: decoded.id }, {
        ...req.body,
        avatar: filename
      });  
    }
    else {
      await User.updateOne({ _id: decoded.id }, req.body);
    }

    const user = await User.findOne({ _id: decoded.id });

    return res.status(201).json(user);
  },

  async authenticate(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if(!user) {
        return res.status(400).json({
          error: "User not found"
        });
      }

      if(!(await user.compareHash(password))) {
        return res.status(400).json({
          error: "Invalid password"
        });
      }

      return res.json({
        user,
        token: user.generateToken()
      });
    }
    catch (err) {
      return res.status(400).json({
        error: "User authentication failed"
      })
    }
  },

  async dashboard(req, res) {
    try {
      const { decoded } = req;
      
      const user = await User.findById(decoded.id);

      if(!user) {
        return res.status(404).json({
          error: "User not found"
        });
      }

      return res.json({ user });
    }
    catch (err) {
      return res.status(400).json({
        error: "Cant get user information"
      });
    }
  }
};