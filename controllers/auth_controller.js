// Dependencies
const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const router = express.Router();

const {User} = require('../models');

router.get('/register', (req, res) => {
    return res.render('./auth/register.ejs')
});

router.get('/login', (req, res) => {
    return res.render('./auth/login.ejs')
});

