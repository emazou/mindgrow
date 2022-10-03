var express = require('express')
var router = express.Router()
let passport = require("../config/passport");

const { create, readAll, read, destroy, update } = require('../controllers/publicationController')

router.post('/', passport.authenticate("jwt", { session: false }), create)
router.get('/', readAll)
router.get('/:id', read)
router.delete('/:id', passport.authenticate("jwt", { session: false }), destroy)
router.patch('/:id', passport.authenticate("jwt", { session: false }), update)

module.exports = router