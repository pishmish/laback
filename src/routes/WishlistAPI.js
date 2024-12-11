const express = require('express');
const router = express.Router();

// Middleware
const { authenticateToken, authenticateRole } = require('../middleware/auth-handler');

// Import wishlist controller
const wishlistController = require('../controllers/wishlist');

// Sample sanity route
router.get('/', (req, res) => {
    res.send('Wishlist API, welcome!');
});

//fetch or create a permanent wishlist using customerID
router.post('/customer/:customerID', authenticateToken, authenticateRole('customer'), (req, res) => {
    return wishlistController.getOrCreateWishlist(req, res);
});

//add product to wishlist (create wishlist if necessary)
router.post('/customer/:customerID/product/:productID', authenticateToken, authenticateRole('customer'), (req, res) => {
    return wishlistController.addProductToWishlist(req, res);
});

//remove product from wishlist
router.delete('/customer/:customerID/product/:productID', authenticateToken, authenticateRole('customer'), (req, res) => {
    return wishlistController.removeProductFromWishlist(req, res);
});

//delete wishlist with wishlistID
router.delete('/customer/:customerID', authenticateToken, authenticateRole('customer'), (req, res) => {
    return wishlistController.deleteWishlist(req, res);
});

//fetch wishlists which contain a specific productID
router.get('/product/:productID', authenticateToken, (req, res) => {
    return wishlistController.getWishlistsContainingProduct(req, res);
});

//get wishlist by wishlistID (asssuming it alr exists) (MIGHT BE USELESS FROM FRONTEND POV)
router.get('/:id', authenticateToken, (req, res) => {
    return wishlistController.getWishlistByID(req, res);
});

//Assuming that at call time, discount is alr applied to a product
//send a mail to customer with wishlists containing that product which goes on sale (using mailSender in invoiceMaker)
router.post('/sendMail', (req, res) => {
    return wishlistController.sendSaleEmail(req, res);
});

module.exports = router;