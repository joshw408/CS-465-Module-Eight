
const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET: /api/trips - lists all trips
const tripsList = async (req, res) => {
    Trip
        .find({})
        .exec()
        .then((trips) => {
            if (!trips) {
                return res.status(404).json({
                    message: 'No trips found'
                });
            } else {
                return res.status(200).json(trips);
            }
        })
        .catch((err) => {
            return res.status(400).json(err);
        });
};

// GET: /api/trips/:tripCode - returns one trip
const tripsFindByCode = async (req, res) => {
    Trip
        .findOne({ 'code': req.params.tripCode })
        .exec()
        .then((trip) => {
            if (!trip) {
                return res.status(404).json({
                    message: 'Trip not found'
                });
            } else {
                return res.status(200).json(trip);
            }
        })
        .catch((err) => {
            return res.status(400).json(err);
        });
};

module.exports = {
    tripsList,
    tripsFindByCode
};
