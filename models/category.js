const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.String,
            required: true,
            unique: true,
            maxlength: 32,
        },    
        photo: {
            type: mongoose.Schema.Types.String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);