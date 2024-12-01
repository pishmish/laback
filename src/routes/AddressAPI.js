const express = require('express');
const router = express.Router();

//Middleware
const { authenticateToken, authenticateRole } = require('../middleware/auth-handler');

//import controllers
const addressController = require('../controllers/address');

// Routes

//sample sanity route
router.get('/', (req, res) => {
    res.send('Address API, welcome!');
});

// Section : General Address Routes
// this route is to get addresses associated to orders and billing info, not properly secured, depends on the implementation.
router.get('/id/:addressid', authenticateToken, (req, res) => {
    return addressController.getAddress(req, res);
});

//this is for product manager to find addresses of customers for delivery
router.get('/uname/:username', authenticateToken, authenticateRole('productManager'), (req, res) => {
    return addressController.getUserAddress(req, res);
});

router.get('/personal', authenticateToken, authenticateRole('customer'), (req, res) => {
    return addressController.getPersonalAddress(req, res);
});

router.post('/newaddress', authenticateToken, (req, res) => {
    return addressController.createAddress(req, res);
});

// also not secure, depends on implementation
router.put('/:addressid', authenticateToken, (req, res) => {
    return addressController.updateAddress(req, res);
});

router.delete('/:addressid', authenticateToken, (req, res) => {
    return addressController.deleteAddress(req, res);
});

module.exports = router;


