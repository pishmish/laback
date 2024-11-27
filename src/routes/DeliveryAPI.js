const express = require('express');
const router = express.Router();

// import controller:
const orderController = require('../controllers/order');

// Routes:

//sample sanity route
router.get('/', (req, res) => {
    res.send('Delivery API, welcome!');
  });

router.get('/estimate/:id', (req,res) => {
  return orderController.getEstimatedTimeById(req, res);
});

router.post('/order', (req, res) => {
  return orderController.createOrder(req, res);
});

router.get('/order', (req,res) => {
  return orderController.getAllOrders(req, res);
});

router.get('/order/:id', (req,res) => {
  return orderController.getOrderById(req, res);
});

router.put('/order/status', (req, res) => {
  return orderController.updateDeliveryStatus(req, res);
});

router.delete('/order/:id', (req, res) => {
  return orderController.deleteOrder(req, res);
});

module.exports = router;
