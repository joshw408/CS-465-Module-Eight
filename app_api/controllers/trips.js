
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

// POST: /trips - Adds a new trip
const tripsAddTrip = async (req, res) => {

    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    try {
        const q = await newTrip.save();

        return res.status(201).json(q);
    } catch (error) {
        return res.status(400).json(error);
    }
};


// PUT: /trips/:tripCode - Updates an existing trip
const tripsUpdateTrip = async (req, res) => {

    console.log(req.params);
    console.log(req.body);

    try {
        const q = await Trip
            .findOneAndUpdate(
                { code: req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                { new: true, runValidators: true }
            )
            .exec();

        if (!q) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        return res.status(200).json(q);

    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};