
var express = require('express');
var router = express.Router();
var controller = require('../controllers/travel');

/* GET travel page */
router.get('/', controller.travel);

/* GET trip data as JSON */
router.get('/json', controller.travelJson);

module.exports = router;
