const express = require('express')
const router = express.Router()

const { userById } = require('../controllers/user')
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')

const { create, remove, list } = require('../controllers/photo')

router.post('/photo/create/:userId',requireSignin, isAuth, isAdmin, create)
router.delete('/photo/delete',remove)
router.get('/photos',list)

router.param('userId', userById)

module.exports = router