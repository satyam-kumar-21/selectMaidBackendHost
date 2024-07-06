const express = require('express');
const contactRoute = express.Router();
const contactController = require('../controllers/contactController');

contactRoute.post('/submit', contactController.submitMessage);

module.exports = contactRoute;
