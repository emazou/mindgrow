var express = require('express');
var router = express.Router();
let passport = require('../config/passport')
const { allAnswers, createAnswer, getAnswer, modifyAnswer, deleteAnswer } = require('../controllers/answerController')

router.get('/', allAnswers);
router.post('/', passport.authenticate('jwt', {session:false}), createAnswer);
router.get('/:id', getAnswer);
router.delete('/:id', passport.authenticate('jwt', {session:false}), deleteAnswer);
router.patch('/:id', passport.authenticate('jwt', {session:false}), modifyAnswer);

module.exports = router