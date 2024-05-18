const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Ensure the correct model is imported
const router = express.Router();

// Handle user registration
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 10) // Hash password before saving
        });
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
        res.redirect('/search');
    } catch (error) {
        res.render('signup', { error: 'Error creating user', layout: 'main' });
    }
});

// Handle user login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            res.redirect('/search');
        } else {
            res.render('login', { error: 'Invalid username or password', layout: 'main' });
        }
    } catch (error) {
        res.status(500).render('login', { error: 'Server error during authentication', layout: 'main' });
    }
});

// Handle user logout
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Example route
router.get('/example', (req, res) => {
    res.send('This is an example route');
});

module.exports = router;
