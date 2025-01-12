const db = require('../config/database');

const getAllSales = async (req, res) => {
    try {
        const [salesData] = await db.promise().query(`
            SELECT DATE_FORMAT(o.timeOrdered, '%Y-%m-%d') as date, 
                   SUM(ooip.purchasePrice * ooip.quantity) as totalRevenue, 
                   SUM(ooip.quantity) as unitsSold
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            GROUP BY DATE_FORMAT(o.timeOrdered, '%Y-%m-%d')
        `);
        res.status(200).json(salesData);
    } catch (err) {
        console.error('Error fetching all sales:', err);
        res.status(500).send('Error fetching all sales');
    }
};

const getMonthlySales = async (req, res) => {
    try {
        const [monthlySalesData] = await db.promise().query(`
            SELECT DATE_FORMAT(o.timeOrdered, '%Y-%m') as month, 
                   SUM(ooip.purchasePrice*ooip.quantity) as totalRevenue, 
                   SUM(ooip.quantity) as unitsSold
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            GROUP BY DATE_FORMAT(o.timeOrdered, '%Y-%m')
            ORDER BY month
        `);
        res.status(200).json(monthlySalesData);
    } catch (err) {
        console.error('Error fetching monthly sales:', err);
        res.status(500).send('Error fetching monthly sales');
    }
};

const getQuarterlySales = async (req, res) => {
    try {
        const [quarterlySalesData] = await db.promise().query(`
            SELECT 
                CONCAT('Q', quarter, ' ', year) as quarter, 
                SUM(totalRevenue) as totalRevenue, 
                SUM(unitsSold) as unitsSold
            FROM (
                SELECT 
                    QUARTER(o.timeOrdered) as quarter, 
                    YEAR(o.timeOrdered) as year, 
                    SUM(ooip.purchasePrice*ooip.quantity) as totalRevenue, 
                    SUM(ooip.quantity) as unitsSold
                FROM \`Order\` o
                JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
                GROUP BY QUARTER(o.timeOrdered), YEAR(o.timeOrdered)
            ) as subquery
            GROUP BY quarter, year
            ORDER BY year, quarter
        `);
        res.status(200).json(quarterlySalesData);
    } catch (err) {
        console.error('Error fetching quarterly sales:', err);
        res.status(500).send('Error fetching quarterly sales');
    }
};

const getYearlySales = async (req, res) => {
    try {
        const [yearlySalesData] = await db.promise().query(`
            SELECT DATE_FORMAT(o.timeOrdered, '%Y') as year,
                     SUM(ooip.purchasePrice*ooip.quantity) as totalRevenue,
                     SUM(ooip.quantity) as unitsSold
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            GROUP BY DATE_FORMAT(o.timeOrdered, '%Y')
            ORDER BY year
        `);
        res.status(200).json(yearlySalesData);
    } catch (err) {
        console.error('Error fetching yearly sales:', err);
        res.status(500).send('Error fetching yearly sales');
    }
};

const getSalesComparison = async (req, res) => {
    try {
        console.log('req.query:', req.query);
        const { start1, end1, start2, end2 } = req.query;

        if (!start1 || !end1 || !start2 || !end2) {
            return res.status(400).send('Missing required query parameters');
        }

        const [period1Data] = await db.promise().query(`
            SELECT SUM(ooip.purchasePrice * ooip.quantity) as totalRevenue
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            WHERE o.timeOrdered BETWEEN ? AND ?
        `, [start1, end1]);

        const [period2Data] = await db.promise().query(`
            SELECT SUM(ooip.purchasePrice * ooip.quantity) as totalRevenue
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            WHERE o.timeOrdered BETWEEN ? AND ?
        `, [start2, end2]);

        const response = {
            period1: {
                start: start1,
                end: end1,
                totalRevenue: period1Data[0].totalRevenue || 0
            },
            period2: {
                start: start2,
                end: end2,
                totalRevenue: period2Data[0].totalRevenue || 0
            }
        };

        res.status(200).json(response);
    } catch (err) {
        console.error('Error fetching sales comparison:', err);
        res.status(500).send('Error fetching sales comparison');
    }
};

const getProductSales = async (req, res) => {
    try {
        const productID = req.params.productid;
        const [productSalesData] = await db.promise().query(`
            SELECT DATE_FORMAT(o.timeOrdered, '%Y-%m-%d') as date, 
                   SUM(ooip.quantity) as unitsSold, 
                   SUM(ooip.purchasePrice * ooip.quantity) as revenue
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            WHERE ooip.productID = ?
            GROUP BY DATE_FORMAT(o.timeOrdered, '%Y-%m-%d')
        `, [productID]);

        // if (productSalesData.length === 0) {
        //     // If no data is found, produce a default response with revenue as 0
        //     const defaultResponse = [
        //         { date: new Date().toISOString().split('T')[0], unitsSold: 0, revenue: 0 }
        //     ];
        //     return res.status(200).json(defaultResponse);
        // }

        res.status(200).json(productSalesData);
    } catch (err) {
        console.error('Error fetching product sales:', err);
        res.status(500).send('Error fetching product sales');
    }
};

