const http = require('http');
const express = require('express');
const PORT = process.env.PORT || 5000;
const path = require("path");
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const gameRoute = require('./gateway/game');

connectDB();


const app = express();

/**
 * can be use when getting cors-problems
 */
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/game', gameRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 