const { Product } = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    res.status(200).json({msg: "products testing route"})
}



const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    if (products) {
        res.json(products);
      } else {
        res.status(404).json({ error: "No products found" });
    }
  } catch (error) {
    console.error('Error fetching products:', error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


module.exports = {
    getAllProducts,
    getAllProductsStatic
}
