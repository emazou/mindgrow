const express = require('express');
const router = express.Router();
const productRouter = require('./products')
const userRouter = require('./users')
const commentRouter = require('./comments')
const publicationRouter = require('./publications')
const questionRouter = require('./questions')
const paymentRouter = require('./payments')

router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/comments', commentRouter)
router.use('/publications', publicationRouter)
router.use('/questions', questionRouter)
router.use('/payments', paymentRouter)

module.exports = router;