const express = require('express');
const { Trip } = require('../../models'); // Make sure the Trip model is correctly defined
const router = express.Router();

// Example route
router.get('/example', (req, res) => {
    res.send('This is an example route');
});

// Route to get all trips
router.get('/', async (req, res) => {
    if (!req.session.user_id) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const trips = await Trip.findAll({ where: { userId: req.session.user_id } });
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve trips' });
    }
});

// Route to create a new trip
router.post('/', async (req, res) => {
    if (!req.session.user_id) return res.status(401).json({ message: 'Unauthorized' });
    const { destination, date } = req.body;
    try {
        const trip = await Trip.create({ destination, date, userId: req.session.user_id });
        res.status(201).json(trip);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create trip' });
    }
});

// Route to delete a trip
router.delete('/:id', async (req, res) => {
    if (!req.session.user_id) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const result = await Trip.destroy({ where: { id: req.params.id, userId: req.session.user_id } });
        if (result) {
            res.status(200).json({ message: 'Trip deleted' });
        } else {
            res.status(404).json({ message: 'Trip not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete trip' });
    }
});

module.exports = router;
