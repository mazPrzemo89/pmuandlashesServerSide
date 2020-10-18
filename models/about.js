const mongoose = require('mongoose')


const aboutSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique:true,
        required: true,
        maxlength: 32
        },
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
        },
    message: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
        },
    photo: {
        type: mongoose.Schema.Types.String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('About', aboutSchema)