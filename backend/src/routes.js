const express = require('express');
const multer = require('multer');
const thumbUploadConfig = require('./config/thumbUploadConfig');

const MentorController = require('./controllers/MentorController');
const TechController = require('./controllers/TechController');
const UserController = require('./controllers/UserController');
const BookingController = require('./controllers/BookingController');

// Roteador do Express
const routes = express.Router();
const upload = multer(thumbUploadConfig);

routes.get('/techs', TechController.index);
routes.post('/techs', upload.single('thumbnail'), TechController.store);

routes.post('/users', UserController.store);

routes.post('/mentors', MentorController.store);

routes.post('/mentors/:mentor_id/bookings', BookingController.store);

module.exports = routes;