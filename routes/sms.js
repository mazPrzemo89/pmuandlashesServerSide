const express = require('express')
const router = express.Router()


const { sendSMS, scheduleSMS } = require('../controllers/sms')


router.post('/sms/send', sendSMS)
router.post('/sms/schedule', scheduleSMS)


module.exports = router