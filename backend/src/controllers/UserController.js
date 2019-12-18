const { User } = require('../models/index');
const mail = require('../config/mail/mail');

module.exports = {
  async show(req, res) {
    const { decoded } = req;

    const response = {
      user: {},
      status: 200,
      error: []
    }

    await User.findById(decoded.id)
      .then(user => {
        if (!user) {
          response.status = 404;
          response.error.push("User not found");
        }
        else {
          response.user = user;
        }
      })
      .catch(err => {
        console.log(err.message);

        response.status = 400;
        response.error.push(err.message);
      })
      .finally(_ => {
        return res.status(response.status).json(response);
      });
  },

  async store(req, res) {
    const { filename } = req.file;
    const body = { ...req.body, avatar: filename };

    const response = {
      user: {},
      status: 201,
      error: []
    }

    await User.create(body)
      .then(user => {
        mail.send("welcome", user);

        response.user = user;
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

  async update(req, res) {
    const { decoded } = req;
    const avatar = req.file ? req.file.filename : null;
    const body = { ...req.body, avatar };

    const response = {
      user: {},
      status: 201,
      error: []
    }

    let query;

    if (avatar) {
      query = User.findByIdAndUpdate(decoded.id, body, { new: true })
    }
    else {
      query = User.findByIdAndUpdate(decoded.id, req.body, { new: true })
    }

    await query.exec()
      .then(user => {
        if (!user) {
          response.status = 404;
          response.error.push("User not found");
        }
        else {
          response.user = user;
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

  async authenticate(req, res) {
    const { email, password } = req.body;

    const response = {
      user: {},
      status: 200,
      error: []
    }

    await User.findOne({ email })
      .then(async user => {
        if (!user) {
          response.status = 404;
          response.error.push("User not found");
        }
        else if (!(await user.compareHash(password))) {
          response.status = 400;
          response.error.push("Invalid password");
        }
        else {
          response.user = user;
          response.token = user.generateToken();
        }
      })
      .catch(err => {
        response.status = 400;
        response.error.push(err.message);
      })
      .finally(_ => {
        return res.status(response.status).json(response);
      });
  }
};