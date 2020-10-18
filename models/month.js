const mongoose = require("mongoose");

const monthSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: mongoose.Schema.Types.String,
        required: true,
    },
    days: {
        type: mongoose.Schema.Types.Array,
        required: true
    },
    touched: {
        type: mongoose.Schema.Types.Boolean,
        value: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: {unique: true, expireAfterSeconds:10}
    }

},{timestamps: true})

module.exports = mongoose.model("Month", monthSchema);