const getProductMonthlySales = async (req, res) => {
    try {
        const productID = req.params.productid;
        const [productMonthlySalesData] = await db.promise().query(`
            SELECT DATE_FORMAT(o.timeOrdered, '%Y-%m') as month, 
                   SUM(ooip.quantity) as unitsSold, 
                   SUM(ooip.purchasePrice * ooip.quantity) as revenue
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            WHERE ooip.productID = ?
            GROUP BY DATE_FORMAT(o.timeOrdered, '%Y-%m')
            ORDER BY month
        `, [productID]);
        res.status(200).json(productMonthlySalesData);
    } catch (err) {
        console.error('Error fetching product monthly sales:', err);
        res.status(500).send('Error fetching product monthly sales');
    }
};

const getProductQuarterlySales = async (req, res) => {
    try {
        const productID = req.params.productid;
        const [productQuarterlySalesData] = await db.promise().query(`
            SELECT 
                CONCAT('Q', quarter, ' ', year) as quarter, 
                SUM(totalRevenue) as totalRevenue, 
                SUM(unitsSold) as unitsSold
            FROM (
                SELECT 
                    QUARTER(o.timeOrdered) as quarter, 
                    YEAR(o.timeOrdered) as year, 
                    SUM(ooip.purchasePrice * ooip.quantity) as totalRevenue, 
                    SUM(ooip.quantity) as unitsSold
                FROM \`Order\` o
                JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
                WHERE ooip.productID = ?
                GROUP BY QUARTER(o.timeOrdered), YEAR(o.timeOrdered)
            ) as subquery
            GROUP BY quarter, year
            ORDER BY year, quarter
        `, [productID]);
        res.status(200).json(productQuarterlySalesData);
    } catch (err) {
        console.error('Error fetching product quarterly sales:', err);
        res.status(500).send('Error fetching product quarterly sales');
    }
};

const getProductYearlySales = async (req, res) => {
    try {
        const productID = req.params.productid;
        const [productYearlySalesData] = await db.promise().query(`
            SELECT DATE_FORMAT(o.timeOrdered, '%Y') as year, 
                   SUM(ooip.quantity) as unitsSold, 
                   SUM(ooip.purchasePrice * ooip.quantity) as revenue
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            WHERE ooip.productID = ?
            GROUP BY DATE_FORMAT(o.timeOrdered, '%Y')
            ORDER BY year
        `, [productID]);
        res.status(200).json(productYearlySalesData);
    } catch (err) {
        console.error('Error fetching product yearly sales:', err);
        res.status(500).send('Error fetching product yearly sales');
    }
};

const getProductSalesComparison = async (req, res) => {
    try {
        const productid = req.params.productid;
        const { start1, end1, start2, end2 } = req.query;

        if (!productid || !start1 || !end1 || !start2 || !end2) {
            return res.status(400).send('Missing required query parameters');
        }

        const [period1Data] = await db.promise().query(`
            SELECT SUM(ooip.purchasePrice * ooip.quantity) as totalRevenue
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            WHERE ooip.productID = ? AND o.timeOrdered BETWEEN ? AND ?
        `, [productid, start1, end1]);

        const [period2Data] = await db.promise().query(`
            SELECT SUM(ooip.purchasePrice * ooip.quantity) as totalRevenue
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            WHERE ooip.productID = ? AND o.timeOrdered BETWEEN ? AND ?
        `, [productid, start2, end2]);

        const response = {
            period1: {
                start: start1,
                end: end1,
                totalRevenue: period1Data[0].totalRevenue || 0
            },
            period2: {
                start: start2,
                end: end2,
                totalRevenue: period2Data[0].totalRevenue || 0
            }
        };

        res.status(200).json(response);
    } catch (err) {
        console.error('Error fetching product sales comparison:', err);
        res.status(500).send('Error fetching product sales comparison');
    }
};

