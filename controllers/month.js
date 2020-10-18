const Month = require('../models/month')
const Days = require('../models/days')
const {errorHandler} = require('../helpers/dbErrorHandler')
const { fillCalendar } = require('../helpers/calendarPage')

exports.findOrCreate = (req, res) => {
    Days.find().exec((err,data)=>{
        const workingDays = data
        let expiryDate = new Date(new Date().valueOf() + 3600000*24*99)
        Month.find({"name": req.body.name}).exec((err, data)=>{
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            if(data.length === 0){
                const month = new Month({name: req.body.name, days: fillCalendar(req.body.month,req.body.year)})

                for(let i=0;i<month.days.length;i++){

                        month.days[i][0].disabled = workingDays[0].days[month.days[i][0].dayOfWeek]
                        
                }
                month.expireAt = expiryDate
                month.save((err, data)=>{
                    if(err) {
                        console.log(err)
                        console.log(req.body)
                        return res.status(400).json({
                            error: err
                        })
                    }
                    res.json(data)
                })
            } else {
                for(let i=0;i<data[0].days.length;i++){
                    if(data[0].days[i][0].holiday === true){
                        data[0].days[i][0].disabled = true
                    } else {
                        data[0].days[i][0].disabled = workingDays[0].days[data[0].days[i][0].dayOfWeek]
                    } 
                }
                return res.json(data[0])
            } 
        })
    })

} 

exports.holiday = (req, res) => {

    Month.findOneAndUpdate({"name":req.body.name},
        {
        new: true,
        upsert: true,
        useFindAndModify: false
        }).exec((err, data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })

        }   
            const daysParsed = data.days.map((arr,i)=>{
                if(parseInt(req.body.day) === arr[0].day){
                    return {
                        day: arr[0].day,
                        dayOfWeek: arr[0].dayOfWeek,
                        value: arr[0].value,
                        date: arr[0].date,
                        disabled: arr[0].disabled,
                        holiday: arr[0].holiday === true ? false : true
                    }
                } else {
                    return arr[0]
                } 
            })

            data.days = daysParsed
            data.save((err, result)=>{
                if(err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                } 
                res.json(result)
            })
    })

}