var express = require('express');
var router = express.Router();
const productRouter = require('./products')
const userRouter = require('./users')
const commentRouter = require('./comments')

router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/comments', commentRouter)

module.exports = router;