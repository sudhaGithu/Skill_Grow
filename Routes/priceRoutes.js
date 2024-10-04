const express = require('express');
const router = express.Router();
const priceController = require('../Controllers/priceController');

// Price Routes
router.post('/createPrice', priceController.createPricing);
router.get('/getAllPrices', priceController.getPricing);
router.get('/getPriceById/:id', priceController.getPricingById);
router.put('/updatePrice/:id', priceController.updatePricing);
router.delete('/deletePrice/:id', priceController.deletePricing);

module.exports = router;