const express = require('express');
const router = express.Router();
const session = require('express-session')
const {User, Comment, Article} = require("../models");

//home / index
router.get('/home', async function (req, res, next) {
    try {
        const article = await Article.find({}).populate('user');
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

// Search Route
router.get('/search', async (req, res) => {
    const { searchInput } = req.query;
    const article = await Article.find({$text: {$search: searchInput}});
    const context = {
      articles: article,
    }

    res.render("./news/home.ejs", context);
})


// Create new 
router.get('/new', (req, res) => { 
  if (req.session.currentUser.role === 'Writer') {
    res.render('./news/write.ejs');
  }
  else if (req.session.currentUser.role === 'Reader') {
    res.redirect('/home')
  }
  else {
    res.redirect('/login')
  }
});

router.post('/new', async (req, res) => { 
  try {
    const newArticle = {
      ...req.body,
      user: req.session.currentUser.id,
    }
    const article = await Article.create(newArticle);
    const user = await User.findById (req.session.currentUser.id)
    user.writtenArticles.push(article.id);
    user.save()

    return res.redirect('/home');
  } catch (error) {
    return console.log(error);
  }
});

//Show
router.get("/:id", async (req, res, next) => {
  if (req.session.currentUser) {
  try {
    const user = await User.findById(req.session.currentUser.id);
    const article = await Article.findById(req.params.id);
    const comments = await Comment.find({article: req.params.id}).populate("user");

    article.views += 1;
    article.save()
    const context = {
      user,
      article,
      comments,
    }
    return res.render("news/show.ejs", context); 
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
}
  else {
    res.redirect('/login')
  }
});

// Like Route
router.post('/:id', async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    const user = await User.findById (req.session.currentUser.id)
    if (user.likedArticles.includes(article.id)) {
      user.likedArticles.remove(article)
      user.save()
      article.likes -= 1
      article.save()

      return res.send({likes: article.likes})
    }
    user.likedArticles.push(req.params.id);
    user.save()
    article.likes += 1;
    article.save();

    return res.send({likes: article.likes})
  } catch (error) {
    console.log(error);
    req.error = error;
    next();
  }
})

//Edit
router.get('/:articleId/edit', async (req, res) => {
  const article = await Article.findById(req.params.articleId);
  const user = await User.findById (req.session.currentUser.id)
  if (user.writtenArticles.includes(article.id)) {
    try {  
      const article = await Article.findById(req.params.articleId)
      return res.render('news/edit.ejs', { article });
    } catch (error) {
      return console.log(error)
    }
  }
  else if (user.writtenArticles.includes(article.id) === false) {
    return res.redirect('/' + req.params.articleId)
  } 
  else {
    res.redirect('/login')
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

// GET User page
router.get('/:username', async (req, res, next) => {
  try { 
    const user = await User.findOne( {username: req.params.username} ).populate("writtenArticles").populate("likedArticles")
    return res.render('./User-Pages/user.ejs', {user});
  } catch (error) {
    console.log(error);
    req.error = error;
    next();
  }
})

//Delete
router.delete('/:articleId', async (req, res, next) => {
   try {
       await Article.findByIdAndDelete(req.params.articleId);
       await Comment.deleteMany({article: req.params.articleId})
       return res.redirect('/home')
   } catch (error) {
       console.log(error);
       req.error = error;
       return next();
   }
})

module.exports = router