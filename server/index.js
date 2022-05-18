const http = require('http');
const express = require('express');
const PORT = process.env.PORT || 5000;
const path = require("path");
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const gameRoute = require('./gateway/game');
const leaderboardRoute = require('./gateway/leaderboard');
const userRoute = require('./gateway/user');
const backupRoute = require('./gateway/backup');
const addDataRoute = require('./gateway/addData');

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./../swagger.json');

const frontend = 'http://localhost:3000';

connectDB();

const app = express();
app.use(express.json())

/**
 * can be use when getting cors-problems
 */
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', frontend);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/game', gameRoute);

app.use('/leaderboard', leaderboardRoute);

app.use('/user', userRoute);

app.use('/backup', backupRoute);

app.use('/add-data', addDataRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 