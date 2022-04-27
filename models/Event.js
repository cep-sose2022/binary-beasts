const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        text: {
            type: Array,
            required: [true, 'Please add a text'],
        },
        levelId: {
            type: String,
            required: [false, 'Please add a levelID'],
        },
    },
    {
        timestamps: false,
    }
)

module.exports = mongoose.model('Event', eventSchema)