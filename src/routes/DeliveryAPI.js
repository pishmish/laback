const express = require('express');
const router = express.Router();

//Middleware
const { authenticateToken, authenticateRole } = require('../middleware/auth-handler');

// import controller:
const deliveryController = require('../controllers/delivery');

// Routes:
// TODO: authentication?

//sample sanity route
router.get('/', (req, res) => {
    res.send('Delivery API, welcome!');
});

router.get('/estimate/:id', authenticateToken, (req,res) => {
  return deliveryController.getEstimatedTimeById(req, res);
});

router.put('/estimate/:id', authenticateToken, (req, res) => {
  return deliveryController.updateEstimatedTime(req, res);
});

router.get('/order/courier/:courierid', authenticateToken, (req,res) => {
  return deliveryController.getOrderByCourierId(req, res);
});

router.get('/order/:id', authenticateToken, (req,res) => {
  return deliveryController.getOrderById(req, res);
});

router.put('/order/:id/status', authenticateToken, (req, res) => {
  return deliveryController.updateDeliveryStatus(req, res);
});

router.get('/order/:id/status', authenticateToken, (req, res) => {
  return deliveryController.getDeliveryStatus(req, res);
});

module.exports = router;
