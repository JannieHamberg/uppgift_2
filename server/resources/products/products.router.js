const express = require('express');
const { fetchProducts } = require('./products.controllers');
const router = express.Router();

router.get('/', fetchProducts  );

module.exports = router;