const express = require('express');
const router = express.Router();
const { Article, User } = require("../models");

//home / index
router.get('/home', async function (req, res, next) {
    try {
        const article = await Article.find({});
        const context = {
            articles: article
        }

        res.render("./news/home.ejs", context);
    } catch (error) {
        console.log(error);
        res.error = error;
        return next ();
    }
});

// Create new 
router.get('/new', (req, res) => { 
  res.render('./news/write.ejs');
});

router.post('/new', async (req, res) => { 
  try {
    await Article.create( req.body )

    return res.redirect('/home');
  } catch (error) {
    return console.log(error);
  }
});

//Show
router.get("/:id", async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    const context = {
      article,
    }
    return res.render("news/show.ejs", context); 
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
    return res.render('news/edit.ejs', { article });
  } catch (error) {
    return console.log(error)
  }
});

//Update
router.put('/:articleId', (req, res) => {

  Article.findByIdAndUpdate(
      req.params.articleId,
     {
       $set: {...req.body}
     },
      {
        new: true
      },
      (error, updatedArticle) => {
          if (error) return console.log(error);
          
          return res.redirect(`/${updatedArticle.id}`);
      },
  );
});

//Delete
router.delete('/:articleId', async (req, res, next) => {
   try {
       await Article.findByIdAndDelete(req.params.articleId);
       return res.redirect('/home')
   } catch (error) {
       console.log(error);
       req.error = error;
       return next();
   }
})

module.exports = router