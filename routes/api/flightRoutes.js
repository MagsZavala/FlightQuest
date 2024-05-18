const router = require('express').Router();
const { Flight } = require('../../models');
const FlightAPI = require('../../models/flightapi');

router.post('/', async (req, res) => {
    if (!req.session.user_id) return res.status(401).json({ message: 'Unauthorized' });
    const { flightNumber, destination } = req.body;
    try {
        const flight = await Flight.create({ flightNumber, destination, userId: req.session.user_id });
        res.status(201).json(flight);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/', async (req, res) => {
    if (!req.session.user_id) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const flights = await Flight.findAll({ where: { userId: req.session.user_id } });
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/search', async (req, res) => {
    const { fromId, toId, departDate } = req.query;
    try {
        const flights = await FlightAPI.searchFlights(fromId, toId, departDate);
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching flight data' });
    }
});

module.exports = router;
