// routes/user.js
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: 'Failed to register user', error });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Save user info in session
        req.session.userId = user._id;
        req.session.name = user.name;
        req.session.email = user.email;

        const userObj = user.toObject();
        delete userObj.password;

        res.status(200).json({ message: 'Login successful', user: userObj });
    } catch (error) {
        res.status(400).json({ message: 'Failed to login', error });
    }
});

// Logout Route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(400).json({ message: 'Failed to logout', error: err });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

// Check if user is logged in (for protected routes)
router.get('/isLoggedIn', (req, res) => {
    if (req.session.userId) {
        res.status(200).json({ message: 'User is logged in', user: req.session });
    } else {
        res.status(400).json({ message: 'User is not logged in' });
    }
});

// Get all users (admin purpose)
router.get('/all', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});

router.put('/make-admin/:id', async (req, res) => {
    const { isAdmin } = req.body;

    try {
        const user = await User.findByIdAndUpdate(req.params.id, { isAdmin }, { new: true }).select('-password');
        res.status(200).json({ message: 'User is now admin', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to make user admin', error });
    }
});


module.exports = router;
