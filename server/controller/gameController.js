const asyncHandler = require('express-async-handler');
const Level = require('../models/levelModel');
const Event = require('../models/eventModel');

const getLevel =  asyncHandler(async (req, res) => {
    try {
        const level = await Level.find();
        console.log(level);
        res.status(200).json({ level });
    } catch (err) {
        res.json({ message: err.message });
    }
})

const getEvent =  asyncHandler(async (req, res) => {
    try {
        const event = await Event.find({ levelId: req.params.levelId });
        console.log(event);
        res.status(200).json({ event });
    } catch (err) {
        res.json({ message: err.message });
    }
})

module.exports = {
    getLevel, getEvent
}