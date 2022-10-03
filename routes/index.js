var express = require('express');
var router = express.Router();
const productRouter = require('./products')
const userRouter = require('./users')

router.use('/products', productRouter)
router.use('/users', userRouter)

module.exports = router;