const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema ({
    comment: {
        type: String,
        required:[true, 'This field is required']
    },
    article: {
        type: mongoose.Types.ObjectId,
        ref: "Article"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
}, {timestamps: true});

const Comment =  mongoose.model('Comment', commentSchema);
module.exports = Comment