const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const bodyParser = require('body-parser');

// Body-Parser Middleware
const jsonParser = bodyParser.json();

// GET /register
router.get('/', (req, res) => {
    res.send("Register Here");
});

// POST /register
router.post('/', jsonParser, async (req, res) => {
    try {
        // Hash the password
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        // Create new user object
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            mobile: req.body.mobile,
            gender: req.body.gender,
            dob: moment(req.body.dob).format('YYYY-MM-DD')
        });

        // Save user to database
        const savedUser = await user.save();

        // Return result
        res.status(201).json(savedUser);
    } catch (err) {
        console.error("Error saving user:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
