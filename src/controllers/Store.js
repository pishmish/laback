require('dotenv').config();
const  db  = require('../config/database');

const getAllProducts = async (req, res) => {

  try {
    let sql = 'SELECT * FROM `Product`';
    const [results, fields] = await db.promise().query(sql);
    res.status(200).json(results);}
  catch(err)  {
    console.log(err);
    res.status(500).json({msg: "Error retrieving products"});
  }
};

module.exports = {
    getAllProducts
}
