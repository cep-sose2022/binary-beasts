const express = require('express');
const addDataController = require("../controller/addDataController");
const gateway = express.Router();

gateway.route('/post-level').post(addDataController.postLevel);
gateway.route('/post-event').post(addDataController.postEvent);
gateway.route('/post-card').post(addDataController.postCard);
gateway.route('/post-card-event').post(addDataController.postCardEvent);

module.exports = gateway;