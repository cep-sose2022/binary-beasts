const mongoose = require('mongoose');

const copyEventSchema = mongoose.Schema(
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
        versionKey: false
    },
    {
        timestamps: false,
    }
)

module.exports = mongoose.model('_CopyOfEvent', copyEventSchema, '_CopyOfEvent');