const express = require('express');
const { getLeaderboard } = require("../controller/gameController");
const gateway = express.Router();


gateway.route('/getLeaderboard').get(getLeaderboard);


module.exports = gateway;