const express = require('express');
const router = express.Router();
const { checkout } = require('./stripe.controllers'); 

router.post('/order', checkout);

module.exports = router;
