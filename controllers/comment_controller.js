const express = require('express');
const router = express.Router();
const session = require('express-session')
const { Article, User, Comment } = require("../models");


// Create Route
router.post('/:articleId/comment', async (req,res, next) => {
    try {
        const article = await Article.findById(req.params.articleId)
        const comments = await Comment.create({
            ...req.body,
            user: req.session.currentUser.id,
            article: req.params.articleId,
        })
        article.comments.push(comments);
        await article.save();

        return res.redirect('/' + req.params.articleId)
    } catch (error) {
        console.log(error);
        req.error = error;
        next();
    }
});

// Delete Route
router.delete('/:articleId/:id', async (req, res) => {
    try {
        const deletedComment = Comment.findByIdAndDelete(req.params.id);
        res.redirect('/' + req.params.articleId);
    } catch (error) {
        console.log(error);
        req.error=error
    }
})




module.exports = router;