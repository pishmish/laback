const express = require('express');
const router = express.Router();

//Middleware
const { authenticateToken, authenticateRole } = require('../middleware/auth-handler');

//import controllers
const orderController = require('../controllers/order');

// Routes

//samples sanity route
router.get('/', (req, res) => {
    res.send('Order API, welcome!');
});

// Section : General Order Routes

router.get('/getorder/:id', authenticateToken, (req, res) => {
    return orderController.getOrder(req, res);
});

router.get('/getorder/date', authenticateToken, (req, res) => {
    return orderController.getOrdersByDateRange(req, res);
});

router.get('/getallorders',authenticateToken, authenticateRole('productManager'),(req, res)=> {
    return orderController.getAllOrder(req, res);
})
router.get('/user', authenticateToken, authenticateRole('customer'), (req, res) => {
    return orderController.getUserOrders(req, res);
});

router.get('/supplier', authenticateToken, authenticateRole('productManager'), (req, res) => {
    return orderController.getSupplierOrders(req, res);
});

router.get('/purchaseprice/:orderid/:productid', authenticateToken, (req, res) => {
    return orderController.getPurchasePrice(req, res);
});

router.post('/neworder', authenticateToken, authenticateRole('customer'), (req, res) => {
    return orderController.createOrder(req, res);
});

router.put('/updateorder/:id', authenticateToken, (req, res) => {
    return orderController.updateOrder(req, res);
});

router.put('/cancelorder/:id', authenticateToken, authenticateRole('customer'), (req, res) => {
    return orderController.cancelOrder(req, res);
});

router.put('/orderitems/:id', authenticateToken, (req, res) => {
    return orderController.updateOrderItems(req, res);
});

router.delete('/orderitems/:id', authenticateToken, (req, res) => {
    return orderController.deleteOrderItems(req, res);
});

module.exports = router;
