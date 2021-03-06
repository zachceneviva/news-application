// Dependencies
const mongoose = require('mongoose');

// Variables
const connectionStr = process.env.MONGODB_URI;

// Mongoose Connection Listeners
mongoose.connection.on('connected', () => {
    console.log(`${new Date().toLocaleTimeString()} - MongoDB connected.`);
});

mongoose.connection.on('error', (error) => {
    console.log(`MongoDB encountered a connection error`, error);
});

mongoose.connection.on('disconnected', () => {
    console.log(`MongoDB has been disconnected.`);
});

// Mongoose connection to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zashlios');