const express = require('express');
const router = express.Router();

// Import cart controller
const cartController = require('../controllers/cart');
const cartContainsProductController = require('../controllers/cartContainsProduct'); // Yeni controller import

// Sample sanity route
router.get('/', (req, res) => {
    res.send('Cart API, welcome!');
});

// Fetch or create a temporary cart using cookies
router.post('/fetch', (req, res) => {
    return cartController.getOrCreateCart(req, res);
});

// Add product to cart (creation or insertion) using cookies (while creating a new cart if necessary)
router.post('/product/:productID', (req, res) => {
    return cartController.addProductToCart(req, res);
});

// Update product quantity (decrement or deletion) in cart using cookies
router.put('/product/:productID', (req, res) => {
    return cartController.removeProductFromCart(req, res);
});

// Delete product from cart using cookies
router.delete('/product/:productID', (req, res) => {
    return cartController.deleteProductFromCart(req, res);
});

//merge cart
router.post('/merge/:customerID', (req, res) => {
    return cartController.mergeCartsOnLogin(req, res);
});

//delete permanent cart if it is empty on logout
router.put('/permanent/:customerID', (req, res) => {
    return cartController.deletePermanentCartOnLogout(req, res);
});

// Fetch products in the cart
router.get('/products', (req, res) => {
    return cartContainsProductController.getCartProducts(req, res);
});

module.exports = router;
