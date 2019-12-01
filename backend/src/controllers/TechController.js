const Tech = require('../models/Tech');

module.exports = {
  async index(req, res) {
    const { tech } = req.query; 

    const techs = await Tech.find({ description: tech });

    if(techs.length == 0) {
      return res.status(404).json({
        error: "No tech found with given keyword"
      })
    }

    return res.json(techs);
  },

  async store(req, res) {
    const { description } = req.body;
    const { filename } = req.file;

    let tech = await Tech.findOne({ description });

    if(tech) {
      return res.status(400).json({
        error: "Tech already registered"
      })
    }

    tech = await Tech.create({
      description,
      thumbnail: filename
    });

    return res.json(tech);
  }
};