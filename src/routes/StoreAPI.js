const express = require('express');
const router = express.Router();

// //import controllers
const productController = require('../controllers/product');
const categoryController = require('../controllers/category');
const reviewsController = require('../controllers/reviews');

// Routes:

//sample sanity route
router.get('/', (req, res) => {
  res.send('Store API, welcome!');
});


//Section : Products
router.get('/product', (req, res) => {
  return productController.getAllProducts(req, res); //calls the controller function to get all products
});

router.get('/product/:id', (req, res) => {
  return productController.getProductById(req, res);
});

router.post('/product', (req, res) => {
  //TODO: requires authentication
  return productController.createProduct(req, res);
});

router.put('/product/:id', (req, res) => {
  //TODO: requires authentication
  return productController.updateProduct(req, res);
});

router.delete('/product/:id', (req, res) => {
  //TODO: requires authentication
  return productController.deleteProduct(req, res);
});

//Section : Categories
router.get('/category', (req, res) => {
  return categoryController.getAllCategories(req, res);
});

router.get('/category/:name', (req, res) => {
  return categoryController.getCategoryByName(req, res);
});

router.post('/category', (req, res) => {
  //TODO: requires authentication
  return categoryController.createCategory(req, res);
});

router.put('/category/:id', (req, res) => {
  //TODO:: requires authentication
  return categoryController.updateCategory(req, res);
});

router.delete('/category/:id', (req, res) => {
  //TODO: requires authentication
  return categoryController.deleteCategory(req, res);
});

//Section : Reviews
router.get('/product/:id/reviews', (req, res) => {
  return reviewsController.getAllReviews(req, res);
});

router.get('/product/:id/reviews/:reviewId', (req, res) => {
  return reviewsController.getReviewById(req, res);
});

router.post('/product/:id/reviews', (req, res) => {
  //TODO: requires authentication
  return reviewsController.createReview(req, res);
});

router.put('/product/:id/reviews/:reviewId', (req, res) => {
  //TODO: requires authentication
  return reviewsController.updateReview(req, res);
});

router.delete('/reviews/:reviewId', (req, res) => {
  //TODO: requires authentication
  return reviewsController.deleteReview(req, res);
});

//Section : Search
router.get('/search', (req, res) => {
  return productController.searchProducts(req, res);
});

//export the router:
module.exports = router;
