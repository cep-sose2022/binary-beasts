const mongoose = require('mongoose');

const copyCardEventSchema = mongoose.Schema(
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
        versionKey: false
    },
    {
        timestamps: false,
    }
)

module.exports = mongoose.model('_CopyOfCardEvent', copyCardEventSchema, '_CopyOfCardEvent');