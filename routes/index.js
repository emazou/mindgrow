const express = require('express');
const router = express.Router();
const productRouter = require('./products')
const userRouter = require('./users')
const commentRouter = require('./comments')
const publicationRouter = require('./publications')
const reviewRouter = require('./reviews')
const paymentRouter = require('./payments')

router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/comments', commentRouter)
router.use('/publications', publicationRouter)
router.use('/reviews', reviewRouter)
router.use('/payments', paymentRouter)

module.exports = router;