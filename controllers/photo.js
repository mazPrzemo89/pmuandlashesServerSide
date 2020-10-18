const Photo = require('../models/photo')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const btoa = require('btoa')
const {errorHandler} = require('../helpers/dbErrorHandler')


exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
     if(err){
         return res.status(400).json({
             error: 'Image could not be uploaded'
         })
     }
     // check for all fields
     const {name, image} = fields

     if(!name) {
         return res.status(400).json({
             error: 'Please fill all the fields'
         })
    }

    let photo = new Photo(fields)
     
     if(files.image){
        //console.log("FILES PHOTO ", files.photo)
         if(files.image.size > 1000000) {
             return res.status(400).json({
                 error: 'Image should be less than 0.5Mb'
             })
         }

        let photoBuffer = fs.readFileSync(files.image.path)
        let photoType = files.image.type
        photo.image = `data:${photoType};base64,${btoa(photoBuffer)}`
        
    } else {
        return res.status(400).json({
            error: 'Please post an image'
        })
    }
     
     photo.save((err, result)=>{
         if(err) {
             return res.status(400).json({
                 error: errorHandler(err)
             })
         } 
         res.json(result)
     })
    })
 }




exports.list = (req, res) => {
    Photo.find().exec((err, data) => {
        let ids = []
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
   
        res.status(200).json(data)
    })
}

exports.remove = (req, res) => {
    Photo.findById(req.body.id).exec((err, photo) => {
        if(err || !photo) {
            return res.status(400).json({
                error: 'photo not found'
            })
        }
        photo.remove((err, deletedphoto) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json({
                message: 'photo deleted'
            })
        })
    })
}

exports.photoById = (req, res, next, id) => {
    Photo.findById(id).exec((err, image) => {
        if(err || !image) {
            return res.status(400).json({
                error: 'photo not found'
            })
        }
        req.image = image
        next()
    })
}