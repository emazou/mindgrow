var express = require('express');
var router = express.Router();
const productRouter = require('./products')
const userRouter = require('./users')
const commentRouter = require('./comments')
const publicationRouter = require('./publications')
const reviewRouter = require('./reviews')

router.use('/publications', publicationRouter)
router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/comments', commentRouter)
router.use('/reviews', reviewRouter)

module.exports = router;