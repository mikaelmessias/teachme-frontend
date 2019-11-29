const express = require('express');
const MentorController = require('./controllers/MentorController');
const TechController = require('./controllers/TechController');
const UserController = require('./controllers/UserController');

// Roteador do Express
const routes = express.Router();

routes.post('/techs', TechController.store);

routes.post('/users', UserController.store);

routes.post('/mentors', MentorController.store);

module.exports = routes;