const getCategorySales = async (req, res) => {
    try {
        const categoryID = req.params.categoryid;
        const [categorySalesData] = await db.promise().query(`
            SELECT DATE_FORMAT(o.timeOrdered, '%Y-%m-%d') as date, 
                   SUM(ooip.purchasePrice * ooip.quantity) as totalRevenue, 
                   SUM(ooip.quantity) as unitsSold,
                   c.name as categoryName
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            JOIN Product p ON ooip.productID = p.productID
            JOIN CategoryCategorizesProduct ccp ON p.productID = ccp.productID
            JOIN Category c ON ccp.categoryID = c.categoryID
            WHERE c.categoryID = ?
            GROUP BY DATE_FORMAT(o.timeOrdered, '%Y-%m-%d'), c.name
        `, [categoryID]);
        res.status(200).json(categorySalesData);
    } catch (err) {
        console.error('Error fetching category sales:', err);
        res.status(500).send('Error fetching category sales');
    }
};

const getCategoryMonthlySales = async (req, res) => {
    try {
        const categoryID = req.params.categoryid;
        const [categoryMonthlySalesData] = await db.promise().query(`
            SELECT DATE_FORMAT(o.timeOrdered, '%Y-%m') as month, 
                   SUM(ooip.purchasePrice * ooip.quantity) as totalRevenue, 
                   SUM(ooip.quantity) as unitsSold,
                   c.name as categoryName
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            JOIN Product p ON ooip.productID = p.productID
            JOIN CategoryCategorizesProduct ccp ON p.productID = ccp.productID
            JOIN Category c ON ccp.categoryID = c.categoryID
            WHERE c.categoryID = ?
            GROUP BY DATE_FORMAT(o.timeOrdered, '%Y-%m'), c.name
            ORDER BY month
        `, [categoryID]);
        res.status(200).json(categoryMonthlySalesData);
    } catch (err) {
        console.error('Error fetching category monthly sales:', err);
        res.status(500).send('Error fetching category monthly sales');
    }
};

const getCategoryQuarterlySales = async (req, res) => {
    try {
        const categoryID = req.params.categoryid;
        const [categoryQuarterlySalesData] = await db.promise().query(`
            SELECT 
                CONCAT('Q', quarter, ' ', year) as quarter, 
                SUM(totalRevenue) as totalRevenue, 
                SUM(unitsSold) as unitsSold,
                categoryName
            FROM (
                SELECT 
                    QUARTER(o.timeOrdered) as quarter, 
                    YEAR(o.timeOrdered) as year, 
                    SUM(ooip.purchasePrice * ooip.quantity) as totalRevenue, 
                    SUM(ooip.quantity) as unitsSold,
                    c.name as categoryName
                FROM \`Order\` o
                JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
                JOIN Product p ON ooip.productID = p.productID
                JOIN CategoryCategorizesProduct ccp ON p.productID = ccp.productID
                JOIN Category c ON ccp.categoryID = c.categoryID
                WHERE c.categoryID = ?
                GROUP BY QUARTER(o.timeOrdered), YEAR(o.timeOrdered), c.name
            ) as subquery
            GROUP BY quarter, year, categoryName
            ORDER BY year, quarter
        `, [categoryID]);
        res.status(200).json(categoryQuarterlySalesData);
    } catch (err) {
        console.error('Error fetching category quarterly sales:', err);
        res.status(500).send('Error fetching category quarterly sales');
    }
};

const getCategoryYearlySales = async (req, res) => {
    try {
        const categoryID = req.params.categoryid;
        const [categoryYearlySalesData] = await db.promise().query(`
            SELECT DATE_FORMAT(o.timeOrdered, '%Y') as year, 
                   SUM(ooip.purchasePrice * ooip.quantity) as totalRevenue, 
                   SUM(ooip.quantity) as unitsSold,
                   c.name as categoryName
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            JOIN Product p ON ooip.productID = p.productID
            JOIN CategoryCategorizesProduct ccp ON p.productID = ccp.productID
            JOIN Category c ON ccp.categoryID = c.categoryID
            WHERE c.categoryID = ?
            GROUP BY DATE_FORMAT(o.timeOrdered, '%Y'), c.name
            ORDER BY year
        `, [categoryID]);
        res.status(200).json(categoryYearlySalesData);
    } catch (err) {
        console.error('Error fetching category yearly sales:', err);
        res.status(500).send('Error fetching category yearly sales');
    }
};

