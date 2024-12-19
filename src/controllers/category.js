const db = require('../config/database');

const getAllCategories = async (req, res) => {
  // get all categories except the main categories (first 4: Handbags, Backpacks, Luggage, Travel Bags)
  try{
    let sql = 'SELECT * FROM `Category` WHERE `name` NOT IN ("Handbags", "Backpacks", "Luggage", "Travel Bags", "Sports Bags")';
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

const getCategoryProducts = async (req, res) => {
  try {
    //find the category id
    let sql3 = 'SELECT * FROM `Category` WHERE name = ?';
    const [category, fields3] = await db.promise().query(sql3, [req.params.name]);

    if (category.length == 0) {
      return res.status(404).json({msg: "Category not found"});
    }


    //get the products of the category
    let sql2 = 'SELECT * FROM `CategoryCategorizesProduct` WHERE categoryID = ?';
    const [results2, fields2] = await db.promise().query(sql2, [category[0].categoryID]);

    //get the products
    finalResults = [];
    for (let i = 0; i < results2.length; i++) {
      sql = 'SELECT * FROM `Product` WHERE productID = ?';
      const [product, fields] = await db.promise().query(sql, [results2[i].productID]);
      finalResults.push(product[0]);
    }
    return res.status(200).json(finalResults);
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error retrieving products"});
  }
}

module.exports = {
  getAllCategories,
  getCategoryByName,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryProducts
}
