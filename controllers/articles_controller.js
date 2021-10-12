const express = require('express');
const router = express.Router();
const { Article, User } = require("../models");

Article.insertMany( {
    title: "Giraffe Goes to Moon",
    date: new Date().toLocaleString(),
    articleImage: "https://images.ctfassets.net/81iqaqpfd8fy/3r4flvP8Z26WmkMwAEWEco/870554ed7577541c5f3bc04942a47b95/78745131.jpg?w=1200&h=1200&fm=jpg&fit=fill",
    author: "Zach Buenaventura",
    quickLook: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    fullText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
});

//home / index
router.get('/home', async function (req, res, next) {
    try {
        const article = Article.find({});
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
       $set: {...req.body}
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
router.delete('/:articleId', async (req, res, next) => {
   try {
       await Article.findByIdAndDelete(req.params.id);
       return res.redirect('/home')
   } catch (error) {
       console.log(error);
       req.error = error;
       return next();
   }
})

module.exports = router