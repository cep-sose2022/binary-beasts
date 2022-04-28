const express = require('express');
const controler = require("../controller/gameController");
const {getLevel, getEvent, getEventCard, getCard} = require("../controller/gameController");
const gateway = express.Router();

// gateway.route('/getLevel').get(controler.getLevel);
gateway.route('/getLevel').get(getLevel);
gateway.route('/getEvent/:levelId').get(getEvent);
gateway.route('/getEventCard/:eventId').get(getEventCard);
gateway.route('/getCard/:cardId').get(getCard);


module.exports = gateway;