const Tech = require('../models/Tech');

module.exports = {
  async store(req, res) {
    const { description } = req.body;
    const { filename } = req.file;

    let tech = await Tech.findOne({ description });

    if(!tech) {
      tech = await Tech.create({
        description,
        thumbnail: filename
      });
    }

    return res.json(tech);
  }
};