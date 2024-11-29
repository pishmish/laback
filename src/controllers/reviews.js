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

const createReview = async (req, res) => {
  try {
    const { productID, reviewContent, reviewStars, customerID } = req.body;

    // Validate input
    if (!reviewContent) {
      return res.status(400).json({ msg: 'Please fill in review content' });
    }
    if (!reviewStars) {
      return res.status(400).json({ msg: 'Please fill in review stars' });
    }
    if (!customerID) {
      return res.status(400).json({ msg: 'Please fill in customer ID' });
    }
    if (!productID) {
      return res.status(400).json({ msg: 'Please fill in product ID' });
    }

    // Fetch productSupplierID using productID
    const productSupplierSql = 'SELECT supplierID FROM `Product` WHERE productID = ?';
    const [productSupplierResults] = await db.promise().query(productSupplierSql, [productID]);

    if (productSupplierResults.length === 0) {
      return res.status(404).json({ msg: 'Product Supplier not found for this product' });
    }

    const productSupplierID = productSupplierResults[0].supplierID;
    console.log('Product Supplier ID:', productSupplierID); // Log the product supplier ID

    // Fetch productManagerUsername using supplierID
    const productManagerSql = 'SELECT username FROM `ProductManager` WHERE supplierID = ?';
    const [productManagerResults] = await db.promise().query(productManagerSql, [productSupplierID]);

    if (productManagerResults.length === 0) {
      return res.status(404).json({ msg: 'Product Manager not found for this supplier' });
    }

    // Randomly select one product manager from the list
    const randomIndex = Math.floor(Math.random() * productManagerResults.length);
    const productManagerUsername = productManagerResults[randomIndex].username;
    console.log('Selected Product Manager Username:', productManagerUsername); // Log the selected product manager username

    // Insert review into the Review table
    const sql = 'INSERT INTO `Review` (reviewContent, reviewStars, customerID, productID, productManagerUsername, approvalStatus) VALUES (?, ?, ?, ?, ?, ?)';
    const [results, fields] = await db.promise().query(sql, [reviewContent, reviewStars, customerID, productID, productManagerUsername, 0]);

    res.status(200).json({ msg: 'Review created' });
  } catch (err) {
    console.log('Error creating review:', err); // Log the error
    res.status(500).json({ msg: 'Error creating review' });
  }
};

const updateReview = async (req, res) => {
  try {
    let sql = 'UPDATE `Review` SET reviewContent = ?, reviewStars = ?, customerID = ?, productID = ?, productManagerUsername = ?, approvalStatus = ? WHERE reviewID = ?';
    const [results, fields] = await db.promise().query(sql, [req.body.reviewContent, req.body.reviewStars, req.body.customerID, req.params.id, req.body.productManagerUsername, req.body.approvalStatus, req.params.reviewId]);
    res.status(200).json({msg: "Review updated"});
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error updating review"});
  }
}

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

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};
