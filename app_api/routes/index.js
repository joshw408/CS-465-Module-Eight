const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// GET all trips and POST a new trip
router.route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);

// GET one trip by code and PUT an updated trip
router.route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;