const express = require('express')
const router = express.Router()

const { userById } = require('../controllers/user')
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')

const { create, read, remove } = require('../controllers/promotion')

router.get('/promotionsjson', read)
router.post('/promotion/create/:userId',requireSignin, isAuth, isAdmin,create)
router.delete('/promotion/remove/:userId',requireSignin, isAuth, isAdmin, remove)

router.param('userId', userById)

module.exports = router