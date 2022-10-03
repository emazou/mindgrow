var express = require("express");
var router = express.Router();
let passport = require("../config/passport");

const { readAll, signUp, verifyMail, signIn, verifyToken, read, signOut, } = require("../controllers/userController");

router.get("/", readAll);
router.get("/:id", read);
router.get("/verify/:code", verifyMail);
router.get("/token", passport.authenticate("jwt", { session: false }), verifyToken);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.patch("/signout/:id", signOut);

module.exports = router;