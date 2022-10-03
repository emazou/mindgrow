var express = require('express');
var router = express.Router();
const productRouter = require('./products')
const userRouter = require('./users')
const reviewRouter = require('./reviews')
router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/reviews', reviewRouter)
module.exports = router;