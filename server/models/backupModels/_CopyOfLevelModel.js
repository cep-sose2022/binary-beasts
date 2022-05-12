const mongoose = require('mongoose');

const copyLevelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name '],
        },
        token: {
            type: String,
            required: [true, 'Please add a token '],
        },
    },
    {
        versionKey: false
    },
    {
        timestamps: false,
    }
)

module.exports = mongoose.model('_CopyOfLevel', copyLevelSchema, '_CopyOfLevel');