const express = require('express');
const router = express.Router();
const { Article, User } = require("../models");


//home / index
router.get('/home', async function (req, res) {
  try {
    const articles = await Article.find({});
  
    const context = {
      articles,
    }
    
    res.render("./news/home.ejs", context);

  } catch (error) {
    return console.log(error);
  }
});

// Create new 
router.get('/new', (req, res) => { 
  res.render('new.ejs');
});
router.post('/', async (req, res) => {   //'/' maybe = '/home'?
  try {
    await Article.create( req.body )

    return res.redirect('/articles');
  } catch (error) {
    return console.log(error);
  }
});

//Show
router.get("/:id", async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    const user = await User.find({ article: req.params.id }).populate('article'); 
    const context = {
      article,
      review,
    }
    return res.render("news/show.ejs", context);   //can we change news to articles?
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

//Edit
router.get('/:articleId/edit', async (req, res) => {
  try {  
    const article = await Article.findById(req.params.articleId)
    return res.render('edit.ejs', { article });
  } catch (error) {
    return console.log(error)
  }
});

//Update
router.put('/:articleId', (req, res) => {

  Article.findByIdAndUpdate(
      req.params.articleId,
     {
       $set: req.body
     },
      {
        new: true
      },
      (error, updatedArticle) => {
          if (error) return console.log(error);
          
          return res.redirect(`/news/${updatedArticle.id}`);
      },
  );
});

//Delete
router.delete('/:articleId', (req, res) => {
   Article.findByIdAndDelete( req.params.articleId, (error, deletedArticle) => {
        if (error) return console.log(error);
    
        console.log(deletedArticle);
        return res.redirect('/article');
    });
})

module.exports = router