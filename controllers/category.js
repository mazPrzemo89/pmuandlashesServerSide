const Category = require('../models/category')
const formidable = require('formidable')
const fs = require('fs')
const btoa = require('btoa')
const { errorHandler } = require('../helpers/dbErrorHandler')


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
        const { name, photo } = fields

        if (!name || name === '') {
            return res.status(400).json({
                error: 'Please fill all the fields'
            })
        }

        let category = new Category(fields)

        if (files.photo) {
            //console.log("FILES PHOTO ", files.photo)
            if (files.photo.size > 5000000) {
                return res.status(400).json({
                    error: 'Image should be less than 0.5Mb'
                })
            }
            let photoBuffer = fs.readFileSync(files.photo.path)
            let photoType = files.photo.type
            category.photo = `data:${photoType};base64,${btoa(photoBuffer)}`
        } else {
            return res.status(400).json({
                error: 'Please post an image'
            })
        }

        category.save((err, result) => {
            if (err) {
                let error = err.message
                if (err.code === 11000) {
                    error = 'Name already exists'
                }
                return res.status(400).json({
                    error
                })
            }
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json(result)
        })
    })
}

exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json({ data })
    })
}

exports.remove = (req, res) => {
    Category.findById(req.body.id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Category not found'
            })
        }
        category.remove((err, deletedCategory) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json({
                message: 'Category deleted'
            })
        })
    })
}

exports.getCategory = (req, res) => {
    Category.findById(req.body.id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Category not found'
            })
        }
        return res.status(200).json(category)
    })
}

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Category not found'
            })
        }

        req.category = category
        next()
    })
}

exports.updateCategory = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {

            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        // check for all fields
        const { name, oldPhoto, id } = fields

        if (!name) {
            return res.status(400).json({
                error: 'Please fill all the fieldsss'
            })
        }

        let category = new Category(fields)

        if (files.photo) {
            if (files.photo.size > 5000000) {
                return res.status(400).json({
                    error: 'Image should be less than 5Mb'
                })
            }

            let photoBuffer = fs.readFileSync(files.photo.path)
            let photoType = files.photo.type
            category.photo = `data:${photoType};base64,${btoa(photoBuffer)}`
        }
        Category.findByIdAndUpdate({ '_id': id }, {
            name: category.name,
            photo: category.photo !== undefined ? category.photo : oldPhoto
        })
            .exec((err, product) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Product not founddd'
                    })
                }
                return res.status(200).json({})
            })

    })

}

exports.read = (req, res) => {
    let category = req.category
    return res.json({ category })
}