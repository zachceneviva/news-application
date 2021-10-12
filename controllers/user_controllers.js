const express = require('express');
const router = express.Router();

require('../config/db.connection');
// not this one, right?     const db = require('../models');

module.exports = {
    articles: require("./articles_controllers"),
    user: require("./user_controllers"),
};

//user index
router.get("/", function (req, res) {
    db.User.find({}, function (error, allUsers) {
      if (error) {
        console.log(error);
        req.error = error;
        return next();
      }
          // Here is our adjustment 
      const context = { users: allUsers };
      return res.render("user/index", context);
    });
  });

module.exports = router