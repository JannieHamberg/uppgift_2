const express = require('express');
const router = express.Router();
const { saveOrder } = require('./orders.controllers');

router.post('/', saveOrder);

module.exports = router;
