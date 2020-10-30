const express = require('express')
const router = express.Router()

const { userById } = require('../controllers/user')
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')

const { create, findById, remove, list, productsByCategoryId, fetchPrice, updateProduct } = require('../controllers/product')
const { categoryById } = require('../controllers/category')

router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create)
router.delete('/product/:userId', requireSignin, isAuth, isAdmin, remove)
router.post('/productbyid', findById)
router.post('/product/update', updateProduct)
router.post('/price/product', fetchPrice)
router.get('/productss', list)
router.get('/products/cat/:categoryId', productsByCategoryId)

router.param('userId', userById)
router.param('categoryId', categoryById)


module.exports = router