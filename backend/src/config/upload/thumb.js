const multer = require('multer');
const path = require('path');

const { Tech } = require('../../models/index');

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', '..', 'uploads', 'thumbnail'),

    filename: async (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);

      let tech = await Tech.findOne({ description: req.body.description });

      if(tech) {
        cb(null, tech.thumbnail);
        return;
      }

      cb(null, `${name}-${Date.now()}${ext}`);
    }
  })
};