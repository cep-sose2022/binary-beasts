const express = require('express');
const userController = require('../controller/userController');

const gateway = express.Router();

gateway.route('/check-user/:nickname').post(userController.checkUser);
gateway.route('/post-user').post(userController.postUser);

module.exports = gateway;