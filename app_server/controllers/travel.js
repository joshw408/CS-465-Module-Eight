
const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

// GET travel page using REST API
const travel = async (req, res) => {
    await fetch(tripsEndpoint, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('API returned status ' + response.status);
            }
            return response.json();
        })
        .then(json => {
            // Check if API response is a valid array
            if (!Array.isArray(json)) {
                return res.status(500).send(
                    'API response is not a valid array'
                );
            }

            // Check if the database returned no trips
            if (json.length === 0) {
                return res.status(404).send(
                    'No trips found'
                );
            }

            // Render travel page with API data
            res.render('travel', {
                title: 'Travlr Getaways',
                trips: json
            });
        })
        .catch(err => res.status(500).send(err.message));
};

// GET trip data as JSON using REST API
const travelJson = async (req, res) => {
    await fetch(tripsEndpoint, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('API returned status ' + response.status);
            }
            return response.json();
        })
        .then(json => {
            if (!Array.isArray(json)) {
                return res.status(500).json({
                    message: 'API response is not a valid array'
                });
            }

            if (json.length === 0) {
                return res.status(404).json({
                    message: 'No trips found'
                });
            }

            return res.status(200).json(json);
        })
        .catch(err => res.status(500).json({
            error: err.message
        }));
};

module.exports = {
    travel,
    travelJson
};
