const express = require('express');
const leaderBoardController = require("../controller/leaderboardController");
const gateway = express.Router();

gateway.route('/get-leaderboard').get(leaderBoardController.getLeaderboard);
gateway.route('/get-user-leaderboard/:username').get(leaderBoardController.getUserLeaderboard);
gateway.route('/post-leaderboard').post(leaderBoardController.postLeaderboard);
gateway.route('/delete-leaderboard').delete(leaderBoardController.deleteLeaderboard); // internal
gateway.route('/get-scores').get(leaderBoardController.getScores);

module.exports = gateway;