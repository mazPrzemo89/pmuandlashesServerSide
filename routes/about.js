const express = require('express')
const router = express.Router()

const { userById } = require('../controllers/user')
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')

const { createOrUpdate, read } = require('../controllers/about')

router.get('/aboutapi', read)
router.post('/about/create/:userId',requireSignin, isAuth, isAdmin, createOrUpdate)
// router.delete('/category/:userId',requireSignin, isAuth, isAdmin,remove)
// router.get('/categories',list)
// router.get('/category/photo/:categoryId', photoCategory)

router.param('userId', userById)


module.exports = router