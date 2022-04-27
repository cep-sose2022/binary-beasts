const mongoose = require('mongoose')

const cardEventSchema = mongoose.Schema(
    {
        cardId: {
            type: String,
            required: [true, 'Please add a cardId'],
        },
        eventId: {
            type: String,
            required: [true, 'Please add a eventId'],
        },
    },
    {
        timestamps: false,
    }
)

module.exports = mongoose.model('CardEvent', cardEventSchema)