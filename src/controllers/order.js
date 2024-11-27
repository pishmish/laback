const db = require('../config/database');

const getEstimatedTimeById = async (req, res) => {
  try {
    // only returns the id numbers and estimated arrival time
    id = req.params.id;
    let sql = 'SELECT orderID, deliveryID, estimatedArrival FROM `Order` WHERE orderID = ?';
    const [results, fields] = await db.promise().query(sql, [id]);
    res.status(200).json(results);}
  catch(err)  {
    console.log(err);
    res.status(500).json({msg: "Error retrieving estimated delivery times"});
  }
}

const createOrder = async (req, res) => {
  try {
      let sql = 'INSERT INTO `Order` (`orderNumber`, `totalPrice`, `deliveryID`, `deliveryStatus`, `deliveryAddressID`, `estimatedArrival`, `courierID`, `cartID`, `customerID`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const [results, fields] = await db.promise().query(sql, [req.body.orderNumber, req.body.totalPrice, req.body.deliveryID, req.body.deliveryStatus, req.body.deliveryAddressID, req.body.estimatedArrival, req.body.courierID, req.body.cartID, req.body.customerID]);
      res.status(200).json({msg: "Order created"});
  } catch(err) {
      console.log(err);
      res.status(500).json({msg: "Error creating order"});
  }
}

const getOrderById = async (req, res) => {
    try {
      //TODO: change select * to only the columns we need
      id = req.params.id;
      let sql = 'SELECT * FROM `Order` WHERE orderID = ?';
      const [results, fields] = await db.promise().query(sql, [id]);
      res.status(200).json(results);}
    catch(err)  {
      console.log(err);
      res.status(500).json({msg: "Error retrieving order"});
    }
  }

  const getAllOrders = async (req, res) => {
    try {
      //TODO: change select * to only the columns we need
      id = req.params.id;
      let sql = 'SELECT * FROM `Order`';
      const [results, fields] = await db.promise().query(sql);
      res.status(200).json(results);}
    catch(err)  {
      console.log(err);
      res.status(500).json({msg: "Error retrieving order"});
    }
  }

  //update order delivery status
  const updateDeliveryStatus = async (req, res) => {
    try {
      let sql = 'UPDATE `Order` SET deliveryStatus = ? WHERE orderID = ?';
      const [results, fields] = await db.promise().query(sql, [req.body.deliveryStatus, req.params.id]);
      res.status(200).json({msg: "Delivery Status updated"});
    } catch(err) {
      console.log(err);
      res.status(500).json({msg: "Error updating Delivery Status"});
    }
  }

  //delete order by orderID
  const deleteOrder = async (req, res) => {
    try {
      let sql = 'DELETE FROM `Order` WHERE orderID = ?';
      const [results, fields] = await db.promise().query(sql, [req.params.id]);
      res.status(200).json({msg: "Order deleted"});
    } catch(err) {
      console.log(err);
      res.status(500).json({msg: "Error deleting order"});
    }
  }

  module.exports = {
    getEstimatedTimeById,
    createOrder,
    getOrderById,
    getAllOrders,
    updateDeliveryStatus,
    deleteOrder  
  }