const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Process Payment Route
router.post('/process', paymentController.processPayment);

module.exports = router;
