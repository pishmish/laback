const  db  = require('../config/database');

const getAllProducts = async (req, res) => {

  try {
    //TODO: change select * to only the columns we need
    let sql = 'SELECT * FROM `Product`';
    const [results, fields] = await db.promise().query(sql);
    res.status(200).json(results);}
  catch(err)  {
    console.log(err);
    res.status(500).json({msg: "Error retrieving products"});
  }
};

const getProductById = async (req, res) => {
  try {
    //TODO: change select * to only the columns we need
    id = req.params.id;
    let sql = 'SELECT * FROM `Product` WHERE productID = ?';
    const [results, fields] = await db.promise().query(sql, [id]);
    res.status(200).json(results);}
  catch(err)  {
    console.log(err);
    res.status(500).json({msg: "Error retrieving product"});
  }
}

const createProduct = async (req, res) => {
  try {
    let sql = 'INSERT INTO `Product` (stock ,name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [results, fields] = await db.promise().query(sql, [req.body.stock, req.body.name, req.body.unitPrice, req.body.overallRating, req.body.discountPercentage, req.body.description, req.body.brand, req.body.supplierID, req.body.material, req.body.capacityLitres, req.body.warrantyMonths, req.body.serialNumber, req.body.popularity]);
    res.status(200).json({msg: "Product created"});
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error creating product"});
  }
}

const updateProduct = async (req, res) => {
  //this is a general update function, its meant to be implemented in other functions after user authentication
  try {
    let sql = 'UPDATE `Product` SET stock = ?, name = ?, unitPrice = ?, overallRating = ?, discountPercentage = ?, description = ?, brand = ?, supplierID = ?, material = ?, capacityLitres = ?, warrantyMonths = ?, serialNumber = ?, popularity = ? WHERE productID = ?';
    const [results, fields] = await db.promise().query(sql, [req.body.stock, req.body.name, req.body.unitPrice, req.body.overallRating, req.body.discountPercentage, req.body.description, req.body.brand, req.body.supplierID, req.body.material, req.body.capacityLitres, req.body.warrantyMonths, req.body.serialNumber, req.body.popularity, req.params.id]);
    res.status(200).json({msg: "Product updated"});
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error updating product"});
  }
}

const deleteProduct = async (req, res) => {
  try {
    let sql = 'DELETE FROM `Product` WHERE productID = ?';
    const [results, fields] = await db.promise().query(sql, [req.params.id]);
    res.status(200).json({msg: "Product deleted"});
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error deleting product"});
  }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
