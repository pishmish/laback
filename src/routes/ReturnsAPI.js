const express = require('express');
const router = express.Router();

//Middleware
const {authenticateToken, authenticateRole} = require('../middleware/auth-handler');

//import controller
const returnsController = require('../controllers/returns');

//Routes


//sample sanity route
router.get('/', (req, res) => {
    res.send('Returns API is working');
});

router.get('/all', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return returnsController.getAllReturns(req, res);
});

router.get('/request/:id', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return returnsController.getRequest(req, res);
});

router.get('/request/:id/status', authenticateToken, (req, res) => {
    return returnsController.getRequestStatus(req, res);
});

router.get('/refund/:id/status', authenticateToken, (req, res) => {
    return returnsController.getRefundStatus(req, res);
});

router.post('/newrequest', authenticateToken, authenticateRole('customer'), (req, res) => {
    return returnsController.newRequest(req, res);
});

router.put('/request/:id', authenticateToken, (req, res) => {
    return returnsController.updateRequest(req, res);
});

router.put('/request/:id/status', authenticateToken, authenticateRole(['salesManager', 'productManager']), (req, res) => {
    return returnsController.updateRequestStatus(req, res);
});

router.delete('/request/:id', authenticateToken, authenticateRole('customer'), (req, res) => {
    return returnsController.deleteRequest(req, res);
});

router.post('/request/:id/authorizepayment', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return returnsController.authorizePayment(req, res);
});

router.get('/request/:id/cost', authenticateToken, (req, res) => {
    return returnsController.getCost(req, res);
});

router.get('/request/customer/:username', authenticateToken, (req, res) => {
    return returnsController.getCustomerRequests(req, res);
});

module.exports = router;
