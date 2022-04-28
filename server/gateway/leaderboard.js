const express = require('express');
const { getLeaderboard, getUserLeaderboard } = require("../controller/gameController");
const gateway = express.Router();


gateway.route('/getLeaderboard').get(getLeaderboard);
gateway.route('/getUserLeaderboard/:username').get(getUserLeaderboard);


module.exports = gateway;