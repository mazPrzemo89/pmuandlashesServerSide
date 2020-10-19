const BookingTimes = require('../models/bookingTimes')
const { errorHandler } = require('../helpers/dbErrorHandler')
const times = require('../helpers/bookingTimes')

const bookingTimes = {
    name: 'workingTimesDefault',
    bookings: times,
    day: 'all'
}

exports.createDefault = (req, res) => {
    let data = new BookingTimes(bookingTimes)
    data.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        return res.json(data)
    })
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
    const separtator = { time: '--', type: '', isNotBooked: false, break: false, origin: true }

    const array = new Array()

    update.bookings.forEach((element, index, arr) => {

        array.push(element)
        if (arr[index].hasOwnProperty('position') && arr[index + 1].hasOwnProperty('position') &&
            (arr[index + 1].position - arr[index].position > 1)
        ) {
            array.push(arr[index])
            if (array[array.indexOf(arr[index])] === array[array.indexOf(arr[index]) + 1]) (
                array.splice(array.indexOf(arr[index]), 1)
            )
            for (let k = 0; k < arr[index + 1].position - arr[index].position - 1; k++) {
                console.log(index)
                array.splice(index + 1, 0, separtator)
            }
        }
    });


    update.bookings = array

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

