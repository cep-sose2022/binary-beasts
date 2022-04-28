const express = require('express');
const controler = require("../controller/gameController");
const {getLevel, getAllLevels, getEvent, getEventCard, getCard} = require("../controller/gameController");
const gateway = express.Router();

gateway.route('/getLevel/:name').get(getLevel);
gateway.route('/getAllLevels').get(getAllLevels);
gateway.route('/getEvent/:levelId').get(getEvent);
gateway.route('/getEventCard/:eventId').get(getEventCard);
gateway.route('/getCard/:cardId').get(getCard);


module.exports = gateway;