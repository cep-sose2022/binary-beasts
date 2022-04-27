const mongoose = require('mongoose')

const levelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        events: {
            type: Array,
            required: [false, 'Please add an event'],
        },
    },
    {
        timestamps: false,
    }
)

module.exports = mongoose.model('Level', levelSchema)