const getCategorySalesComparison = async (req, res) => {
    try {
        const categoryid = req.params.categoryid;
        const { start1, end1, start2, end2 } = req.query;

        if (!categoryid || !start1 || !end1 || !start2 || !end2) {
            return res.status(400).send('Missing required query parameters');
        }

        const [period1Data] = await db.promise().query(`
            SELECT SUM(ooip.purchasePrice * ooip.quantity) as totalRevenue
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            JOIN Product p ON ooip.productID = p.productID
            JOIN CategoryCategorizesProduct ccp ON p.productID = ccp.productID
            WHERE ccp.categoryID = ? AND o.timeOrdered BETWEEN ? AND ?
        `, [categoryid, start1, end1]);

        const [period2Data] = await db.promise().query(`
            SELECT SUM(ooip.purchasePrice * ooip.quantity) as totalRevenue
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            JOIN Product p ON ooip.productID = p.productID
            JOIN CategoryCategorizesProduct ccp ON p.productID = ccp.productID
            WHERE ccp.categoryID = ? AND o.timeOrdered BETWEEN ? AND ?
        `, [categoryid, start2, end2]);

        const response = {
            period1: {
                start: start1,
                end: end1,
                totalRevenue: period1Data[0].totalRevenue || 0
            },
            period2: {
                start: start2,
                end: end2,
                totalRevenue: period2Data[0].totalRevenue || 0
            }
        };

        res.status(200).json(response);
    } catch (err) {
        console.error('Error fetching category sales comparison:', err);
        res.status(500).send('Error fetching category sales comparison');
    }
};

// const getSalesByRegion = async (req, res) => {
//     try {
//         const [salesByRegionData] = await db.promise().query(`
//             SELECT dr.name as region, SUM(o.totalPrice) as totalRevenue, SUM(ooip.quantity) as unitsSold
//             FROM \`Order\` o
//             JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
//             JOIN Address a ON o.deliveryAddressID = a.addressID
//             JOIN DeliveryRegion dr ON a.regionID = dr.regionID
//             GROUP BY dr.name
//         `);
//         res.status(200).json(salesByRegionData);
//     } catch (err) {
//         console.error('Error fetching sales by region:', err);
//         res.status(500).send('Error fetching sales by region');
//     }
// };

const getSalesByProvince = async (req, res) => {
    try {
        const [salesByProvinceData] = await db.promise().query(`
            SELECT a.province as region, SUM(ooip.purchasePrice*ooip.quantity) as totalRevenue, SUM(ooip.quantity) as unitsSold
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            JOIN Address a ON o.deliveryAddressID = a.addressID
            GROUP BY a.province
        `);
        res.status(200).json(salesByProvinceData);
    } catch (err) {
        console.error('Error fetching sales by province:', err);
        res.status(500).send('Error fetching sales by province');
    }
};

const getSalesByCity = async (req, res) => {
    try {
        const [salesByCityData] = await db.promise().query(`
            SELECT a.city as region, SUM(ooip.purchasePrice*ooip.quantity) as totalRevenue, SUM(ooip.quantity) as unitsSold
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            JOIN Address a ON o.deliveryAddressID = a.addressID
            GROUP BY a.city
        `);
        res.status(200).json(salesByCityData);
    } catch (err) {
        console.error('Error fetching sales by city:', err);
        res.status(500).send('Error fetching sales by city');
    }
};

const getSalesByCountry = async (req, res) => {
    try {
        const [salesByCountryData] = await db.promise().query(`
            SELECT a.country as region, SUM(ooip.purchasePrice*ooip.quantity) as totalRevenue, SUM(ooip.quantity) as unitsSold
            FROM \`Order\` o
            JOIN OrderOrderItemsProduct ooip ON o.orderID = ooip.orderID
            JOIN Address a ON o.deliveryAddressID = a.addressID
            GROUP BY a.country
        `);
        res.status(200).json(salesByCountryData);
    } catch (err) {
        console.error('Error fetching sales by country:', err);
        res.status(500).send('Error fetching sales by country');
    }
};

const getDiscountEffectiveness = async (req, res) => {
    try {
        const [discountEffectivenessData] = await db.promise().query(`
            SELECT 
                CASE 
                    WHEN discountPercentage BETWEEN 10 AND 20 THEN '10-20%'
                    WHEN discountPercentage BETWEEN 20 AND 30 THEN '20-30%'
                    WHEN discountPercentage BETWEEN 30 AND 40 THEN '30-40%'
                    WHEN discountPercentage BETWEEN 40 AND 50 THEN '40-50%'
                    WHEN discountPercentage BETWEEN 50 AND 60 THEN '50-60%'
                    WHEN discountPercentage BETWEEN 60 AND 70 THEN '60-70%'
                    WHEN discountPercentage BETWEEN 70 AND 80 THEN '70-80%'
                    WHEN discountPercentage BETWEEN 80 AND 90 THEN '80-90%'
                    WHEN discountPercentage BETWEEN 90 AND 100 THEN '90-100%'
                    ELSE '0-10%'
                END as discountRange,
                SUM(ooip.purchasePrice * ooip.quantity) as totalRevenue,
                SUM(ooip.quantity) as unitsSold
            FROM Product p
            JOIN OrderOrderItemsProduct ooip ON p.productID = ooip.productID
            GROUP BY discountRange
        `);
        res.status(200).json(discountEffectivenessData);
    } catch (err) {
        console.error('Error fetching discount effectiveness:', err);
        res.status(500).send('Error fetching discount effectiveness');
    }
};

