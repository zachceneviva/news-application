
//i think this deals with the 'comments' made by user
const express = require('express');
const router = express.Router();
const { Article, User} = require("../models");

User.deleteMany({}, function (error, deletedUser) {
  if (error) {
    return console.log(error);
  }
  User.insertMany(
    [
      {
        articleId: 0,
        text: "Learned a lot!!",
      },
      {
        articleId: 1,
        text: "Hated it.",
      },
      {
        articleId: 2,
        text: "How can I learn more?",
      },
    ],
    function (error, createdUsers) {
      if (error) {
        return console.log(error);
      }
      console.log("=== Seed Complete ===");
      console.log(createdUsers);
    }
  );
});

module.exports = User;