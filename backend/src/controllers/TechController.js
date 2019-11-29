const Tech = require('../models/Tech');

module.exports = {
  async store(req, res) {
    const { description } = req.body;
    const { thumbnail } = req.body;

    let tech = await Tech.findOne({ description });

    if(!tech) {
      tech = await Tech.create({
        description,
        thumbnail
      });
    }

    return res.json(tech);
  }
};