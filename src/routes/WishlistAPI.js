const express = require('express');
const router = express.Router();

// Import wishlist controller
const wishlistController = require('../controllers/wishlist');

// Sample sanity route
router.get('/', (req, res) => {
    res.send('Wishlist API, welcome!');
});

//fetch or create a permanent wishlist using customerID
router.post('/customer/:customerID', (req, res) => {
    return wishlistController.getOrCreateWishlist(req, res);
});

//add product to wishlist (create wishlist if necessary)
router.post('/customer/:customerID/product/:productID', (req, res) => {
    return wishlistController.addProductToWishlist(req, res);
});

//remove product from wishlist
router.delete('/customer/:customerID/product/:productID', (req, res) => {
    return wishlistController.removeProductFromWishlist(req, res);
});

//delete wishlist with wishlistID
router.delete('/customer/:customerID', (req, res) => {
    return wishlistController.deleteWishlist(req, res);
});

//fetch wishlists which contain a specific productID
router.get('/product/:productID', (req, res) => {
    return wishlistController.getWishlistsContainingProduct(req, res);
});

//get wishlist by wishlistID (asssuming it alr exists) (MIGHT BE USELESS FROM FRONTEND POV)
router.get('/:id', (req, res) => {
    return wishlistController.getWishlistByID(req, res);
});

//send a mail to customer with wishlists containing that product which goes on sale (using mailSender in invoiceMaker)
router.post('/sendMail', (req, res) => {
    return wishlistController.sendSaleEmail(req, res);
});

module.exports = router;