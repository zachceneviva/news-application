const express = require('express');

const router = express.Router();

// Home/Index Route
router.get('/home', (req, res) => {
    res.render("./news/home.ejs")
})

module.exports = router