var express = require("express");
var router = express.Router();

const { readAll, create, order } = require("../controllers/purchaseController");

router.get("/", readAll);
router.post("/", create);

module.exports = router;