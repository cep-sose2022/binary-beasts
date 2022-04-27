const mongoose = require('mongoose');

const leaderboardSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, 'Please add a userName'],
        },
        levelId: {
            type: String,
            required: [true, 'Please add a levelId'],
        },
        score: {
            type: Number,
            required: [true, 'Please add a score'],
        },
    },
    {
        timestamps: false,
    }
)

module.exports = mongoose.model('Leaderboard', leaderboardSchema, 'Leaderboard');