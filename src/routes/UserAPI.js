const express = require('express');
const router = express.Router();

//Middleware
const { authenticateToken, authenticateRole } = require('../middleware/auth-handler');

//import controllers
const userController = require('../controllers/user');
const billingController = require('../controllers/billing');
const addressController = require('../controllers/address');

//Routes

//sample sanity route
router.get('/', (req, res) => {
  res.send('User API, welcome!');
});


//Section : User Registration, login, and profile management
router.post('/register', (req, res) => {
  return userController.registerCustomer(req, res);
});

router.post('/login', (req, res) => {
  return userController.loginUser(req, res);
});

router.get('/profile', authenticateToken, authenticateRole('customer'), (req, res) => {
  return userController.getUserProfile(req, res);
});

router.put('/profile', authenticateToken, (req, res) => {
  return userController.updateUserProfile(req, res);
});

router.delete('/removeuser', authenticateToken, (req, res) => {
  return userController.deleteUser(req, res);
});

//Section : User billingInfo management
router.get('/billing', authenticateToken, authenticateRole('customer'), (req, res) => {
  return billingController.getBillingInfo(req, res);
});

router.get('/billing/:id', authenticateToken, authenticateRole('customer'), (req, res) => {
  return billingController.getBillingInfoById(req, res);
});

router.post('/billing', authenticateToken, authenticateRole('customer'), (req, res) => {
  return billingController.createBillingInfo(req, res);
});

router.put('/billing/:id', authenticateToken, authenticateRole('customer'), (req, res) => {
  return billingController.updateBillingInfo(req, res);
});

router.delete('/billing/:id', authenticateToken, authenticateRole('customer'), (req, res) => {
  return billingController.deleteBillingInfo(req, res);
});

//User address management is in AddressAPI.js

//export the router
module.exports = router;

