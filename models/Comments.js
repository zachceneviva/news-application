const mongoose = require('mongoose');

let dt = new Date();

const commentSchema = new mongoose.Schema ({
    comment: {
        type: String,
        required:[true, 'This field is required']
    },
    date: {
        type: String,
        default: (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear(),
    },
    article: {
        type: mongoose.Types.ObjectId,
        ref: "Articles"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
}, {timestamps: true});

const Comment =  mongoose.model('Comment', commentSchema);
module.exports = Comment