const mongoose = require("mongoose");

const daysSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: mongoose.Schema.Types.String,
        required: true,
        
    },
    days: {
        type: mongoose.Schema.Types.Object,
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model("Days", daysSchema);