const db = require('../config/database');

const getAllReviews = async (req, res) => {
  try{
    let sql = 'SELECT * FROM `Review` where productID = ?';
    const [results, fields] = await db.promise().query(sql, [req.params.id]);
    res.status(200).json(results);
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error retrieving reviews"});
  }
}

const getApprovedReviews = async (req, res) => {
  try {
    const sql = 'SELECT * FROM `Review` WHERE productID = ? AND approvalStatus = 1';
    const [results, fields] = await db.promise().query(sql, [req.params.id]);
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Error retrieving reviews' });
  }
};

const getReviewById = async (req, res) => {
  try{
    let sql = 'SELECT * FROM `Review` WHERE reviewID = ?';
    const [results, fields] = await db.promise().query(sql, [req.params.reviewId]);
    res.status(200).json(results);
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error retrieving review"});
  }
}

const getOverallRatingById = async (req, res) => {
  try{
    let sql = 'SELECT overallRating FROM `Product` WHERE productID = ?';
    const [results, fields] = await db.promise().query(sql, [req.params.productID]);
    console.log(results);
    res.status(200).json(results);
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error retrieving review"});
  }
}

const createReview = async (req, res) => {
  try {
    const { productID, reviewContent, reviewStars, customerID } = req.body;

    // Validate required inputs
    if (!reviewStars) {
      return res.status(400).json({ msg: 'Please fill in review stars' });
    }
    if (!customerID) {
      return res.status(400).json({ msg: 'Please fill in customer ID' });
    }
    if (!productID) {
      return res.status(400).json({ msg: 'Please fill in product ID' });
    }

    //check if the user has bought the product he's trying to review
    let sql3 = 'SELECT * FROM `Order` WHERE customerID = ?';
    const [results3, fields3] = await db.promise().query(sql3, [customerID]);
    let orderID = results3[0].orderID;

    let sql4 = 'SELECT * FROM `OrderOrderItemsProduct` WHERE orderID = ?';
    const [results4, fields4] = await db.promise().query(sql4, [orderID]);
    let found = false;
    for (let i = 0; i < results4.length; i++) {
      if (results4[i].productID == productID) {
        found = true;
        break;
      }
    }

    if (!found) {
      return res.status(400).json({msg: "You can't review a product you haven't bought"});
    }

    // If no reviewContent, auto-approve without product manager
    if (!reviewContent) {
      const nullReviewContent = '(No written review)';
      const sql = 'INSERT INTO `Review` (reviewContent, reviewStars, customerID, productID, productManagerUsername, approvalStatus) VALUES (?, ?, ?, ?, ?, ?)';
      await db.promise().query(sql, [nullReviewContent, reviewStars, customerID, productID, null, 1]);
      // If review is approved, update product's overall rating

      const getApprovedReviewsSql = 'SELECT reviewStars FROM `Review` WHERE productID = ? AND approvalStatus = 1';
      const [approvedReviews] = await db.promise().query(getApprovedReviewsSql, [productID]);

      if (approvedReviews.length > 0) {
        // Calculate average rating
        const totalStars = approvedReviews.reduce((sum, review) => sum + review.reviewStars, 0);
        const averageRating = (totalStars / approvedReviews.length).toFixed(2);

        // Update product's overall rating
        const updateProductSql = 'UPDATE `Product` SET overallRating = ? WHERE productID = ?';
        await db.promise().query(updateProductSql, [averageRating, productID]);
      }
      return res.status(200).json({ msg: 'Review created and auto-approved' });
    }

    // Regular flow for reviews with content
    const productSupplierSql = 'SELECT supplierID FROM `Product` WHERE productID = ?';
    const [productSupplierResults] = await db.promise().query(productSupplierSql, [productID]);

    if (productSupplierResults.length === 0) {
      return res.status(404).json({ msg: 'Product Supplier not found for this product' });
    }

    const productSupplierID = productSupplierResults[0].supplierID;

    const productManagerSql = 'SELECT username FROM `ProductManager` WHERE supplierID = ?';
    const [productManagerResults] = await db.promise().query(productManagerSql, [productSupplierID]);

    if (productManagerResults.length === 0) {
      return res.status(404).json({ msg: 'Product Manager not found for this supplier' });
    }

    const randomIndex = Math.floor(Math.random() * productManagerResults.length);
    const productManagerUsername = productManagerResults[randomIndex].username;

    const starReviewSql = 'INSERT INTO `Review` (reviewContent, reviewStars, customerID, productID, productManagerUsername, approvalStatus) VALUES (?, ?, ?, ?, ?, ?)';
    await db.promise().query(starReviewSql, ['(No written review)', reviewStars, customerID, productID, null, 1]);

    const messageReviewSql = 'INSERT INTO `Review` (reviewContent, reviewStars, customerID, productID, productManagerUsername, approvalStatus) VALUES (?, ?, ?, ?, ?, ?)';
    await db.promise().query(messageReviewSql, [reviewContent, null, customerID, productID, productManagerUsername, 0]);

    res.status(200).json({ msg: 'Review created' });
  } catch (err) {
    console.log('Error creating review:', err);
    res.status(500).json({ msg: 'Error creating review' });
  }
};

