const express = require('express')
const router = express.Router()

const { processPayment } = require('../controllers/stripe')

router.post('/stripe/payment', processPayment)

module.exports = router