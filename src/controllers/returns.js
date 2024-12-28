const db = require('../config/database');

const getAllReturns = async (req, res) => {
  try {
    let sql = 'SELECT * FROM Returns';
    const [results, fields] = await db.promise().query(sql);
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Failed to get all returns'
    });
  }
}

const getRequest = async (req, res) => {
  try{
    let sql = 'SELECT * FROM Returns WHERE requestID = ?';
    const [results, fields] = await db.promise().query(sql, [req.params.id]);
    return res.status(200).json(results);
  } catch(err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Failed to get request'
    });
  }
}

const getRequestStatus = async (req, res) => {
  try{
    let sql = 'SELECT returnStatus FROM Returns WHERE requestID = ?';
    const [results, fields] = await db.promise().query(sql, [req.params.id]);
    return res.status(200).json(results);
  } catch(err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Failed to get request status'
    });
  }
}

const newRequest = async (req, res) => {
  try{
    //check that productID, quantity, orderID and reason are provided
    if(!req.body.productID || !req.body.quantity || !req.body.reason || !req.body.orderID) {
      return res.status(400).json({
        msg: 'Please provide productID, quantity, orderID and reason'
      });
    }

    //verify that the customer has purchased the product and check the validity of the quantity
    //get the customerID from the token
    let username = req.username;
    let sql2 = 'SELECT customerID FROM Customer WHERE username = ?';
    let [results2, fields2] = await db.promise().query(sql2, [username]);

    //get the customer's orders
    let sql3 = 'SELECT orderID FROM `Order` WHERE customerID = ?';
    let [results3, fields3] = await db.promise().query(sql3, [results2[0].customerID]);

    //verify that the orderID provided is in the customer's orders
    let orderFound = false;
    for(let i = 0; i < results3.length; i++) {
      if(results3[i].orderID === req.body.orderID) {
        orderFound = true;
        break;
      }
    }

    if(!orderFound) {
      return res.status(400).json({
        msg: 'OrderID not found in customer orders'
      });
    }

    //check the order's date and that it doesn't exceed 30 days
    let sql9 = 'SELECT timeOrdered FROM `Order` WHERE orderID = ?';
    let [results9, fields9] = await db.promise().query(sql9, [req.body.orderID]);
    let orderDate = results9[0].timeOrdered;

    let currentDate = new Date();
    let orderDateObj = new Date(orderDate);
    let diffTime = Math.abs(currentDate - orderDateObj);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if(diffDays > 30) {
      return res.status(400).json({
        msg: 'Order exceeds 30 days'
      });
    }

    //verify that the customer bought the product with the given quantity
    let sql4 = 'SELECT productID, quantity FROM OrderOrderItemsProduct WHERE orderID = ?';
    let [results4, fields4] = await db.promise().query(sql4, [req.body.orderID]);
    
    let productFound = false;
    for(let i = 0; i < results4.length; i++) {
      if(results4[i].productID === req.body.productID) {
        productFound = true;
        if(results4[i].quantity < req.body.quantity) {
          return res.status(400).json({
            msg: 'Quantity exceeds the quantity bought'
          });
        }
      }
    }

    if(!productFound) {
      return res.status(400).json({
        msg: 'Product not found in order'
      });
    }

    //check that the customer hasn't already requested a return for the product, and the return status is not complete
    let sql10 = 'SELECT returnStatus FROM Returns WHERE productID = ? AND orderID = ? AND customerID = ?';
    let [results10, fields10] = await db.promise().query(sql10, [req.body.productID, req.body.orderID, results2[0].customerID]);

    if(results10.length > 0) {
      if(results10[0].returnStatus !== 'complete') {
        return res.status(400).json({
          msg: 'Return request already exists, and is being processed'
        });
      }
    }

    //create the request (status is received)
    let sql5 = 'INSERT INTO Returns (productID, quantity, orderID, reason, returnStatus, customerID) VALUES (?, ?, ?, ?, ?, ?)';
    let [results5, fields5] = await db.promise().query(sql5, [req.body.productID, req.body.quantity, req.body.orderID, req.body.reason, 'received', results2[0].customerID]);
    let requestID = results5.insertId;

    //assign a random sales manager to the request
    //find the supplier for the product
    let sql6 = 'SELECT supplierID FROM Product WHERE productID = ?';
    let [results6, fields6] = await db.promise().query(sql6, [req.body.productID]);
    let supplierID = results6[0].supplierID;

    //get all sales managers for the supplier
    let sql7 = 'SELECT username FROM SalesManager WHERE supplierID = ?';
    let [results7, fields7] = await db.promise().query(sql7, [supplierID]);

    //assign randomly
    let randomIndex = Math.floor(Math.random() * results7.length);
    let salesManagerUsername = results7[randomIndex].username;

    let sql8 = 'INSERT INTO SalesManagerApprovesRefundReturn (requestID, salesManagerUsername, approvalStatus) VALUES (?, ?, ?)';
    let [results8, fields8] = await db.promise().query(sql8, [requestID, salesManagerUsername, 'pending']);

    return res.status(200).json({
      msg: 'Request created successfully'
    });
  } catch(err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Failed to create new request'
    });
  }
}

