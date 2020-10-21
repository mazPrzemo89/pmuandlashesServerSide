const BookingTimes = require('../models/bookingTimes')
const { errorHandler } = require('../helpers/dbErrorHandler')


exports.createDefault = (req, res) => {
    // let data = new BookingTimes(bookingTimes)
    // data.save((err, data) => {
    //     if (err) {
    //         return res.status(400).json({
    //             error: errorHandler(err)
    //         })
    //     }
    //     return res.json(data)
    // })
}

exports.readDefault = (req, res) => {
    BookingTimes.find({ "name": "workingTimesDefault" }).exec((err, data) => {
        console.log(data)
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        } else {
            if (data.length > 0) {
                return res.json(data[0].bookings)
            } else {
                res.status(200).json({ "error": true })
            }

        }
    })
}

exports.createCustom = (req, res) => {
    console.log('CREATE CUSTOM')
    let update = { name: "workingTimes", bookings: req.body.bookings, day: req.body.day }

    BookingTimes.findOneAndUpdate(
        { "day": req.body.day },
        update,
        {
            upsert: true,
            useFindAndModify: false
        }
    ).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        if (data === null) {
            let bookings = new BookingTimes({
                name: "workingTimes",
                bookings: req.body.bookings,
                day: req.body.day
            })
            bookings.save((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
                res.json(data)
            })
        } else {
            return res.json(data)
        }

    })

}

exports.readCustom = (req, res) => {
    BookingTimes.find({ "name": "workingTimes" }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        } else {
            return res.json(data)
        }
    })

}

exports.list = (req, res) => {
    let response = []
    BookingTimes.find().exec((err, bookingTimes) => {
        if (err || !bookingTimes) {
            return res.status(400).json({
                error: 'Times not found'
            })
        } else {
            response = bookingTimes.map((el) => {
                if (el.day !== "all" && el.day !== "default") {
                    return {
                        day: el.day,
                        id: el._id
                    }
                }
            })
            return res.json(response)
        }
    })
}

exports.remove = (req, res) => {
    BookingTimes.findById(req.body.id).exec((err, bookingTimes) => {
        if (err || !bookingTimes) {
            return res.status(400).json({
                error: 'Category not found'
            })
        }
        bookingTimes.remove((err, deletedTimes) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json({
                message: 'Times deleted'
            })
        })
    })
}

