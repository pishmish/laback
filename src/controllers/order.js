const db = require('../config/database');

const getOrder = async (req, res) => {
}

const getUserOrders = async (req, res) => {
}

const getSupplierOrders = async (req, res) => {

}

const getCourierOrders = async (req, res) => {
}

const getPurchasePrice = async (req, res) => {
  try {
    let orderIDNum = req.param.orderid;
    let productIDNum = req.param.productid;

    let sql = 'SELECT purchasePrice FROM `OrderOrderItemsProduct` WHERE productID = ? AND orderID=?';
    const [results, fields] = await db.promise().query(sql, [productIDNum, orderIDNum]);
    res.status(200).json(results);}
  catch(err)  {
    console.log(err);
    res.status(500).json({msg: "Error retrieving product"});
  }
}

const createOrder = async (req, res) => {
}

const updateOrder = async (req, res) => {
} 

const cancelOrder = async (req, res) => {
}

const updateOrderItems = async (req, res) => {
}

const deleteOrderItems = async (req, res) => {
  
}

module.exports = {
  getOrder,
  getUserOrders,
  getSupplierOrders,
  getCourierOrders,
  getPurchasePrice,
  createOrder,
  updateOrder,
  cancelOrder,
  updateOrderItems,
  deleteOrderItems
}
