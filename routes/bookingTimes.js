const express = require('express')
const router = express.Router()

const { userById } = require('../controllers/user')
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')

const { createDefault, readDefault,  createCustom, readCustom, list, remove } = require('../controllers/bookingTimes')

//Run the first route to initialize working times
router.put('/bookings/setbookingtimes', createDefault) 
router.get('/bookings/getbookingtimes', readDefault)
router.put('/bookings/setcustombookingtimes/:userId',requireSignin, isAuth, isAdmin, createCustom)
router.get('/bookings/getcustombookingtimes', readCustom)
router.get('/bookings/all', list)
router.delete('/bookings/delete', remove)

router.param('userId', userById)

module.exports = router