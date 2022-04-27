const express = require('express');
const gateway = express.Router();

gateway.route('/getLevel').get(getLevel);

module.exports = gateway;