const mongoose = require('mongoose');

const copyCardSchema = mongoose.Schema(
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
            required: [false, 'Please add next Image'],
        },
        nextEventText: {
            type: Number,
            required: [false, 'Please add next event text'],
        }
    },
    {
        versionKey: false
    },
    {
        timestamps: false,
    }
)

module.exports = mongoose.model('_CopyOfCard', copyCardSchema, '_CopyOfCard');