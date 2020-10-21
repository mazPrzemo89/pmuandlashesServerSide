const Bookings = require('../models/bookings')
const { errorHandler } = require('../helpers/dbErrorHandler')



exports.update = (req, res) => {


    Bookings.findOneAndUpdate({ "name": req.body.name },
        {
            name: req.body.name,
            bookings: req.body.bookings,
            touched: req.body.touched,
        },
        {
            new: true,
            upsert: true,
            useFindAndModify: false
        }
    ).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        return res.json(data)
    })
}



exports.list = (req, res) => {
    if (req.body.bookings.length === 0) {
        return res.status(404).json({ "message": "Please set a timesheet" })
    }
    let expiryDate = new Date(new Date().valueOf() + 3600000 * 24 * 99)

    let startingTimeFromRequest = req.body.bookings[0].time
    let endTimeFromRequest = req.body.bookings[req.body.bookings.length - 1].time


    Bookings.find({ name: req.body.name }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        if (data.length === 0 || data === undefined) {

            const booking = new Bookings(req.body)
            booking.expireAt = expiryDate

            booking.save((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }

                return res.json(data)
            })
        } else if (data.length > 0) {
            // Checking if starting and finishing time for a given day if different

            let bookingTimesCheck = (
                (data[0].bookings[0].time === startingTimeFromRequest)
                &&
                (data[0].bookings[data[0].bookings.length - 1].time) === (endTimeFromRequest)
            )



            if (bookingTimesCheck) {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
                return res.json(data[0])
            } else {
                let update = { name: req.body.name, bookings: req.body.bookings, touched: false }
                Bookings.findOneAndUpdate(
                    { name: req.body.name },
                    update,
                    {
                        new: true,
                        upsert: true,
                        useFindAndModify: false
                    }
                ).exec((err, data2) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        })
                    }
                    return res.json(data2)
                })
            }
        }


    })
}

exports.deleteDay = (req, res) => {
    Bookings.findOneAndDelete({ "name": req.body.name }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        return res.json('deleted')
    })
}

exports.allBookings = (req, res) => {
    Bookings.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        return res.json(data)
    })
}