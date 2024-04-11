const express = require('express');
const router = express.Router();
const { checkout } = require('./stripe.controllers'); 

router.post('/checkout', checkout);

module.exports = router;
