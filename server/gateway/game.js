const express = require('express');
const controler = require("../controller/gameController");
const {getLevel, getEvent} = require("../controller/gameController");
const gateway = express.Router();

// gateway.route('/getLevel').get(controler.getLevel);
gateway.route('/getLevel').get(getLevel);

gateway.route('/getEvent/:levelId').get(getEvent);

module.exports = gateway;