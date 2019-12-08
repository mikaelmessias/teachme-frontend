const multer = require('multer');
const path = require('path');

const User = require('../../models/User');

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', '..', 'uploads', 'avatar'),
    onFileUploadStart: () => {
      return false;
    },

    filename: async (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);

      let user = await User.findOne({ email: req.body.email });

      if(user) {
        cb(null, user.avatar);
        return;
      }

      cb(null, `${name}-${Date.now()}${ext}`);
    }
  })
};