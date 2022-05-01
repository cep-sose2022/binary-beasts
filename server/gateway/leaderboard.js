const express = require('express');
const leaderBoardController = require("../controller/leaderboardController");
const gateway = express.Router();

gateway.route('/getLeaderboard').get(leaderBoardController.getLeaderboard);
gateway.route('/getUserLeaderboard/:username').get(leaderBoardController.getUserLeaderboard);
gateway.route('/postLeaderboard').post(leaderBoardController.postLeaderboard);
gateway.route('/deleteLeaderboard').delete(leaderBoardController.deleteLeaderboard); // internal
gateway.route('/getSocres').get(leaderBoardController.getSocres);

module.exports = gateway;