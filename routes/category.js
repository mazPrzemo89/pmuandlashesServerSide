const express = require('express')
const router = express.Router()

const { userById } = require('../controllers/user')
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')

const { create, remove, categoryById, list,read, updateCategory, getCategory} = require('../controllers/category')

router.get('/category/:categoryId',requireSignin, read)
router.post('/category/create/:userId',requireSignin, isAuth, isAdmin, create)
router.delete('/category/:userId',requireSignin, isAuth, isAdmin,remove)
router.get('/categories',list)
router.post('/category',getCategory)
router.post('/category/update', updateCategory)

router.param('userId', userById)
router.param('categoryId', categoryById)

module.exports = router