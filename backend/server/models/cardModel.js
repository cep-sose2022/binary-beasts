const mongoose = require('mongoose');

const cardSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        text: {
            type: Array,
            required: [true, 'Please add a text'],
            unique: true,
        },
        points: {
            type: Number,
            required: [true, 'Please add a point'],
        },
        nextEvent: {
            type: Number,
            required: [true, 'Please add next event'],
        },
        nextImage: {
            type: String,
            required: [true, 'Please add next Image'],
        },
        nextEventText: {
            type: Number,
            required: [true, 'Please add next event text'],
        },
        image: {
            type: String,
            required: [true, 'Please add next event text'],
        },
        feedback: {
            type: String,
            required: [false, 'Please add a feedback'],
        },
    },
    {
        versionKey: false
    },
    {
        timestamps: false,
    }
)

module.exports = mongoose.model('Card', cardSchema, 'Card');