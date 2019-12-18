const express = require('express');
const multer = require('multer');

const authMiddleware = require('./middlewares/auth');

const thumbUploadConfig = require('./config/upload/thumb');
const avatarUploadConfig = require('./config/upload/avatar');

const MentorController = require('./controllers/MentorController');
const SkillController = require('./controllers/SkillController');
const AvailabilityController = require('./controllers/AvailabilityController');
const TechController = require('./controllers/TechController');
const UserController = require('./controllers/UserController');
const BookingController = require('./controllers/BookingController');

const routes = express.Router();
const thumbUpload = multer(thumbUploadConfig);
const avatarUpload = multer(avatarUploadConfig);

routes.get('/techs', TechController.index);
routes.get('/techs/:description', TechController.index);
routes.post('/techs', thumbUpload.single('thumbnail'), TechController.store);

routes.post('/users', avatarUpload.single('avatar'), UserController.store);
routes.post('/mentors', avatarUpload.single('avatar'), MentorController.store);

routes.post('/authenticate', UserController.authenticate);

routes.use(authMiddleware);

routes.get('/users', UserController.show);
routes.get('/search', MentorController.index);

routes.get('/bookings', BookingController.index);
routes.post('/bookings', BookingController.store);
routes.put('/bookings/:bookingId', BookingController.update);

routes.put('/users', avatarUpload.single('avatar'), UserController.update);

routes.get('/mentors', MentorController.show);

routes.post('/mentors/skills', SkillController.store);
routes.delete('/mentors/skills/:techId', SkillController.destroy);

routes.post('/mentors/availability', AvailabilityController.store);

module.exports = routes;