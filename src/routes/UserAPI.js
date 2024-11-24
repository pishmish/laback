const express = require('express');
const router = express.Router();

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

router.get('/profile', (req, res) => {
  //TODO: requires authentication
  return userController.getUserProfile(req, res);
});

router.put('/profile', (req, res) => {
  //TODO: requires authentication
  return userController.updateUserProfile(req, res);
});

router.delete('/removeuser', (req, res) => {
  //TODO: requires authentication
  return userController.deleteUser(req, res);
});

//Section : User billingInfo management
router.get('/billing', (req, res) => {
  //TODO: requires authentication, derive user id from token
  return billingController.getBillingInfo(req, res);
});

router.get('/billing/:id', (req, res) => {
  //TODO: requires authentication
  return billingController.getBillingInfoById(req, res);
});

router.post('/billing', (req, res) => {
  //TODO: requires authentication
  return billingController.createBillingInfo(req, res);
});

router.put('/billing/:id', (req, res) => {
  //TODO: requires authentication
  return billingController.updateBillingInfo(req, res);
});

router.delete('/billing/:id', (req, res) => {
  //TODO: requires authentication
  return billingController.deleteBillingInfo(req, res);
});

//User address management is in AddressAPI.js

//export the router
module.exports = router;

