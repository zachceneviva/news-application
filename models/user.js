const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'please enter email'],
        unique: true,
      },
  username: {
    type: String,
    required: [true, 'please enter username'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please enter password'],
    unique: true,
  },
  // firstname: {
  //     type: String,
  //     required: [true, "please enter your firstname"],
  // },
  location: {
    type: String,
    required: [false, 'please enter your location'],
  },
  about: {
    type: String,
    required: [false, 'please say a bit about you and your interests'],
  },
  comments: {
    commentSchema: ({
      id: {
        type: String,
            required: [true, "cannot be empty"],
            unique: true,
      },
      text: {
        type: String,
        required: [true, "cannot be empty"],
      },
      // timestamp: {
      //   type: Date,
      //   required: true,
      // },
      username//self: {
        type: String,
        required: true,
      },
    }),
  },
  // timestamps: true,
});

const User = mongoose.model('User', userSchema)
module.exports = User