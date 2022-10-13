const express = require('express');
const router = express.Router();
const productRouter = require('./products')
const userRouter = require('./users')
const commentRouter = require('./comments')
const publicationRouter = require('./publications')
const questionRouter = require('./questions')
const answerRouter = require('./answers')
const paymentRouter = require('./payments')
const purchaseRouter = require('./purchases')

router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/comments', commentRouter)
router.use('/publications', publicationRouter)
router.use('/questions', questionRouter)
router.use('/payments', paymentRouter)
router.use('/answers', answerRouter)
router.use('/purchases', purchaseRouter)

module.exports = router;