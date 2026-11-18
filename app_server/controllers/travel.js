
const Trip = require('../models/travlr');

// Retrieve trips from MongoDB and display the travel page
const travel = async (req, res) => {
    try {
        const trips = await Trip.find({}).lean();

        res.render('travel', {
            title: 'Travlr Getaways',
            trips
        });
    } catch (err) {
        console.error('Error retrieving trips:', err);
        res.status(500).send('Error retrieving trip data');
    }
};

// Retrieve trips from MongoDB as JSON
const travelJson = async (req, res) => {
    try {
        const trips = await Trip.find({}).lean();
        res.json(trips);
    } catch (err) {
        console.error('Error retrieving trips:', err);
        res.status(500).json({ error: 'Error retrieving trip data' });
    }
};

module.exports = {
    travel,
    travelJson
};
