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
// Validate input
//if (!reviewContent || !reviewStars || !customerID || !productID || !approvalStatus) {
//  return res.status(400).json({ msg: 'Please fill in all fields' });
//}

const createReview = async (req, res) => {
  try {
    const { reviewContent, reviewStars, customerID, productID, approvalStatus } = req.body;

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
if (!approvalStatus) {
  return res.status(400).json({ msg: 'Please fill in approval status' });
}

    // Fetch productManagerUsername using productID
    const productManagerSql = 'SELECT productManagerUsername FROM `ProductManagerRestocksProduct` WHERE productID = ?';
    const [productManagerResults] = await db.promise().query(productManagerSql, [productID]);

    if (productManagerResults.length === 0) {
      return res.status(404).json({ msg: 'Product Manager not found for this product' });
    }

    const productManagerUsername = productManagerResults[0].productManagerUsername;

    // Insert review into the Review table
    const sql = 'INSERT INTO `Review` (reviewContent, reviewStars, customerID, productID, productManagerUsername, approvalStatus) VALUES (?, ?, ?, ?, ?, ?)';
    const [results, fields] = await db.promise().query(sql, [reviewContent, reviewStars, customerID, productID, productManagerUsername, approvalStatus]);

    res.status(200).json({ msg: 'Review created' });
  } catch (err) {
    console.log(err);
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