const updateReview = async (req, res) => {
  try {
    // First get the existing review
    const getReviewSql = 'SELECT * FROM `Review` WHERE reviewID = ?';
    const [existingReview] = await db.promise().query(getReviewSql, [req.params.reviewId]);

    if (existingReview.length === 0) {
      return res.status(404).json({ msg: "Review not found" });
    }

    // Merge existing data with updates
    const updatedReview = {
      reviewContent: req.body.reviewContent ?? existingReview[0].reviewContent,
      reviewStars: req.body.reviewStars ?? existingReview[0].reviewStars,
      customerID: req.body.customerID ?? existingReview[0].customerID,
      productID: req.body.productID ?? existingReview[0].productID,
      productManagerUsername: req.body.productManagerUsername ?? existingReview[0].productManagerUsername,
      approvalStatus: req.body.approvalStatus ?? existingReview[0].approvalStatus
    };

    // Update with merged data
    const updateSql = 'UPDATE `Review` SET reviewContent = ?, reviewStars = ?, customerID = ?, productID = ?, productManagerUsername = ?, approvalStatus = ? WHERE reviewID = ?';
    await db.promise().query(updateSql, [
      updatedReview.reviewContent,
      updatedReview.reviewStars,
      updatedReview.customerID,
      updatedReview.productID, 
      updatedReview.productManagerUsername,
      updatedReview.approvalStatus,
      req.params.reviewId
    ]);

    // If review is approved, update product's overall rating
    if (updatedReview.approvalStatus === 1) {
      // Get all approved reviews for this product
      const getApprovedReviewsSql = 'SELECT reviewStars FROM `Review` WHERE productID = ? AND approvalStatus = 1';
      const [approvedReviews] = await db.promise().query(getApprovedReviewsSql, [updatedReview.productID]);

      if (approvedReviews.length > 0) {
        // Calculate average rating
        const totalStars = approvedReviews.reduce((sum, review) => sum + review.reviewStars, 0);
        const averageRating = (totalStars / approvedReviews.length).toFixed(2);

        // Update product's overall rating
        const updateProductSql = 'UPDATE `Product` SET overallRating = ? WHERE productID = ?';
        await db.promise().query(updateProductSql, [averageRating, updatedReview.productID]);
      }
    }

    res.status(200).json({ msg: "Review updated" });
  } catch(err) {
    console.log(err);
    res.status(500).json({ msg: "Error updating review" });
  }
};

const deleteReview = async (req, res) => {
  try {
    let sql = 'DELETE FROM `Review` WHERE reviewID = ?';
    const [results, fields] = await db.promise().query(sql, [req.params.reviewId]);
    res.status(200).json({msg: "Review deleted"});
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error deleting review"});
  }
}

const getPendingReviews = async (req, res) => {
  try {
    // Get productManagerUsername from request parameters
    const { productManagerUsername } = req.params;

    // SQL query to fetch pending reviews for the product manager
    const sql = 'SELECT * FROM `Review` WHERE productManagerUsername = ? AND approvalStatus = 0';
    const [results, fields] = await db.promise().query(sql, [productManagerUsername]);

    // Return results
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Error retrieving pending reviews' });
  }
};

module.exports = {
  getAllReviews,
  getApprovedReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getPendingReviews,
  getOverallRatingById
};
