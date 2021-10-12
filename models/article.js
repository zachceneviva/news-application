const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  date: {
    type: Date,
    required: [true, "Please add a date"],
  },
  articleImage: {
    type: String,
    required: [true, "image cannot be empty"],
  },
  author: {
      type: String,
      required: [true, "Please add an author"],
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
  },
  views: {
    type: Number,
  },
  comments: [{
    type: mongoose.Types.ObjectId,
    ref: "Comment"
  }],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
}, {timestamps: true});
    

const Article = mongoose.model('Article', articleSchema);
module.exports = Article