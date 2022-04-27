const mongoose = require('mongoose');

const levelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name '],
        },
        versionKey: false
    },
    {
        timestamps: false,
    }
)

module.exports = mongoose.model('Level', levelSchema, 'Level');