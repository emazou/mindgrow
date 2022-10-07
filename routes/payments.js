var express = require('express')
var router = express.Router()
// let passport = require("../config/passport");

const PaymentController = require('../controllers/PaymentController');
const PaymentService = require('../services/PaymentsService');
const PaymentInstance = new PaymentController(new PaymentService());

router.get('/', function (req, res) {
    PaymentInstance.getPaymentLink(req, res);
});

router.get('/subscription', function (req, res) {
    PaymentInstance.getSubscriptionLink(req, res);
});

module.exports = router