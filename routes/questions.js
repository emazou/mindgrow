var express = require('express');
var router = express.Router();
const passport = require('../config/passport')
const { create, readAll, update, destroy } = require('../controllers/questionController')

router.get('/', readAll)
router.post('/', passport.authenticate('jwt', {session:false}), create)
router.patch('/:id', passport.authenticate('jwt', {session:false}), update)
router.delete('/:id', passport.authenticate('jwt', {session:false}), destroy)

module.exports = router;
