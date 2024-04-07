const express = require('express');
const { listProducts } = require('./products.controllers');
const router = express.Router();

router.get('/products', listProducts);

module.exports = router;