const getLowStockProducts = async (req, res) => {
    try {
        const [lowStockProducts] = await db.promise().query(`
            SELECT name as productName, stock as stock
            FROM Product
            WHERE stock < ?
        `, [10]); // Assuming 10 is the threshold for low stock
        res.status(200).json(lowStockProducts);
    } catch (err) {
        console.error('Error fetching low stock products:', err);
        res.status(500).send('Error fetching low stock products');
    }
};

const getBestSellers = async (req, res) => {
    try {
        const [bestSellers] = await db.promise().query(`
            SELECT p.name as productName, SUM(ooip.quantity) as unitsSold, SUM(ooip.purchasePrice*ooip.quantity) as revenue
            FROM OrderOrderItemsProduct ooip
            JOIN Product p ON ooip.productID = p.productID
            GROUP BY p.name
            ORDER BY unitsSold DESC
            LIMIT 10
        `);
        res.status(200).json(bestSellers);
    } catch (err) {
        console.error('Error fetching best sellers:', err);
        res.status(500).send('Error fetching best sellers');
    }
};

const getMostViewedProducts = async (req, res) => {
    try {
        const [mostViewedProducts] = await db.promise().query(`
            SELECT name as productName, popularity as views
            FROM Product
            ORDER BY popularity DESC
            LIMIT 10
        `);
        res.status(200).json(mostViewedProducts);
    } catch (err) {
        console.error('Error fetching most viewed products:', err);
        res.status(500).send('Error fetching most viewed products');
    }
};

const getTopBuyers = async (req, res) => {
    try {
        const [topBuyersData] = await db.promise().query(`
            SELECT c.username as customerName, u.email, SUM(o.totalPrice) as totalSpent
            FROM \`Order\` o
            JOIN Customer c ON o.customerID = c.customerID
            JOIN User u ON c.username = u.username
            GROUP BY c.username, u.email
            ORDER BY totalSpent DESC
            LIMIT 10
        `);
        res.status(200).json(topBuyersData);
    } catch (err) {
        console.error('Error fetching top buyers:', err);
        res.status(500).send('Error fetching top buyers');
    }
};

const getChurnRate = async (req, res) => {
    try {
        const [totalCustomers] = await db.promise().query(`
            SELECT COUNT(*) as total
            FROM Customer
        `);

        const [inactiveCustomers] = await db.promise().query(`
            SELECT c.customerID, u.name as customerName, u.email
            FROM Customer c
            LEFT JOIN \`Order\` o ON c.customerID = o.customerID
            LEFT JOIN User u ON c.username = u.username
            WHERE o.orderID IS NULL OR o.timeOrdered < DATE_SUB(NOW(), INTERVAL 1 YEAR)
            GROUP BY c.customerID
        `);

        const churnRate = (inactiveCustomers.length / totalCustomers[0].total) * 100;

        const response = {
            churnRate: churnRate.toFixed(2),
            inactiveCustomers: inactiveCustomers
        };

        res.status(200).json(response);
    } catch (err) {
        console.error('Error fetching churn rate:', err);
        res.status(500).send('Error fetching churn rate');
    }
};

// const getCustomerEngagement = async (req, res) => {
//     try {
//         const [engagementData] = await db.promise().query(`
//             SELECT c.customerID, 
//                    u.name as customerName,
//                    u.email,
//                    COUNT(DISTINCT cc.changeID) as cartChanges, 
//                    COUNT(DISTINCT o.orderID) as purchases, 
//                    COUNT(DISTINCT w.wishlistID) as wishlistAdds
//             FROM Customer c
//             LEFT JOIN User u ON c.username = u.username
//             LEFT JOIN CartChanges cc ON c.customerID = cc.customerID
//             LEFT JOIN \`Order\` o ON c.customerID = o.customerID
//             LEFT JOIN Wishlist w ON c.customerID = w.customerID
//             GROUP BY c.customerID, u.name, u.email
//         `);
//         res.status(200).json(engagementData);
//     } catch (err) {
//         console.error('Error fetching customer engagement:', err);
//         res.status(500).send('Error fetching customer engagement');
//     }
// };

const getInventoryTrend = async (req, res) => {
    try {
        const [inventoryTrendData] = await db.promise().query(`
            SELECT DATE_FORMAT(restockTime, '%Y-%m-%d') as date, SUM(quantity) as totalStockAdded
            FROM ProductManagerRestocksProduct
            GROUP BY DATE_FORMAT(restockTime, '%Y-%m-%d')
            ORDER BY date
        `);
        res.status(200).json(inventoryTrendData);
    } catch (err) {
        console.error('Error fetching inventory trend:', err);
        res.status(500).send('Error fetching inventory trend');
    }
};

