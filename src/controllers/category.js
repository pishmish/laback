const db = require('../config/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../assets/images'));
  },
  filename: function(req, file, cb) {
    const formattedName = req.body.name.toLowerCase().replace(/\s+/g, '-');
    cb(null, formattedName + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const getAllSubCategories = async (req, res) => {
  // get all categories except the main categories (first 4: Handbags, Backpacks, Luggage, Travel Bags)
  try{
    let sql = 'SELECT * FROM `Category` WHERE parentCategoryID != 0';
    const [results, fields] = await db.promise().query(sql);
    res.status(200).json(results);
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error retrieving categories"});
  }
}

const getAllMainCategories = async (req, res) => {
  //gets the main categories only (i.e Handbags, Backpacks, Luggage, Travel Bags, Sports Bags)
  try{
    let sql = 'SELECT * FROM `Category` WHERE parentCategoryID = 0';
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
    upload.single('image')(req, res, async function(err) {
      if (err) {
        return res.status(500).json({ msg: "Error uploading file" });
      }
      
      let sql = 'INSERT INTO `Category` (name, description, parentCategoryID, image) VALUES (?, ?, ?, ?)';
      const imageName = req.file ? req.file.filename : null;
      
      await db.promise().query(sql, [
        req.body.name,
        req.body.description,
        req.body.parentCategoryID,
        imageName
      ]);
      
      res.status(200).json({ msg: "Category created" });
    });
  } catch(err) {
    console.log(err);
    res.status(500).json({ msg: "Error creating category" });
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
    // Get category info first to find image name
    const [category] = await db.promise().query(
      'SELECT * FROM `Category` WHERE categoryID = ?',
      [req.params.id]
    );

    if (category.length > 0 && category[0].image) {
      // Delete image file if it exists
      const imagePath = path.join(__dirname, '../assets/images', category[0].image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete category from database
    let sql = 'DELETE FROM `Category` WHERE categoryID = ?';
    await db.promise().query(sql, [req.params.id]);
    
    res.status(200).json({msg: "Category and image deleted"});
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
  getAllSubCategories,
  getAllMainCategories,
  getCategoryByName,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryProducts
}
