const { Tech } = require('../models/index');

module.exports = {
  async index(req, res) {
    const { description } = req.params;

    const response = {
      data: [],
      status: 200,
      error: []
    }

    let query;

    if (description) {
      query = Tech.findOne({ description });
    }
    else {
      query = Tech.find();
    }

    await query.exec()
      .then(tech => {
        response.data = tech;
        console.log(tech);
      })
      .catch(err => {
        console.log(err);

        response.status(400);
        response.error.push(err.message);
      })
      .finally(_ => {
        return res.status(response.status).json(response);
      })
  },

  async store(req, res) {
    const { description } = req.body;
    const { filename } = req.file;

    const body = { description, thumbnail: filename };

    const response = {
      data: {},
      status: 201,
      error: []
    }

    await Tech.create(body)
      .then(tech => {
        response.data = tech;
      })
      .catch(err => {
        console.log(err.message);

        response.status = 400;
        response.error.push(err.message);
      })
      .finally(_ => {
        return res.status(response.status).json(response);
      });
  }
};