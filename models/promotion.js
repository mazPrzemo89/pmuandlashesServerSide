const mongoose = require('mongoose')

const promotionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 34
    },
    text: {
        type: String,
        required: true,
        maxlength: 2000
        }
}, {timestamps: true})

module.exports = mongoose.model('Promotion', promotionSchema)