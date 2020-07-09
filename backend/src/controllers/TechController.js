const Tech = require('../models/Tech');

module.exports = {
  async index(req, res) {
    const { tech } = req.query;

    if (tech) {
      return res.json(await Tech.find({ description: tech }));
    }

    return res.json(await Tech.find());
  },

  async store(req, res) {
    const { description } = req.body;
    const { filename } = req.file;

    let tech = await Tech.findOne({ description });

    if (tech) {
      return res.status(400).json({
        error: 'Tech already registered',
      });
    }

    tech = await Tech.create({
      description,
      logo: filename,
    });

    return res.json(tech);
  },
};
