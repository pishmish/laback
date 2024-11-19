const express = require('express');
const router = express.Router();

// //import controller
const controller = require('../controllers/Store');

// Routes:

//sample sanity route
router.get('/', (req, res) => {
  res.send('Store API, welcome!');
});

//Create example (for inputting in//Read example (Product table)
router.get('/product', (req, res) => {
  return controller.getAllProducts(req, res); //calls the controller function to get all products
});

//export the router:
module.exports = router;
