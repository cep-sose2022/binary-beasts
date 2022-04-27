const asyncHandler = require('express-async-handler');
const Level = require('../models/levelModel');

const getLevel =  asyncHandler(async (req, res) => {
    try {
        const level = await Level.find();
        console.log(level);
        res.status(200).json({ level });
    } catch (err) {
        res.json({ message: err.message });
    }
})

module.exports = {
    getLevel
}