// Dependencies
const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const router = express.Router();

const {User} = require('../models');

// GET route for Register page
router.get('/register', (req, res) => {
    return res.render('./auth/register.ejs')
});

// GET route for Login page
router.get('/login', (req, res) => {
    return res.render('./auth/login.ejs')
});

router.post('/register', async function (req, res) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        const newUser = await User.create(req.body);

        return res.redirect('/login');
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
});

