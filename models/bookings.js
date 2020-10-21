const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        name: {
            unique: true,
            type: mongoose.Schema.Types.String,
            required: true,
        },
        bookings: {
            type: mongoose.Schema.Types.Object,
            required: true
        },
        touched: {
            type: mongoose.Schema.Types.Boolean,
            value: true
        },
        isWorking: {
            type: mongoose.Schema.Types.Boolean,
            value: true
        },
        type: {
            type: mongoose.Schema.Types.String,
            value: ""
        },
        duration: {
            type: mongoose.Schema.Types.Number,
            value: 0
        },
        phone: {
            type: mongoose.Schema.Types.String,
            value: ""
        },
        customerName: {
            type: mongoose.Schema.Types.String,
            value: ""
        },
        refNumber: {
            type: mongoose.Schema.Types.String,
            value: ""
        },
        expireAt: {
            type: Date,
            default: Date.now,
            index: { unique: true, expireAfterSeconds: 10 }
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("Bookings", bookingSchema);
//3600*24*99