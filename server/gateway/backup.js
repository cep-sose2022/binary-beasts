const express = require('express');
const backupController = require("../controller/backupController");
const gateway = express.Router();

gateway.route('/post-card-event-backup').post(backupController.postCardEventBackup);
gateway.route('/get-card-event-backup').get(backupController.getCardEventBackup);
gateway.route('/post-card-backup').post(backupController.postCardBackup);
gateway.route('/get-card-backup').get(backupController.getCardBackup);
gateway.route('/post-event-backup').post(backupController.postEventBackup);
gateway.route('/get-event-backup').get(backupController.getEventBackup);
gateway.route('/post-leaderboard-backup').post(backupController.postLeaderboardBackup);
gateway.route('/get-leaderboard-backup').get(backupController.getLeaderboardBackup);
gateway.route('/post-level-backup').post(backupController.postLevelBackup);
gateway.route('/get-level-backup').get(backupController.getLevelBackup);
gateway.route('/post-user-backup').post(backupController.postUserBackup);
gateway.route('/get-user-backup').get(backupController.getUserBackup);

module.exports = gateway;