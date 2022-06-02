const express = require('express');
const gameController = require("../controller/gameController");
const gateway = express.Router();

gateway.route('/get-level/:token').get(gameController.getLevel);
gateway.route('/post-level-data/:token').post(gameController.postLevelData);
gateway.route('/get-all-levels').get(gameController.getAllLevels);
gateway.route('/get-level-name/:levelId').get(gameController.getLevelName);
gateway.route('/get-events/:levelId').get(gameController.getEvents);

module.exports = gateway;