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
        await newUser.save();

        res.status(201).json({ newUser });
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
        //const user = await User.find({ nickname: req.params.nickname, pin: pin.pin });
        const userExists = await User.exists({ nickname: req.params.nickname, pin: pin.pin });
        console.log(userExists);
        let exists = false;
        if(userExists) exists = true;
        res.status(201).json({ exists: exists });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = userController;