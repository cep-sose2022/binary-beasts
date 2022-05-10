const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const userController = {};

/**
 * @desc post new entire in User collection
 * @route POST /user/post-user
 * @access public
 */
userController.postUser =  asyncHandler(async (req, res) => {
    try {
        let user = req.body;
        const newUser = new User(user);
        const userExists = await User.exists({ nickname: req.body.nickname });
        let exists = false;
        if(userExists) exists = true;
        if (!exists) {
            await newUser.save();
            res.status(201).json({ newUser });
        } else {
            res.status(403).json({message: err.message});
        }
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

/**
 * @desc check if nickname and pin tuple exists in collection
 * @route POST /user/check-user/${nickname}
 * @access public
 */
 userController.checkUser =  asyncHandler(async (req, res) => {
    try {
        let pin = req.body;
        const userExists = await User.exists({ nickname: req.params.nickname, pin: pin.pin });
        let exists = false;
        if(userExists) exists = true;
        res.status(201).json({ exists: exists });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = userController;