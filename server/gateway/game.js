const express = require('express');
const gameController = require("../controller/gameController");
const gateway = express.Router();

gateway.route('/get-level/:token').get(gameController.getLevel);
gateway.route('/get-all-levels').get(gameController.getAllLevels);
gateway.route('/get-level-name/:levelId').get(gameController.getLevelName);
gateway.route('/get-events/:levelId').get(gameController.getEvents);
gateway.route('/get-event-cards/:eventId').get(gameController.getEventCards);
gateway.route('/get-card/:cardId').get(gameController.getCard);

module.exports = gateway;