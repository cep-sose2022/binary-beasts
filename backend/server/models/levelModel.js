const mongoose = require('mongoose');

const levelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name '],
        },
        token: {
            type: String,
            required: [true, 'Please add a token '],
        },
        description: {
            type: String,
            required: [true, 'Please add a description '],
        },
        maxScore: {
            type: Number,
            required: [true, 'Please add a maxScore '],
        },
    },
    {
        versionKey: false
    },
    {
        timestamps: false,
    }
)

module.exports = mongoose.model('Level', levelSchema, 'Level');