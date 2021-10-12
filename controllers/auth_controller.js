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

// POST Route for registering a new User
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

// POST route for logging a user in via authentication
router.post('/login', async function (req,res) {
    try {
        const foundUser = await User.findOne({username: req.body.username});
        console.log(foundUser);

        if (!foundUser) return res.redirect('/register');

        const match = await bcrypt.compare(req.body.password, foundUser.password);

        if(!match) return res.send("Password invalid");

        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username,
            fname: foundUser.fname,
            comments: foundUser.comments,
            articles: foundUser.articles,
            role: foundUser.role,
        };

        return res.redirect('/home')
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

// Logout route
router.get('/logout', async function (req,res) {
    try {
        await req.session.destroy();
        return res.redirect('/login')
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
});

module.exports = router