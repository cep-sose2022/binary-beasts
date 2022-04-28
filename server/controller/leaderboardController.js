const asyncHandler = require('express-async-handler');
const Leaderboard = require('../models/leaderboardModel');


const getLeaderboard =  asyncHandler(async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find();
        console.log(leaderboard);
        res.status(200).json({ leaderboard });
    } catch (err) {
        res.json({ message: err.message });
    }
})

const getUserLeaderboard =  asyncHandler(async (req, res) => {
    try {
        const userLeaderboard = await Leaderboard.find({ username: req.params.username });
        console.log(userLeaderboard);
        res.status(200).json({ userLeaderboard });
    } catch (err) {
        res.json({ message: err.message });
    }
})

const postLeaderboard =  asyncHandler(async (req, res) => {
    try {
        const userLevel = req.body;
        console.log(userLevel);
        const newLevelLeaderboard = new Leaderboard(userLevel);
        await newLevelLeaderboard.save();
        
        res.status(200).json({ newLevelLeaderboard });
    } catch (err) {
        res.json({ message: err.message });
    }
})

module.exports = {
    getLeaderboard, getUserLeaderboard, postLeaderboard
}