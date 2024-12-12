const express = require('express');
const router = express.Router();

//Middleware
const { authenticateToken, authenticateRole } = require('../middleware/auth-handler');

// import controllers
const paymentController = require('../controllers/payment');

// Routes

//samples sanity route
router.get('/', (req, res) => {
    res.send('Payment API, welcome!');
});

// Section : THE payment Processing Route:

router.post('/process', authenticateToken, authenticateRole('customer'), (req, res) => {
    return paymentController.processPayment(req, res);
});

router.post('/refund/:id', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return paymentController.refundPayment(req, res);
});

module.exports = router;
