const express = require('express')
const router = express.Router()

const { findOrCreate, holiday } = require('../controllers/month')


router.post('/month/read', findOrCreate)
router.post('/month/holiday', holiday)

module.exports = router