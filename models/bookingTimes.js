const mongoose = require("mongoose");


const bookingTimeSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.String,
            unique: false,
            require: true
        },
        bookings: {
            type: mongoose.Schema.Types.Object,
            required: true
        },
        day: {
            type: mongoose.Schema.Types.String,
            required: true,
            unique: true
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("BookingTime", bookingTimeSchema);