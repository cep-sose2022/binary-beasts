const mongoose = require('mongoose');

const copyLeaderboardSchema = mongoose.Schema(
    {
        username: {
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
        versionKey: false
    },
    {
        timestamps: false,
    },
)

module.exports = mongoose.model('_CopyOfLeaderboard', copyLeaderboardSchema, '_CopyOfLeaderboard');