const getReorderNeeds = async (req, res) => {
    try {
        const [reorderNeedsData] = await db.promise().query(`
            SELECT p.productID as productID, p.name as productName, p.stock as stockLevel
            FROM Product p
            WHERE p.stock <= 10
        `);
        res.status(200).json(reorderNeedsData);
    } catch (err) {
        console.error('Error fetching reorder needs:', err);
        res.status(500).send('Error fetching reorder needs');
    }
};

const getReturnsSummary = async (req, res) => {
    try {
        const [returnsSummaryData] = await db.promise().query(`
            SELECT p.name as productName, COUNT(r.requestID) as returns, SUM(ooip.quantity) as unitsSold
            FROM Returns r
            JOIN Product p ON r.productID = p.productID
            JOIN OrderOrderItemsProduct ooip ON r.orderID = ooip.orderID AND r.productID = ooip.productID
            GROUP BY p.name
        `);
        res.status(200).json(returnsSummaryData);
    } catch (err) {
        console.error('Error fetching returns summary:', err);
        res.status(500).send('Error fetching returns summary');
    }
};

const getReturnsByReason = async (req, res) => {
    try {
        const [returnsByReasonData] = await db.promise().query(`
            SELECT r.reason, COUNT(r.requestID) as count
            FROM Returns r
            GROUP BY r.reason
        `);
        res.status(200).json(returnsByReasonData);
    } catch (err) {
        console.error('Error fetching returns by reason:', err);
        res.status(500).send('Error fetching returns by reason');
    }
};

const getProfit = async (supplierID) => {
    //from the orderorderitemsproduct table, join with products (supplierID and unitprice), and get all the products with specified supplier ID
    let sql = `
        select p.productID, p.unitPrice, o.purchasePrice, o.quantity, o.orderID
        from Product p, OrderOrderItemsProduct o
        where p.productID = o.productID AND p.supplierID = ?`;
    let [results, fields] = await db.promise().query(sql, [supplierID]);

    //attach time ordered to each item in results
    for(let i = 0; i < results.length; i++) {
        sql = 'select timeOrdered from `Order` where orderID = ?';
        let [timeOrdered, fields] = await db.promise().query(sql, [results[i].orderID]);
        results[i].timeOrdered = timeOrdered[0].timeOrdered;
    }

    return results;
}

const getProfitDaily = async (supplierID) => {
    //calculate profit and loss for each day

    let sales = await getProfit(supplierID);

    for (let i=0; i<sales.length; i++) {
        //check calculate profit (purchase price - 90% of unit price)
        sales[i].profit = sales[i].purchasePrice - (0.9 * sales[i].unitPrice);

        //convert timestamp to string, leaving only yyyy-mm-dd
        sales[i].date = sales[i].timeOrdered.toISOString().split('T')[0];
    }

    //sort sales by date to ensure grouping works correctly
    sales.sort((a,b) => new Date(a.date) - new Date(b.date));

    //group by date
    let profit = [];
    for (let i=0; i<sales.length; ) {
        let date = sales[i].date;
        let totalRevenue = 0;
        let totalCost = 0;
        let unitsSold = 0;
        let totalProfit = 0;

        while (i < sales.length && sales[i].date === date) {
            totalRevenue += sales[i].unitPrice * sales[i].quantity;
            totalCost += sales[i].purchasePrice * sales[i].quantity;
            unitsSold += sales[i].quantity;
            totalProfit += sales[i].profit * sales[i].quantity;
            i++;
        }

        profit.push({
            date: date,
            //totalRevenue: totalRevenue,
            //totalCost: totalCost,
            totalProfit: totalProfit,
            unitsSold: unitsSold
        });
    }

    //round total profit to 2 decimal places
    for (let i=0; i<profit.length; i++) {
        profit[i].totalProfit = profit[i].totalProfit.toFixed(2);
    }

    //check uniqueness of date
    let dates = [];
    for (let i=0; i<profit.length; i++) {
        if (dates.includes(profit[i].date)) {
            console.log("duplicate date: ", profit[i].date);
            throw new Error("duplicate date found");
        } else {
            dates.push(profit[i].date);
        }
    }
    return profit;
}

