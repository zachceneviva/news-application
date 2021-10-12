const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
      },
    username: {
      type: String,
      required: [true, 'Please enter an username'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please enter password'],
    },
    fname: {
        type: String,
        required: [true, "Please enter your first name"],
    },
    location: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: [true, 'please select an account type'],
      enum: ['Writer', 'Reader']
    },
    comments: [{
      type: mongoose.Types.ObjectId,
      ref: "Comment"
    }],
    articles: [{
      type: mongoose.Types.ObjectId,
      ref: "User"
    }]
}, {timestamps: true});

const User = mongoose.model('User', userSchema)
module.exports = User