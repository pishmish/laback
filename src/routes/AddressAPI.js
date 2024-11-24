const express = require('express');
const router = express.Router();

//import controllers
const addressController = require('../controllers/address');

// Routes

// Section : General Address Routes
router.get('/:addressid', (req, res) => {
    //TODO: require authentication
    return addressController.getAddress(req, res);
});

router.get('/:userid', (req, res) => {
    //TODO: require authentication
    return addressController.getUserAddress(req, res);
});

router.post('/newaddress', (req, res) => {
    //TODO: require authentication
    return addressController.createAddress(req, res);
});

router.put('/:addressid', (req, res) => {
    //TODO: require authentication
    return addressController.updateAddress(req, res);
});

router.delete('/:addressid', (req, res) => {
    //TODO: require authentication
    return addressController.deleteAddress(req, res);
});
