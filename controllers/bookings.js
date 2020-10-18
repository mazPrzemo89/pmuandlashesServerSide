const Bookings = require('../models/bookings')
const {errorHandler} = require('../helpers/dbErrorHandler')



exports.update = (req, res) => {
 

    Bookings.findOneAndUpdate({"name": req.body.name},
        {   name: req.body.name,
            bookings: req.body.bookings, 
            touched: req.body.touched,
        },
        {
        new: true,
        upsert: true,
        useFindAndModify: false
        }
      ).exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        console.log(data)
        return res.json(data)
    })
}


 
exports.list = (req, res) => {
    let expiryDate = new Date(new Date().valueOf() + 3600000*24*99)

    Bookings.find({name: req.body.name}).exec((err, data) => {

        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        if (data.length === 0 || data === undefined) {
            const booking = new Bookings(req.body)
            booking.expireAt = expiryDate
            console.log(booking)
            booking.save((err, data)=>{
                if(err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
               
               return res.json(data)
            })
        } else if (data.length > 0) {


            let arr1 = []
            let arr2 = []

            for(let i=0;i<req.body.bookings.length;i++){
                if(req.body.bookings[i][0].hasOwnProperty('position')){
                    arr1.push(req.body.bookings[i][0].position)
                }
            }
            for(let i=0;i<data[0].bookings.length;i++){
                if(data[0].bookings[i][0].hasOwnProperty('position')){
                arr2.push(data[0].bookings[i][0].position)
                }
            }
            let string1 = new String(JSON.stringify(arr1))
            let string2 = new String(JSON.stringify(arr2))

            if(string1.trim() === string2.trim()){
                if(err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                        }
                    return res.json(data[0])
            } else {
                let update = {name: req.body.name, bookings: req.body.bookings, touched: false}
                Bookings.findOneAndUpdate(
                    {name: req.body.name}, 
                    update,
                    {
                    new: true,
                    upsert: true,
                    useFindAndModify: false
                    }
                  ).exec((err, data2) => {
                    if(err) {
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

exports.deleteDay = (req,res) => {
    Bookings.findOneAndDelete({"name":req.body.name}).exec((err, data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        return res.json('deleted')
    })
}

exports.allBookings = (req, res) => {
    Bookings.find().exec((err, data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        return res.json(data)
    })
}