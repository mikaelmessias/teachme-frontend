const Tech = require('../models/Tech');

module.exports = {
  async store(req, res) {
    const { description } = req.body;

    let tech = await Tech.findOne({ description });

    if(!tech) {
      tech = await Tech.create({
        description
      });
    }

    return res.json(tech);
  }
};