const express = require('express');
const multer = require('multer');
const thumbUploadConfig = require('./config/thumbUploadConfig');
const avatarUploadConfig = require('./config/avatarUploadConfig');

const MentorController = require('./controllers/MentorController');
const TechController = require('./controllers/TechController');
const UserController = require('./controllers/UserController');
const BookingController = require('./controllers/BookingController');

// Roteador do Express
const routes = express.Router();
const thumbUpload = multer(thumbUploadConfig);
const avatarUpload = multer(avatarUploadConfig);

routes.get('/techs', TechController.index);
routes.post('/techs', thumbUpload.single('thumbnail'), TechController.store);

routes.post('/users', avatarUpload.single('avatar'), UserController.store);

routes.post('/mentors', avatarUpload.single('avatar'), MentorController.store);

routes.post('/mentors/:mentor_id/bookings', BookingController.store);

module.exports = routes;