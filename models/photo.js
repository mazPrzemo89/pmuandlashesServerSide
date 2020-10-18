const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
        },
    image: {
        type: mongoose.Schema.Types.String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Photo', photoSchema)