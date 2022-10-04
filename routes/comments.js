var express = require('express')
var router = express.Router()
let passport = require("../config/passport");

const { create, all, read, destroy, update } = require('../controllers/commentController')

router.post('/', passport.authenticate("jwt", { session: false }), create)
router.get('/', all)
router.get('/:itineraryid', read)
router.delete('/:id', passport.authenticate("jwt", { session: false }), destroy)
router.patch('/:id', passport.authenticate("jwt", { session: false }), update)

module.exports = router