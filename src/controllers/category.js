const db = require('../config/database');

const getAllCategories = async (req, res) => {
  try{
    let sql = 'SELECT * FROM `Category`';
    const [results, fields] = await db.promise().query(sql);
    res.status(200).json(results);
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error retrieving categories"});
  }
}

const getCategoryByName = async (req, res) => {
  try{
    let sql = 'SELECT * FROM `Category` WHERE name = ?';
    const [results, fields] = await db.promise().query(sql, [req.params.name]);
    res.status(200).json(results);
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error retrieving category"});
  }
}

const createCategory = async (req, res) => {
  try {
    let sql = 'INSERT INTO `Category` (name, description) VALUES (?, ?)';
    const [results, fields] = await db.promise().query(sql, [req.body.name, req.body.description]);
    res.status(200).json({msg: "Category created"});
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error creating category"});
  }
}

const updateCategory = async (req, res) => {
  try {
    let sql = 'UPDATE `Category` SET name = ?, description = ? WHERE categoryID = ?';
    const [results, fields] = await db.promise().query(sql, [req.body.name, req.body.description, req.params.id]);
    res.status(200).json({msg: "Category updated"});
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error updating category"});
  }
}

const deleteCategory = async (req, res) => {
  try {
    let sql = 'DELETE FROM `Category` WHERE categoryID = ?';
    const [results, fields] = await db.promise().query(sql, [req.params.id]);
    res.status(200).json({msg: "Category deleted"});
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error deleting category"});
  }
}

module.exports = {
  getAllCategories,
  getCategoryByName,
  createCategory,
  updateCategory,
  deleteCategory
}
