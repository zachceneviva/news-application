// Dependencies
require('dotenv').config();
require('./config/db.connection');
const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const controllers = require('./controllers')

//Global Variables
const PORT = process.env.PORT;
const app = express();

// App Configurations
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(session({
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URI || "mongodb://localhost:27017/zashlios"}),
    secret: "super secret",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7 * 2,},
}));

app.use(function (req, res, next) {
    res.locals.user = req.session.currentUser;
    next();
});

app.use('/', controllers.auth)
app.use('/', controllers.articles)
app.use('/', controllers.comment)

// Logger
app.use((req, res, next) => {    
    console.log(`[${req.url}] ${req.method} - ${new Date().toLocaleTimeString()}`);
	next();
});

// 404 Route
app.get('/*', (req, res) => {
    return res.redirect('/home')
})

// Server Listening Port
app.listen(process.env.PORT || 4321, () => {
    console.log(`Listening for client requests on port ${process.env.PORT}`)
});