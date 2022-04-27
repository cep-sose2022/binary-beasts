const http = require('http');
const express = require('express');
const PORT = process.env.PORT || 5000;
const path = require("path");
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const gameRoute = require('./gateway/game');

connectDB();


const app = express();

app.use('/game', gameRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 