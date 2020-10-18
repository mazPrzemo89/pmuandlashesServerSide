const express = require('express')
const router = express.Router()

const { read, update } = require('../controllers/days')

router.post('/days/read', read)
router.put('/days/update', update)

module.exports = router