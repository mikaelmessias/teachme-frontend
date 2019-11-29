const express = require('express');
const MentorController = require('./controllers/MentorController');
const TechController = require('./controllers/TechController');
const UserController = require('./controllers/UserController');

// Roteador do Express
const routes = express.Router();

routes.post('/techs', TechController.store);

module.exports = routes;