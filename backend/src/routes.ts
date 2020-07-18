import express from 'express';
import multer from 'multer';
import AvailabilityController from './controllers/AvailabilityController';
import BookingController from './controllers/BookingController';
import MentorController from './controllers/MentorController';
import SkillController from './controllers/SkillController';
import TechController from './controllers/TechController';
import UserController from './controllers/UserController';
import authMiddleware from './middlewares/auth';
import * as uploadConfig from './utils/multer';

const userController = new UserController();
const techController = new TechController();
const mentorController = new MentorController();

// Roteador do Express
const routes = express.Router();
// const techLogoUpload = multer(uploadConfig.techLogo);
const avatarUpload = multer(uploadConfig.avatar);

routes.get('/techs', techController.index);
routes.post('/techs', techController.seed);
routes.delete('/techs', techController.destroy);

routes.post('/user', avatarUpload.single('avatar'), userController.store);
routes.post('/mentor', avatarUpload.single('avatar'), mentorController.store);

routes.post('/authenticate', userController.authenticate);

routes.use(authMiddleware);

routes.get('/users', userController.index);
routes.get('/user', userController.show);
// routes.get('/search', mentorController.index);

routes.get('/bookings', BookingController.index);
routes.post('/booking', BookingController.store);
routes.put('/booking/:bookingId', BookingController.update);

routes.put('/user', avatarUpload.single('avatar'), userController.update);

// routes.get('/mentor', mentorController.show);

routes.post('/mentor/skills', SkillController.store);
routes.delete('/mentor/skills/:tech_id', SkillController.destroy);

routes.post('/mentor/availability', AvailabilityController.store);

export default routes;