const getProfitMonthly = async (supplierID) => {
    //calculate profit and loss for each month

    let sales = await getProfit(supplierID);

    for (let i=0; i<sales.length; i++) {
        //check calculate profit (purchase price - 90% of unit price)
        sales[i].profit = sales[i].purchasePrice - (0.9 * sales[i].unitPrice);

        //convert timestamp to string, leaving only yyyy-mm-dd
        sales[i].date = sales[i].timeOrdered.toISOString().split('T')[0];
    }

    //sort sales by date to ensure grouping works correctly
    sales.sort((a,b) => new Date(a.date) - new Date(b.date));

    //group by month
    //find unique months
    let dates = [];
    for (let i=0; i<sales.length; i++) {
        let date = sales[i].date;
        let monthYear = date[0] + date[1] + date[2] + date[3] + date[4] + date[5] + date[6];
        if (!dates.includes(monthYear)) {
            dates.push(monthYear);
        }
    }

    dates = [...new Set(dates)];

    //group by month
    let profit = [];
    for (let i=0; i<dates.length; i++) {
        let totalRevenue = 0;
        let totalCost = 0;
        let unitsSold = 0;
        let totalProfit = 0;

        for (let j=0; j<sales.length; j++) {
            let date = sales[j].date;
            let monthYear = date[0] + date[1] + date[2] + date[3] + date[4] + date[5] + date[6];
            if (monthYear === dates[i]) {
                totalRevenue += sales[j].unitPrice * sales[j].quantity;
                totalCost += sales[j].purchasePrice * sales[j].quantity;
                unitsSold += sales[j].quantity;
                totalProfit += sales[j].profit * sales[j].quantity;
            }
        }

        profit.push({
            month: dates[i],
            //totalRevenue: totalRevenue,
            //totalCost: totalCost,
            totalProfit: totalProfit,
            unitsSold: unitsSold
        });
    }

    //round total profit to 2 decimal places
    for (let i=0; i<profit.length; i++) {
        profit[i].totalProfit = profit[i].totalProfit.toFixed(2);
    }

    //check uniqueness
    let dates2 = [];
    for (let i=0; i<profit.length; i++) {
        if (dates2.includes(profit[i].month)) {
            console.log("duplicate date found", profit[i].month);
            throw new Error("duplicate date found");
        } else {
            dates2.push(profit[i].month);
        }
    }

    return profit;
}

const getProfitQuarterly = async (supplierID) => {
    //calculate profit and loss for each quarter

    let sales = await getProfit(supplierID);

    for (let i=0; i<sales.length; i++) {
        //check calculate profit (purchase price - 90% of unit price)
        sales[i].profit = sales[i].purchasePrice - (0.9 * sales[i].unitPrice);

        //convert timestamp to string, leaving only yyyy-mm-dd
        sales[i].date = sales[i].timeOrdered.toISOString().split('T')[0];
    }

    //sort sales by date to ensure grouping works correctly
    sales.sort((a,b) => new Date(a.date) - new Date(b.date));

    //find unique quarters in format Qx yyyy
    let dates = [];
    for (let i=0; i<sales.length; i++) {
        let date = sales[i].date;
        let quarter = "";
        let month = date[5] + date[6];
        if (month === "01" || month === "02" || month === "03") {
            quarter = "Q1";
        } else if (month === "04" || month === "05" || month === "06") {
            quarter = "Q2";
        } else if (month === "07" || month === "08" || month === "09") {
            quarter = "Q3";
        } else {
            quarter = "Q4";
        }

        dates.push(quarter + " " + date[0] + date[1] + date[2] + date[3]);
    }

    dates = [...new Set(dates)];
    
    //group by quarter
    let profit = [];
    for (let i=0; i<dates.length; i++) {
        let totalRevenue = 0;
        let totalCost = 0;
        let totalProfit = 0;
        let unitsSold = 0;

        for (let j=0; j<sales.length; j++) {
            let date = sales[j].date;
            let quarter = "";
            let month = date[5] + date[6];
            if (month === "01" || month === "02" || month === "03") {
                quarter = "Q1";
            } else if (month === "04" || month === "05" || month === "06") {
                quarter = "Q2";
            } else if (month === "07" || month === "08" || month === "09") {
                quarter = "Q3";
            } else {
                quarter = "Q4";
            }

            if (dates[i] === quarter + " " + date[0] + date[1] + date[2] + date[3]) {
                totalRevenue += sales[j].unitPrice * sales[j].quantity;
                totalCost += sales[j].purchasePrice * sales[j].quantity;
                unitsSold += sales[j].quantity;
                totalProfit += sales[j].profit * sales[j].quantity;
            }
        }

        profit.push({
            quarter: dates[i],
            //totalRevenue: totalRevenue,
            //totalCost: totalCost,
            totalProfit: totalProfit,
            unitsSold: unitsSold
        });
    }

    //round total profit to 2 decimal places
    for (let i=0; i<profit.length; i++) {
        profit[i].totalProfit = profit[i].totalProfit.toFixed(2);
    }

    //check uniqueness
    let dates2 = [];
    for (let i=0; i<profit.length; i++) {
        if (dates2.includes(profit[i].quarter)) {
            console.log("duplicate date found", profit[i].quarter);
            throw new Error("duplicate date found");
        } else {
            dates2.push(profit[i].quarter);
        }
    }

    return profit;
}

