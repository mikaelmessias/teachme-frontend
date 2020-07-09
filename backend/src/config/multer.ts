import multer from 'multer';
import path from 'path';
import Tech from '../models/Tech';
import User from '../models/User';

export const avatar: multer.Options = ({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', '..', 'uploads', 'avatar'),

    filename: async (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);

      const user = await User.findOne({ email: req.body.email });

      if (user) {
        cb(null, user.avatar);
        return;
      }

      cb(null, `${name}-${Date.now()}${ext}`);
    },
  }),
});

export const thumbnail: multer.Options = ({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', '..', 'uploads', 'thumbnail'),

    filename: async (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);

      const tech = await Tech.findOne({ description: req.body.description });

      if (tech) {
        cb(null, tech.thumbnail);
        return;
      }

      cb(null, `${name}-${Date.now()}${ext}`);
    },
  }),
});
