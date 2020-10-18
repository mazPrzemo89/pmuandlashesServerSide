const express = require('express')
const router = express.Router()

const {  list,  update, deleteDay, allBookings} = require('../controllers/bookings')

router.get('/bookings/getbookings', allBookings)
router.post('/bookings/deleteday', deleteDay)
router.post('/bookings/read', list)
router.put('/bookings/book', update)


module.exports = router