const getProfitYearly = async (supplierID) => {
    //calculate profit and loss for each year

    let sales = await getProfit(supplierID);

    for (let i=0; i<sales.length; i++) {
        //check calculate profit (purchase price - 90% of unit price)
        sales[i].profit = sales[i].purchasePrice - (0.9 * sales[i].unitPrice);

        //convert timestamp to string, leaving only yyyy-mm-dd
        sales[i].date = sales[i].timeOrdered.toISOString().split('T')[0];
    }

    //sort sales by date to ensure grouping works correctly
    sales.sort((a,b) => new Date(a.date) - new Date(b.date));

    //find unique years
    let dates = [];
    for (let i=0; i<sales.length; i++) {
        let date = sales[i].date;
        let year = date[0] + date[1] + date[2] + date[3];
        if (!dates.includes(year)) {
            dates.push(year);
        }
    }

    //group by year
    let profit = [];
    for (let i=0; i<dates.length; i++) {
        let totalRevenue = 0;
        let totalCost = 0;
        let totalProfit = 0;
        let unitsSold = 0;

        for (let j=0; j<sales.length; j++) {
            let date = sales[j].date;
            let year = date[0] + date[1] + date[2] + date[3];
            if (year === dates[i]) {
                totalRevenue += sales[j].unitPrice * sales[j].quantity;
                totalCost += sales[j].purchasePrice * sales[j].quantity;
                unitsSold += sales[j].quantity;
                totalProfit += sales[j].profit * sales[j].quantity;
            }
        }

        profit.push({
            year: dates[i],
            //totalRevenue: totalRevenue,
            //totalCost: totalCost,
            totalProfit: totalProfit,
            unitsSold: unitsSold
        });
    }

    //round total profit to 2 decimal places
    for (let i=0; i<profit.length; i++) {
        profit[i].totalProfit = profit[i].totalProfit.toFixed(2);
    }

    //check uniqueness
    let dates2 = [];
    for (let i=0; i<profit.length; i++) {
        if (dates2.includes(profit[i].year)) {
            console.log("duplicate date found", profit[i].year);
            throw new Error("duplicate date found");
        } else {
            dates2.push(profit[i].year);
        }
    }

    return profit;
}


const getProfitLoss = async (req, res) => {
    try{
        //revenue is 10% of the sales
    
        //check if period is provided
        console.log("req.params.period", req.params.period)
        if (req.params.period !== "daily" && req.params.period !== "monthly" && req.params.period !== "quarterly" && req.params.period !== "yearly") {
            return res.status(400).send("Invalid period");
        }

        //get the sales data
        let salesData;

        //get supplier ID
        let sql = 'SELECT supplierID from SalesManager where username = ?';
        let [results, fields] = await db.promise().query(sql, [req.username]);
        let supplierID = results[0].supplierID;


        if (req.params.period === "daily") {
            salesData = await getProfitDaily(supplierID);
        }

        if (req.params.period === "monthly") {
            salesData = await getProfitMonthly(supplierID);
        }

        if (req.params.period === "quarterly") {
            salesData = await getProfitQuarterly(supplierID);
        }

        if (req.params.period === "yearly") {
            salesData = await getProfitYearly(supplierID);
        }

        res.status(200).json(salesData);

    } catch(err) {
        console.error("Error calculating profit/loss, ", err);
        res.status(500).send("failed to calculate profit/loss")
    }
}

module.exports = {
    getAllSales,
    getMonthlySales,
    getQuarterlySales,
    getYearlySales,
    getSalesComparison,
    getProductSales,
    getProductMonthlySales,
    getProductQuarterlySales,
    getProductYearlySales,
    getProductSalesComparison,
    getProfitLoss,
    // getSalesByRegion,
    getSalesByProvince,
    getSalesByCity,
    getSalesByCountry,
    getCategorySales,
    getCategoryMonthlySales,
    getCategoryQuarterlySales,
    getCategoryYearlySales,
    getCategorySalesComparison,
    getLowStockProducts,
    getBestSellers,
    getMostViewedProducts,
    getTopBuyers,
    getChurnRate,
    // getCustomerEngagement
    getInventoryTrend,
    getReorderNeeds,
    getReturnsSummary,
    getReturnsByReason,
    getDiscountEffectiveness
};
