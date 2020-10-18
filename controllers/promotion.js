const Promotion = require('../models/promotion')


exports.read = (req, res) => {
    Promotion.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        } else {
            return res.json(data)
        }
    })
}

exports.create = (req, res) => {
    let promotion = new Promotion
    promotion.title = req.body.title
    promotion.text = req.body.text
    promotion.save((err, data) => {
        if (err) {
            console.log(err._message)
            let message = err._message
            return res.status(400).json({
                error: 'Please fill all the fields'
            })
        }
        res.json(data)
    })
}

exports.remove = (req, res) => {
    console.log(req.body)
    Promotion.findById(req.body.id).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }

        data.remove((err, deletedPromotion) => {
            if (err) {

                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json({
                message: 'product deleted'
            })
        })

    })

}
