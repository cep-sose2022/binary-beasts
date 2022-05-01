const express = require('express');
const gameController = require("../controller/gameController");
const gateway = express.Router();

gateway.route('/getLevel/:name').get(gameController.getLevel);
gateway.route('/getAllLevels').get(gameController.getAllLevels);
gateway.route('/getEvents/:levelId').get(gameController.getEvents);
gateway.route('/getEventCards/:eventId').get(gameController.getEventCards);
gateway.route('/getCard/:cardId').get(gameController.getCard);

module.exports = gateway;