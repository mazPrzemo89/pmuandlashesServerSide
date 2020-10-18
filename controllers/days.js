const Days = require('../models/days')
const {errorHandler} = require('../helpers/dbErrorHandler')
const daysObject = require('../helpers/days')

exports.read = (req, res) => {
    Days.find().exec((err, data)=>{
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        if(data.length === 0){
            const days = new Days({name: 'days', days: daysObject})
            days.save((err, data)=>{
                if(err) {
                    return res.status(400).json({
                        error: err
                    })
                }
                res.json(data)
            })
        } else {
            return res.json(data)
        } 
    })
} 

exports.update = (req, res) => {
    let update = {days: req.body}
    Days.findOneAndUpdate({"name": "days"}, 
    update,
    {
    new: true,
    upsert: true,
    useFindAndModify: false
    }).exec((err, data)=>{
        if(err) {
            return res.status(400).json({
                error: err
            })
        } else {
            console.log(data)
            return res.json(data)
        } 
    })
} 