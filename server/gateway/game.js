const express = require('express');
const controler = require("../controller/gameController");
const {getLevel} = require("../controller/gameController");
const gateway = express.Router();

// gateway.route('/getLevel').get(controler.getLevel);
gateway.route('/getLevel').get(getLevel);

module.exports = gateway;