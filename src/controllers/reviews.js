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
    let sql = 'INSERT INTO `Review` (reviewContent, reviewStars, customerID, productID, productManagerUsername, approvalStatus) VALUES (?, ?, ?, ?, ?, ?)';
    const [results, fields] = await db.promise().query(sql, [req.body.reviewContent, req.body.reviewStars, req.body.customerID, req.body.productID, req.body.productManagerUsername, req.body.approvalStatus]);
    res.status(200).json({msg: "Review created"});
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error creating review"});
  }
}

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