const updateRequest = async (req, res) => {
  try{
    // only allows reasoning updates to the request
    //check that the reasoning is provided
    if(!req.body.reason) {
      return res.status(400).json({
        msg: 'Please provide a reason to update the request'
      });
    }

    let sql = 'UPDATE Returns SET reason = ? WHERE requestID = ?';
    const [results, fields] = await db.promise().query(sql, [req.body.reason, req.params.id]);
    return res.status(200).json({
      msg: 'Request updated successfully'
    });
  } catch(err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Failed to update request'
    });
  }
}

const updateRequestStatus = async (req, res) => {
  try{
    if(!req.body.status) {
      return res.status(400).json({
        msg: 'Please provide a status to update the request'
      });
    }

    if (req.body.status === "complete"){
      return res.status(400).json({
        msg: "you're not allowed to set the status to complete"
      });
    }

    if (req.body.status !== "accepted" && req.body.status !== "awaitingProduct" && req.body.status !== "productReceived"){
      return res.status(400).json({
        msg: "invalid status"
      });
    }

    // If status is productReceived, update product stock
    if (req.body.status === "productReceived") {
      // Get return details
      let sqlReturn = 'SELECT productID, quantity FROM Returns WHERE requestID = ?';
      const [returnDetails] = await db.promise().query(sqlReturn, [req.params.id]);
      
      // Update product stock
      if (returnDetails.length > 0) {
        let updateStockSQL = 'UPDATE Product SET stock = stock + ? WHERE productID = ?';
        await db.promise().query(updateStockSQL, [returnDetails[0].quantity, returnDetails[0].productID]);
      }
    }

    let sql = 'UPDATE Returns SET returnStatus = ? WHERE requestID = ?';
    const [results, fields] = await db.promise().query(sql, [req.body.status, req.params.id]);

    return res.status(200).json({
      msg: 'Request status updated successfully'
    });
  } catch(err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Failed to update request status'
    });
  }
}

const deleteRequest = async (req, res) => {
  try{
    //some logic
    //only allow users to delete return requests that are in the before product received status 
    
    //check that the request belongs to the customer
    let username = req.username;
    let sql1 = 'SELECT customerID FROM Customer WHERE username = ?';
    let [results1, fields1] = await db.promise().query(sql1, [username]);
    let customerID = results1[0].customerID;

    let sql3 = 'SELECT customerID FROM Returns WHERE requestID = ?';
    let [results3, fields3] = await db.promise().query(sql3, [req.params.id]);

    if(results3[0].customerID !== customerID) {
      return res.status(400).json({
        msg: 'Request does not belong to the customer'
      });
    }

    let sql = 'SELECT returnStatus FROM Returns WHERE requestID = ?';
    const [results, fields] = await db.promise().query(sql, [req.params.id]);

    if(results[0].returnStatus === 'productReceived' || results[0].returnStatus === 'complete') {
      return res.status(400).json({
        msg: 'Request cannot be deleted'
      });
    }

    let sql2 = 'DELETE FROM Returns WHERE requestID = ?';
    const [results2, fields2] = await db.promise().query(sql2, [req.params.id]);

    return res.status(200).json({
      msg: 'Request deleted successfully'
    });

  } catch(err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Failed to delete request'
    });
  }
}

const authorizePayment = async (req, res) => {
  try{
    //check that the product is received
    let sql2 = 'SELECT returnStatus FROM Returns WHERE requestID = ?';
    let [results2, fields2] = await db.promise().query(sql2, [req.params.id]);

    if(results2[0].returnStatus !== 'productReceived') {
      return res.status(400).json({
        msg: 'Product has not been received'
      });
    }

    let sql = 'UPDATE SalesManagerApprovesRefundReturn SET approvalStatus = ? WHERE requestID = ?';
    const [results, fields] = await db.promise().query(sql, ['authorized', req.params.id]);

    return res.status(200).json({
      msg: 'Payment authorized'
    });

  } catch(err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Failed to authorize payment'
    });
  }
}

const getCost = async (req, res ) => {
  try{ 
    //check that the request ID is valid
    let sql = 'SELECT * FROM Returns WHERE requestID = ?';
    const [results, fields] = await db.promise().query(sql, [req.params.id]);

    if(results.length === 0) {
      return res.status(400).json({
        msg: 'RequestID not found'
      });
    }
    
    //get the purchase price from order items
    let sql2 = "SELECT purchasePrice from OrderOrderItemsProduct WHERE orderID = ? AND productID = ?";
    const [results2, fields2] = await db.promise().query(sql2, [results[0].orderID, results[0].productID]);

    //calculate the cost
    let cost = results2[0].purchasePrice * results[0].quantity;

    return res.status(200).json({
      cost: cost
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Failed to get cost'
    });
  }
}

const getCustomerRequests = async (req, res) => {
  try{
    //check that the username is valid
    let sql1 = 'SELECT customerID FROM Customer WHERE username = ?';
    let [results1, fields1] = await db.promise().query(sql1, [req.params.username]);

    if(results1.length === 0) {
      return res.status(400).json({
        msg: 'Username not found'
      });
    }

    let sql = 'SELECT * FROM Returns WHERE customerID = ?';
    const [results, fields] = await db.promise().query(sql, [results1[0].customerID]);
    return res.status(200).json({
      requests: results
    });
  } catch(err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Failed to get customer requests'
    });
  }
}

module.exports = {
  getAllReturns,
  getRequest,
  getRequestStatus,
  newRequest,
  updateRequest,
  updateRequestStatus,
  deleteRequest,
  authorizePayment,
  getCost,
  getCustomerRequests
}
