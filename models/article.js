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
  // comments: {
  //     commentSchema: ({
  //       id: {
  //             type: String,
  //             required: [true, "cannot be empty"],
  //             unique: true,
  //       },
  //       text: {
  //         type: String,
  //         required: [true, "cannot be empty"],
  //       },
        // timestamp: {
        //   type: Date,
        //   required: true,
        // },
        // username: {
        //   type: String,
        //   required: true,
        // },
      // )
});
    

const Article = mongoose.model('Article', articleSchema);
module.exports = Article