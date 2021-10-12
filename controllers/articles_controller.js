const express = require('express');
const { Article } = require('../models');
const router = express.Router();

//test data


// Home/Index Route
router.get('/home', (req, res) => {
    Article.find({}, (error, article) => {
        res.render("./news/home.ejs", {article})
    })
});



module.exports = router