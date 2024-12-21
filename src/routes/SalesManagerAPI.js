const express = require('express');
const router = express.Router();

// import controllers
const discountController = require('../controllers/discount');

// import middleware
const {authenticateToken, authenticateRole} = require('../middleware/auth-handler');

// Routes:

// sample sanity route
router.get('/', (req, res) => {
  res.send('Discount API, welcome!');
});

router.put('/discount/:id', authenticateToken, authenticateRole('salesManager'), (req, res) => {
  return discountController.setDiscount(req, res);
});

module.exports = router;