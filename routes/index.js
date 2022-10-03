var express = require('express');
var router = express.Router();
const productRouter = require('./products')
const userRouter = require('./users')
const publicationRouter = require('./publications')

router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/publications', publicationRouter)

module.exports = router;