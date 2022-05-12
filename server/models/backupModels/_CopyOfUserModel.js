const mongoose = require('mongoose');

const copyUserSchema = mongoose.Schema(
    {
        nickname: {
            type: String,
            required: [true, 'Please add a nickname '],
        },
        pin: {
            type: String,
            required: [true, 'Please add a pin '],
        }
    },
    {
        versionKey: false
    },
    {
        timestamps: false,
    }
)

module.exports = mongoose.model('_CopyOfUser', copyUserSchema, '_CopyOfUser');