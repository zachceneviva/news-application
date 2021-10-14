const mongoose = require('mongoose');

let dt = new Date();

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  date: {
    type: String,
    required: [true, "Please add a date"],
    default: (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear(),
  },
  articleImage: {
    type: String,
    required: [true, "image cannot be empty"],
  },
  author: {
      type: String,
      required: [true, "Please add an author"],
  },
  topic: {
    type: String,
    required: [true, "Please add a topic"]
  },
  quickLook: {
      type: String,
      required: [true, "Please add a summary"],
  },
  fullText: {
      type: String,
      required: [true, "Please add the full text"],
  },
  likes: {
      type: Number,
      default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  comments: [{
    type: mongoose.Types.ObjectId,
    ref: "Comments"
  }],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users"
  }
}, {timestamps: true});
    

const Article = mongoose.model('Article', articleSchema);
module.exports = Article