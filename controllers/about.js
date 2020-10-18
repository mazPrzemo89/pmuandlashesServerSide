const About = require('../models/about')
const formidable = require('formidable')
const btoa = require('btoa')
const fs = require('fs')

exports.createOrUpdate = (req, res) => {
  
    About.findOneAndUpdate({'name':'admin info'}).exec((err, data)=>{
        let form = new formidable.IncomingForm()
        form.keepExtensions = true

        if(data === null){
            form.parse(req, (err, aboutFrom, files) => {
                console.log(files)
             if(err){
                
                 return res.status(400).json({
                     error: 'Image could not be uploaded'
                 })
             }

            const {title, message} = aboutFrom

           if(!title || !message) {
                return res.status(400).json({
                    error: 'Please fill all the fields'
                })
            }
            let aboutAdmin = new About(aboutFrom)
        
            if(files.photo){
                //console.log("FILES PHOTO ", files.photo)
                 if(files.photo.size > 5000000) {
                     return res.status(400).json({
                         error: 'Image should be less than 0.5Mb'
                     })
                 }
                 photoBuffer = fs.readFileSync(files.photo.path)
                 photoType = files.photo.type
                 aboutAdmin.photo = `data:${photoType};base64,${btoa(photoBuffer)}`
             }
             aboutAdmin.name = 'admin info'
             aboutAdmin.save((err, result)=>{
                 if(err) {
                    console.log(err)
                     return res.status(400).json({
                         err: 'Name already exists'
                     })
                 } 
                 res.json(result)
             })
            })
        } else {
            form.parse(req, (err, aboutFrom, files) => {
             if(err){
                
                 return res.status(400).json({
                     error: 'Image could not be uploaded'
                 })
             }

            const {title, message} = aboutFrom

           if(!title || !message) {
                return res.status(400).json({
                    error: 'Please fill all the fields'
                })
            }
            
            data.title = title
            data.message = message
        
            if(files.photo){
                //console.log("FILES PHOTO ", files.photo)
                 if(files.photo.size > 5000000) {
                     return res.status(400).json({
                         error: 'Image should be less than 0.5Mb'
                     })
                 }
                 photoBuffer = fs.readFileSync(files.photo.path)
                 photoType = files.photo.type
                 data.photo = `data:${photoType};base64,${btoa(photoBuffer)}`
             }
             data.name = 'admin info'
             data.save((err, result)=>{
                 if(err) {
                    console.log(err)
                     return res.status(400).json({
                         err: err.message
                     })
                 } 
                 res.json(result)
             })
            })
        }
    })
}

exports.read = (req, res) => {
    About.findOne({'name':'admin info'}).exec((err, data)=>{
        if(err){
            return res.status(400).json({
                error: err.message
            })
        }
        return res.status(200).json(data)
    })
}