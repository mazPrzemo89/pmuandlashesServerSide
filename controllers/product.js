const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const btoa = require('btoa')
const Product = require('../models/product')
const { errorHandler } = require('../helpers/dbErrorHandler')
const product = require('../models/product')


exports.findById = (req, res) => {
    Product.findOne({ "_id": req.body.id }).exec((err, product) => {
        if (err) {
            return res.status(400).json({
                error: 'Product not found'
            })
        }
        return res.json(product)
    })
}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        // check for all fields
        const { name, description, price, category, duration, oldPhoto, id } = fields

        if (!name || !description || !price || !category || !duration) {
            return res.status(400).json({
                error: 'Please fill all the fields'
            })
        }

        let product = new Product(fields)

        if (files.photo) {
            if (files.photo.size > 5000000) {
                return res.status(400).json({
                    error: 'Image should be less than 5Mb'
                })
            }

            let photoBuffer = fs.readFileSync(files.photo.path)
            let photoType = files.photo.type
            product.photo = `data:${photoType};base64,${btoa(photoBuffer)}`
        }
        Product.findByIdAndUpdate({ '_id': id }, {
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            duration: product.duration,
            photo: product.photo !== undefined ? product.photo : oldPhoto
        })
            .exec((err, product) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Product not found'
                    })
                }
                return res.status(200).json({})
            })

    })

}

exports.fetchPrice = (req, res) => {
    console.log(req.body.name)
    Product.findOne({ "name": req.body.name }).exec((err, product) => {
        if (err) {
            return res.status(400).json({
                error: 'Product not founddd'
            })
        }

        if (product) {
            res.json(product.price)
            return
        } else {
        }
        res.json(product)

    })
}

exports.productsByCategoryId = (req, res) => {

    Product.find({ "category": req.category._id }).exec((err, products) => {
        if (err) {
            return res.status(400).json({
                error: 'Products not found'
            })
        }
        return res.json(products)

    })
}


exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        // check for all fields
        const { name, description, price, category, duration } = fields

        if (!name || !description || !price || !category || !duration) {
            return res.status(400).json({
                error: 'Please fill all the fields'
            })
        }

        let product = new Product(fields)

        if (files.photo) {
            //console.log("FILES PHOTO ", files.photo)
            if (files.photo.size > 5000000) {
                return res.status(400).json({
                    error: 'Image should be less than 0.5Mb'
                })
            }

            let photoBuffer = fs.readFileSync(files.photo.path)
            let photoType = files.photo.type
            product.photo = `data:${photoType};base64,${btoa(photoBuffer)}`
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}

exports.remove = (req, res) => {
    let id = req.body.id
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: 'Product not found'
            })
        }
        product.remove((err, deletedProduct) => {
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



exports.list = (req, res) => {

    Product.find()
        .select("-photo")
        .populate('category')
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not fount'
                })
            }
            let productList = []
            products.forEach(product => {
                productList.push({
                    name: product.name,
                    duration: product.duration
                })
            })
            res.json(productList)
        })
}
