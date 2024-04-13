const express = require('express');
const router = express.Router();
const {  createCheckoutSession, verifySession } = require('./stripe.controllers'); 

router.post('/create-checkout-session', createCheckoutSession);
router.post('/verify-checkout-session', verifySession);

module.exports = router;
