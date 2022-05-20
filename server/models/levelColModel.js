const mongoose = require('mongoose');

const levelSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            required: [true, 'Please add an id '],
        },
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
        events: {
            type: Object,
            items: {
                _id: { type: String },
                name: { type: String },
                text: { type: Array },
                levelId: { type: String},
                cards: { type: Object, items: {
                        _id: String,
                        name: String,
                        text: Array,
                        points: Number,
                        nextEvent: Number,
                        nextImage: String,
                        nextEventText: Number,
                        image: String
                    }}
            },
            required: [true, 'Please add events '],
        },
    },
    {
        versionKey: false
    },
    {
        timestamps: false,
    }
)

module.exports = mongoose.model('LevelCol', levelSchema, 'LevelCol');