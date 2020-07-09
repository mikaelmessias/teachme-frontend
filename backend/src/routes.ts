import express from 'express';
import multer from 'multer';
import AvailabilityController from './controllers/AvailabilityController';
import BookingController from './controllers/BookingController';
import MentorController from './controllers/MentorController';
import SkillController from './controllers/SkillController';
import TechController from './controllers/TechController';
import UserController from './controllers/UserController';
import * as uploadConfig from './utils/multer';
// import authMiddleware from './middlewares/auth';

// Roteador do Express
const routes = express.Router();
const techLogoUpload = multer(uploadConfig.techLogo);
const avatarUpload = multer(uploadConfig.avatar);

routes.get('/techs', TechController.index);
routes.post('/techs', techLogoUpload.single('logo'), TechController.store);

routes.post('/users', avatarUpload.single('avatar'), UserController.store);
routes.post('/mentors', avatarUpload.single('avatar'), MentorController.store);

routes.post('/authenticate', UserController.authenticate);

// routes.use(authMiddleware);

routes.get('/users', UserController.show);
routes.get('/search', MentorController.index);

routes.get('/bookings', BookingController.index);
routes.post('/bookings', BookingController.store);
routes.put('/bookings/:booking', BookingController.update);

routes.put('/users', avatarUpload.single('avatar'), UserController.update);

routes.get('/mentors', MentorController.show);

routes.post('/mentors/skills', SkillController.store);
routes.delete('/mentors/skills/:tech_id', SkillController.destroy);

routes.post('/mentors/availability', AvailabilityController.store);

export default routes;
