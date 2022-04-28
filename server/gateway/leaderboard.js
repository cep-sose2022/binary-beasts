const express = require('express');
const { getLeaderboard, getUserLeaderboard, postLeaderboard } = require("../controller/gameController");
const gateway = express.Router();


gateway.route('/getLeaderboard').get(getLeaderboard);
gateway.route('/getUserLeaderboard/:username').get(getUserLeaderboard);
gateway.route('/postLeaderboard').post(postLeaderboard);


module.exports = gateway;