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

//router.get('/product/supplier/:id', (req, res) => {
//  return productController.getProductBySupplierId(req, res);
//});

router.get('/supplier/:productId', (req, res) => {
  return productController.getSupplierInfoByProductId(req, res);
});

router.get('/product/admin/:username', (req, res) => {
  return productController.getProductForManager(req, res);
});

router.get('/product/:id/image', (req, res) => {
  return productController.getProductImage(req, res);
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

// Section: Categories
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
  //TODO: requires authentication
  return categoryController.updateCategory(req, res);
});

router.delete('/category/:id', (req, res) => {
  //TODO: requires authentication
  return categoryController.deleteCategory(req, res);
});

router.get('/category/:name/products', (req, res) => {
  return categoryController.getCategoryProducts(req, res);
});

//Section : Reviews
router.get('/product/:id/reviews', (req, res) => {
  return reviewsController.getAllReviews(req, res);
});

router.get('/product/:id/reviews/approved', (req, res) => {
  return reviewsController.getApprovedReviews(req, res);
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

router.put('/reviews/:reviewId', (req, res) => {
  //TODO: requires authentication
  return reviewsController.updateReview(req, res);
});

router.delete('/reviews/:reviewId', (req, res) => {
  //TODO: requires authentication
  return reviewsController.deleteReview(req, res);
});

router.get('/reviews/pending/:productManagerUsername', (req, res) => {
  return reviewsController.getPendingReviews(req, res);
});

//Section : Search
router.get('/search', (req, res) => {
  return productController.searchProducts(req, res);
});

//Section : Sort
///can sort by rank as well (relevance)
router.post('/sort', (req, res) => {          //apparently it's a post request coz im not accessing data from db directly
  return productController.sortProducts(req, res);
});

// //search and sort
// router.get('/searchSort', (req, res) => {
//   return productController.searchAndOrSortProducts(req, res);
// });

// //sort by stock ascending
// router.get('/product/sort/stock/asc', (req, res) => {
//   return productController.sortProductsByStockAscending(req, res);
// });

// //sort by stock descending
// router.get('/product/sort/stock/desc', (req, res) => {
//   return productController.sortProductsByStockDescending(req, res);
// });

// //Sort by name ascending
// router.get('/product/sort/name/asc', (req, res) => {
//   return productController.sortProductsByNameAscending(req, res);
// });

// //Sort by name descending
// router.get('/product/sort/name/desc', (req, res) => {
//   return productController.sortProductsByNameDescending(req, res);
// });

// //Sort by unitPrice ascending
// router.get('/product/sort/price/asc', (req, res) => {
//   return productController.sortProductsByPriceAscending(req, res);
// });

// //Sort by unitPrice descending
// router.get('/product/sort/price/desc', (req, res) => {
//   return productController.sortProductsByPriceDescending(req, res);
// });

// //sort by overallRating ascending
// router.get('/product/sort/rating/asc', (req, res) => {
//   return productController.sortProductsByRatingAscending(req, res);
// });

// //sort by overallRating descending
// router.get('/product/sort/rating/desc', (req, res) => {
//   return productController.sortProductsByRatingDescending(req, res);
// });

// //sort by discountPercentage ascending
// router.get('/product/sort/discount/asc', (req, res) => {
//   return productController.sortProductsByDiscountAscending(req, res);
// });

// //sort by discountPercentage descending
// router.get('/product/sort/discount/desc', (req, res) => {
//   return productController.sortProductsByDiscountDescending(req, res);
// });

// //sort by timeListed ascending
// router.get('/product/sort/newProducts/asc', (req, res) => {
//   return productController.sortProductsByTimeListedAscending(req, res);
// });

// //sort by timeListed descending
// router.get('/product/sort/newProducts/desc', (req, res) => {
//   return productController.sortProductsByTimeListedDescending(req, res);
// });

// //sort by brand ascending   -- if you need this for some damn reason, i can see the use case tho
// router.get('/product/sort/brand/asc', (req, res) => {
//   return productController.sortProductsByBrandAscending(req, res);
// });

// //sort by brand descending   -- if you need this for some damn reason
// router.get('/product/sort/brand/desc', (req, res) => {
//   return productController.sortProductsByBrandDescending(req, res);
// });

// //sort by color ascending   -- if you need this for some damn reason
// router.get('/product/sort/color/asc', (req, res) => {
//   return productController.sortProductsByColorAscending(req, res);
// });

// //sort by color descending   -- if you need this for some damn reason
// router.get('/product/sort/color/desc', (req, res) => {
//   return productController.sortProductsByColorDescending(req, res);
// });

// //sort by supplierID ascending   -- if you need this for some damn reason
// router.get('/product/sort/supplier/asc', (req, res) => {
//   return productController.sortProductsBySupplierAscending(req, res);
// });

// //sort by supplierID descending   -- if you need this for some damn reason
// router.get('/product/sort/supplier/desc', (req, res) => {
//   return productController.sortProductsBySupplierDescending(req, res);
// });

// //sort by material ascending   -- if you need this for some damn reason
// router.get('/product/sort/material/asc', (req, res) => {
//   return productController.sortProductsByMaterialAscending(req, res);
// });

// //sort by material descending   -- if you need this for some damn reason
// router.get('/product/sort/material/desc', (req, res) => {
//   return productController.sortProductsByMaterialDescending(req, res);
// });

// //sort by capacityLitres ascending
// router.get('/product/sort/capacity/asc', (req, res) => {
//   return productController.sortProductsByCapacityAscending(req, res);
// });

// //sort by capacityLitres descending
// router.get('/product/sort/capacity/desc', (req, res) => {
//   return productController.sortProductsByCapacityDescending(req, res);
// });

// //sort by warrantyMonths ascending
// router.get('/product/sort/warranty/asc', (req, res) => {
//   return productController.sortProductsByWarrantyAscending(req, res);
// });

// //sort by warrantyMonths descending
// router.get('/product/sort/warranty/desc', (req, res) => {
//   return productController.sortProductsByWarrantyDescending(req, res);
// });

// //sort by popularity ascending
// router.get('/product/sort/popularity/asc', (req, res) => {
//   return productController.sortProductsByPopularityAscending(req, res);
// });

// //sort by popularity descending
// router.get('/product/sort/popularity/desc', (req, res) => {
//   return productController.sortProductsByPopularityDescending(req, res);
// });

//export the router:
module.exports = router;
