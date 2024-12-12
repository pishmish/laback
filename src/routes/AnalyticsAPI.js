const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics');
const { authenticateToken, authenticateRole } = require('../middleware/auth-handler');

router.get('/', (req, res) => {
    res.send('Analytics API, welcome!');
});

//gets sales data (all products) for each day
router.get('/sales', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getAllSales(req, res);
});

//gets sales data (all products) for each month
router.get('/sales/monthly', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getMonthlySales(req, res);
});

//gets sales data (all products) for each quarter
router.get('/sales/quarterly', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getQuarterlySales(req, res);
});

//gets sales data (all products) for each year
router.get('/sales/yearly', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getYearlySales(req, res);
});

//localhost:5001/analytics/sales/comparison?start1=2024-01-01&end1=2024-12-30&start2=2023-01-01&end2=2023-06-30
//gets the sales comparison between two time periods
router.get('/sales/comparison', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getSalesComparison(req, res);
});

//gets the sales (a specific product) for each day
router.get('/sales/product/:productid', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getProductSales(req, res);
});

//get the sales (a specific product) for each month
router.get('/sales/product/:productid/monthly', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getProductMonthlySales(req, res);
});

//get the sales (a specific product) for each quarter
router.get('/sales/product/:productid/quarterly', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getProductQuarterlySales(req, res);
}); 

//get the sales (a specific product) for each year
router.get('/sales/product/:productid/yearly', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getProductYearlySales(req, res);
});

//gets the sales comparison (a specific product) between two time periods
router.get('/sales/product/:productid/comparison', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getProductSalesComparison(req, res);
});

//CAN BE USED FOR BOTH MAIN CATEGORIES AND SUB CATEGORIES
//gets the sales for a category/subcategory for each day
router.get('/sales/category/:categoryid', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getCategorySales(req, res);
});

//CAN BE USED FOR BOTH MAIN CATEGORIES AND SUB CATEGORIES
//gets the sales for a category/subcategory for each month
router.get('/sales/category/:categoryid/monthly', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getCategoryMonthlySales(req, res);
});

//CAN BE USED FOR BOTH MAIN CATEGORIES AND SUB CATEGORIES
//gets the sales for a category/subcategory for each quarter
router.get('/sales/category/:categoryid/quarterly', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getCategoryQuarterlySales(req, res);
});

//CAN BE USED FOR BOTH MAIN CATEGORIES AND SUB CATEGORIES
//gets the sales for a category/subcategory for each year
router.get('/sales/category/:categoryid/yearly', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getCategoryYearlySales(req, res);
});

//CAN BE USED FOR BOTH MAIN CATEGORIES AND SUB CATEGORIES
//gets the sales comparison for a category/subcategory between two time periods
router.get('/sales/category/:categoryid/comparison', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getCategorySalesComparison(req, res);
});

//scrapped this endpoint as address and deliveryRegion are not connected and thus there is NO REGION FOR SALES
// router.get('/salesbyregion', (req, res) => {
//     return analyticsController.getSalesByRegion(req, res);
// });

//gets the sales for each province
router.get('/salesByProvince', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getSalesByProvince(req, res);
});

//gets the sales for each city
router.get('/salesByCity', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getSalesByCity(req, res);
});

//gets the sales for each country
router.get('/salesByCountry', authenticateToken, authenticateRole('salesManager'), (req, res) => {
    return analyticsController.getSalesByCountry(req, res);
});

//gets the products that are below the stock threshold (set to 10 for now)
router.get('/product/lowStock', authenticateToken, authenticateRole('productManager'), (req, res) => {
    return analyticsController.getLowStockProducts(req, res);
});

//gets top 10 best sellers based on the total units sold
router.get('/product/bestSellers', authenticateToken, authenticateRole('productManager'), (req, res) => {
    return analyticsController.getBestSellers(req, res);
});

//gets top 10 most viewed products based on the popularity
router.get('/product/mostViewed', authenticateToken, authenticateRole('productManager'), (req, res) => {
    return analyticsController.getMostViewedProducts(req, res);
});

//get effectiveness of discount ranges (revenue generated by each discount range)
router.get('/discountEffectiveness', authenticateToken, authenticateRole(['salesManager', 'productManager']), (req, res) => {
    return analyticsController.getDiscountEffectiveness(req, res);
});

//get the top buyers based on the total amount spent
router.get('/user/topBuyers', authenticateToken, authenticateRole(['salesManager', 'productManager']), (req, res) => {
    return analyticsController.getTopBuyers(req, res);
});

//get churn rate(percentage of users who have not made a purchase in the last 12 months)
router.get('/user/churnRate', authenticateToken, authenticateRole(['salesManager', 'productManager']), (req, res) => {
    return analyticsController.getChurnRate(req, res);
});

//NOT POSSIBLE WITH OUR CURRENT SETUP (or very difficult)
// //get the customer engagement data (views, purchases, cart additions wishlist additions, reviews)
// router.get('/user/customerEngagement', (req, res) => {
//     return analyticsController.getCustomerEngagement(req, res);
// });

//get change in quantity / stock of products by product manager for each day
router.get('/inventory', authenticateToken, authenticateRole(['salesManager', 'productManager']), (req, res) => {
    return analyticsController.getInventoryTrend(req, res);
});

//get products that need to be reordered (qty <= 10 units)
router.get('/inventory/reorder', authenticateToken, authenticateRole(['salesManager', 'productManager']), (req, res) => {
    return analyticsController.getReorderNeeds(req, res);
});

//get number of returns, qty sold for each product
router.get('/returns/summary', authenticateToken, authenticateRole(['salesManager', 'productManager']), (req, res) => {
    return analyticsController.getReturnsSummary(req, res);
});

//get count of each reason for return
router.get('/returns/byReason', authenticateToken, authenticateRole(['salesManager', 'productManager']), (req, res) => {
    return analyticsController.getReturnsByReason(req, res);
});

module.exports = router;