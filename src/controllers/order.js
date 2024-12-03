const db = require('../config/database');

const getOrder = async (req, res) => {
  try {
    let id = req.params.id;

    //get order details from Order table (without items)
    let sql = 'SELECT * FROM `Order` WHERE orderID = ?';
    const [results1, fields1] = await db.promise().query(sql, [id]);
    console.log("Order details retrieved");

    //get order items
    let sql2 = 'SELECT * FROM `OrderOrderItemsProduct` WHERE orderID = ?';
    const [results2, fields2] = await db.promise().query(sql2, [id]);
    console.log("Order items retrieved");

    //put product names in json result in results2
    for (let i = 0; i < results2.length; i++) {
      let sql3 = 'SELECT name FROM Product WHERE productID = ?';
      const [results3, fields3] = await db.promise().query(sql3, [results2[i].productID]);
      results2[i].productName = results3[0].name;
    }

    // Concatenate the results
    if (results1.length > 0) {
      results1[0].orderItems = results2;
    }


    //return the concatenated results
    res.status(200).json(results1[0]);

  } catch (err) {
    console.log(err);
    res.status(500).json({msg: "Error retrieving order"});
  }
}
const getAllOrder = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = 'SELECT * FROM `Order` ORDER BY timeOrdered';
    const [results, fields] = await db.promise().query(sql, [id]);
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: "Error retrieving order"});
  }
}
const getUserOrders = async (req, res) => {
  try {
    let username = req.username;

    //find the customer ID based on his username
    let sql = 'SELECT customerID FROM Customer WHERE username = ?';
    const [results1, fields1] = await db.promise().query(sql, [username]);

    if (results1.length === 0) {
      res.status(404).json({msg: "User not found"});
      return;
    }

    let customerID = results1[0].customerID;
    
    let sql2 = 'SELECT * FROM `Order` WHERE customerID = ?';
    const [results2, fields2] = await db.promise().query(sql2, [customerID]);
    res.status(200).json(results2);
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: "Error retrieving orders"});
  }
}

const getOrderItemsById = async (orderItems, orderID) => {
  let result = [];
  for (let i = 0; i < orderItems.length; i++) {
    for (let j = 0; j < orderItems[i].length; j++) {
      if (orderItems[i][j].orderID === orderID) {
        result.push(orderItems[i][j]);
      }
    }
  }
  return result;
}

const getOrderAdress = async (addressID) => {
  let sql = 'SELECT * FROM Address WHERE addressID = ?';
  const [results, fields] = await db.promise().query(sql, [addressID]);
  return results[0];
}

const fancyGymanstics = async (supplierID) => {
  //find the products related to the supplier
  let sql = 'SELECT productID FROM Product WHERE supplierID = ?';
  const [results, fields] = await db.promise().query(sql, [supplierID]);

  //for the products in the orderitems table
  let sql2 = 'SELECT * FROM OrderOrderItemsProduct WHERE productID = ?';
  let orderItems = [];
  for (let i = 0; i < results.length; i++) {
    const [results2, fields2] = await db.promise().query(sql2, [results[i].productID]);
    if (results2.length > 0)
    {
    orderItems.push(results2);
    }
  }

  //get the unique order ids
  let orderIDs = [];
  for (let i = 0; i < orderItems.length; i++) {
    for (let j = 0; j < orderItems[i].length; j++) {
      if (!orderIDs.includes(orderItems[i][j].orderID)) {
        orderIDs.push(orderItems[i][j].orderID);
      }
    }
  }
  
  //get the order details
  let orderDetails = [];
  for (let i=0; i<orderIDs.length; i++) {
    let sql3 = 'SELECT orderID, timeOrdered, totalPrice, deliveryID, deliveryStatus, deliveryAddressID, courierID FROM `Order` WHERE orderID = ?';
    const [results3, fields3] = await db.promise().query(sql3, [orderIDs[i]]);
    orderDetails.push(results3[0]);
  }

  //prepare results
  let finalresults = [];
  for (let i=0; i<orderDetails.length; i++) {
    let orderItems2 = [];
    orderItems2 = await getOrderItemsById(orderItems, orderDetails[i].orderID);
    let address = await getOrderAdress(orderDetails[i].deliveryAddressID);
    
    //delete addressID from orderDetails
    delete orderDetails[i].deliveryAddressID;

    finalresults.push({"order": orderDetails[i],  "deliveryAddress": address, "orderItems": orderItems2});
  }

  //return 
  return finalresults;
}

const getSupplierOrders = async (req, res) => {
  try {
    let username = req.username;

    //find the supplier ID based on the productManager's username
    let sql = 'SELECT supplierID FROM ProductManager WHERE username = ?';
    const [results1, fields1] = await db.promise().query(sql, [username]);

    if (results1.length === 0) {
      res.status(404).json({msg: "Product Manager not found"});
      return;
    }

    let supplierID = results1[0].supplierID;
    let results = await fancyGymanstics(supplierID);
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: "Error retrieving orders"});
  }
}

const getPurchasePrice = async (req, res) => {
  try {
    let orderIDNum = req.params.orderid;
    let productIDNum = req.params.productid;

    let sql = 'SELECT purchasePrice FROM `OrderOrderItemsProduct` WHERE productID = ? AND orderID=?';
    const [results, fields] = await db.promise().query(sql, [productIDNum, orderIDNum]);
    res.status(200).json(results);}
  catch(err)  {
    console.log(err);
    res.status(500).json({msg: "Error retrieving product"});
  }
}

const validateAddress = (address) => {
  //Validate Address
  if (!address.country || !address.city || !address.zipCode || !address.streetAddress) {
    return false;
  }
  return true;
}

const getAWeekFromNow = () => {
  let today = new Date();
  let nextWeek = new Date(today.getDate() + 7);

  //Format in yyyy-mm-dd
  let day = nextWeek.getDate();
  let month = nextWeek.getMonth() + 1;
  let year = nextWeek.getFullYear();
  let formattedDate = year + '-' + month + '-' + day;

  return formattedDate;
}

const createOrder = async (req, res) => {
  try{
    //Assumes the billing information has been added and the payment is done already.

    //add address to address table
    if (!validateAddress(req.body.address)) {
      res.status(400).json({msg: "Invalid address"});
      return;
    }

    //set address title to "Delivery Address"
    req.body.address.title = "Delivery Address";

    //insert address
    let sql0 = 'INSERT INTO Address (country, city, zipCode, streetAddress, addressTitle) VALUES (?, ?, ?, ?, ?)';
    const [results0, fields0] = await db.promise().query(sql0, [req.body.address.country, req.body.address.city, req.body.address.zipCode, req.body.address.streetAddress, req.body.address.title]);
    let addressID = results0.insertId;

    //get username then customer ID from the authentication cookie
    let username = req.username;
    let sql = 'SELECT customerID FROM Customer WHERE username = ?';
    const [results, fields] = await db.promise().query(sql, [username]);
    let customerID = results[0].customerID;

    //get cartID using customer ID
    let sql2 = 'SELECT * FROM Cart WHERE customerID = ?';
    const [results2, fields2] = await db.promise().query(sql2, [customerID]);
    let cartID = results2[0].cartID;
    let totalPrice = results2[0].totalPrice;

    //get cart items
    let cartItems = [];
    let sql3 = 'SELECT * FROM CartContainsProduct WHERE cartID = ?';
    const [results3, fields3] = await db.promise().query(sql3, [cartID]);
    cartItems = results3;

    //create order
    let orderNumber = Math.floor(Math.random() * 1000000000);
    let deliveryID = Math.floor(Math.random() * 1000000000);
    let deliveryStatus = "Processing";
    let esimtatedArrival = getAWeekFromNow();

    let sql4 = 'INSERT INTO `Order` (orderNumber, totalPrice, deliveryID, deliveryStatus, deliveryAddressID, estimatedArrival, customerID) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [results4, fields4] = await db.promise().query(sql4, [orderNumber, totalPrice, deliveryID, deliveryStatus, addressID, esimtatedArrival, customerID]);
    console.log("Order table entry created");

    //add cart items to orderitems table and update product stocks
    let orderID = results4.insertId;
    for (let i = 0; i < cartItems.length; i++) {
      //Get current product Price
      let sql6 = 'SELECT unitPrice FROM Product WHERE productID = ?';
      const [results6, fields6] = await db.promise().query(sql6, [cartItems[i].productID]);
      let purchasePrice = results6[0].unitPrice;

      //Update current product stock
      let sql7 = 'UPDATE Product SET stock = stock - ? WHERE productID = ?';
      const [results7, fields7] = await db.promise().query(sql7, [cartItems[i].quantity, cartItems[i].productID]);

      //Insert into OrderOrderItemsProduct
      let sql5 = 'INSERT INTO OrderOrderItemsProduct (orderID, productID, quantity, purchasePrice) VALUES (?, ?, ?, ?)';
      const [results5, fields5] = await db.promise().query(sql5, [orderID, cartItems[i].productID, cartItems[i].quantity, purchasePrice]);
    }
    console.log("Order items created and stocks updated");

    //delete cart
    let sql8 = 'DELETE FROM Cart WHERE cartID = ?';
    const [results8, fields8] = await db.promise().query(sql8, [cartID]);
    console.log("Cart deleted");

    console.log("Order created");
    res.status(200).json({
      msg: "Order created",
      orderID: orderID});
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: "Error creating order"});
  }
}

const updateOrder = async (req, res) => {
  try {
    //To update Order details, not order items.
    //can update deliveryAddress and courierID
    let orderID = req.params.id;
    if(req.body.address) {
      if (!validateAddress(req.body.address)) {
        res.status(400).json({msg: "Invalid address"});
        return;
      }

      //insert address
      let addressTitle = "Updated Delivery address for Order " + orderID;
      let sql0 = 'INSERT INTO Address (country, city, zipCode, streetAddress, addressTitle) VALUES (?, ?, ?, ?, ?)';
      const [results0, fields0] = await db.promise().query(sql0, [req.body.address.country, req.body.address.city, req.body.address.zipCode, req.body.address.streetAddress, addressTitle]);
      let addressID = results0.insertId;

      //update order
      let sql = 'UPDATE `Order` SET deliveryAddressID = ? WHERE orderID = ?';
      const [results, fields] = await db.promise().query(sql, [addressID, orderID]);
    }

    if(req.body.courierID) {
      let sql2 = 'UPDATE `Order` SET courierID = ? WHERE orderID = ?';
      const [results2, fields2] = await db.promise().query(sql2, [req.body.courierID, orderID]);
    }

    res.status(200).json({msg: "Order updated"});
    
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: "Error updating order"});
  }
} 

const cancelOrder = async (req, res) => {
  try {
    let orderID = req.params.id;
    
    //check if order is not delivering or delivered
    let sql = 'SELECT deliveryStatus FROM `Order` WHERE orderID = ?';
    let [results, fields] = await db.promise().query(sql, [orderID]);
    if (results[0].deliveryStatus === "Delivering" || results[0].deliveryStatus === "Delivered") {
      res.status(400).json({msg: "Cannot cancel order that is delivering or delivered"});
      return;
    }

    //mark order as cancelled
    let sql2 = 'UPDATE `Order` SET deliveryStatus = "Cancelled" WHERE orderID = ?';
    const [results2, fields2] = await db.promise().query(sql2, [orderID]);

    res.status(200).json({msg: "Order cancelled"});

  } catch (err) {
    console.log(err);
    res.status(500).json({msg: "Error cancelling order"});
  }
}

const validateProduct = async (productID,orderID) => {
  let sql = 'SELECT * FROM OrderOrderItemsProduct WHERE productID = ? AND orderID = ?';
  const [results, fields] = await db.promise().query(sql, [productID, orderID]);
  if (results.length === 0) {
    return false;
  }
  return true;
}

const updateOrderItems = async (req, res) => {
  try {
    //To update Order items(only quantity), not order details. Updates totalPrice.
    let orderID = req.params.id;

    if (!req.body.products || req.body.products.length === 0) {
      res.status(400).json({msg: "No products to update"});
      return;
    }

    for (let i=0; i<req.body.products.length; i++) {
      let product = req.body.products[i];
      //validate
      if (!product.productID || !product.quantity || await validateProduct(product.productID, orderID) === false) {
        res.status(400).json({msg: "Invalid product"});
        return;
      }

      if (product.quantity <= 0) {
        res.status(400).json({msg: "Invalid quantity"});
        return;
      }

      //update
      let sql = 'UPDATE OrderOrderItemsProduct SET quantity = ? WHERE productID = ? AND orderID = ?';
      const [results, fields] = await db.promise().query(sql, [product.quantity, product.productID, orderID]);
    }

    //update total price
    let sql2 = 'SELECT SUM(quantity * purchasePrice) as totalPrice FROM OrderOrderItemsProduct WHERE orderID = ?';
    const [results2, fields2] = await db.promise().query(sql2, [orderID]);
    let totalPrice = results2[0].totalPrice;

    let sql3 = 'UPDATE `Order` SET totalPrice = ? WHERE orderID = ?';
    const [results3, fields3] = await db.promise().query(sql3, [totalPrice, orderID]);

    res.status(200).json({msg: "Order items updated"});

  } catch (err) {
    console.log(err);
    res.status(500).json({msg: "Error updating order items"});
  }
}

const deleteOrderItems = async (req, res) => {
  try {
    //To delete Order items. Updates totalPrice.
    let orderID = req.params.id;

    if (!req.body.products || req.body.products.length === 0) {
      res.status(400).json({msg: "No products to delete"});
      return;
    }

    for (let i=0; i<req.body.products.length; i++) {
      let product = req.body.products[i];
      //validate
      if (!product.productID || await validateProduct(product.productID, orderID) === false) {
        res.status(400).json({msg: "Invalid product"});
        return;
      }

      //delete
      let sql = 'DELETE FROM OrderOrderItemsProduct WHERE productID = ? AND orderID = ?';
      const [results, fields] = await db.promise().query(sql, [product.productID, orderID]);
    }

    //update total price
    //The order might be empty, but we have a delete-no-order policy, so it stays
    let sql2 = 'SELECT SUM(quantity * purchasePrice) as totalPrice FROM OrderOrderItemsProduct WHERE orderID = ?';
    const [results2, fields2] = await db.promise().query(sql2, [orderID]);
    let totalPrice = results2[0].totalPrice;

    if (!totalPrice) {
      console.log("Total price is 0, the order is empty");
      totalPrice = 0;
    }

    let sql3 = 'UPDATE `Order` SET totalPrice = ? WHERE orderID = ?';
    const [results3, fields3] = await db.promise().query(sql3, [totalPrice, orderID]);

    res.status(200).json({msg: "Order items deleted"});

  } catch (err) {
    console.log(err);
    res.status(500).json({msg: "Error deleting order items"});
  }
}

// Wrapper function to get order data
const getOrderDataWrapper = async (req) => {
  let orderData;

  // Create a mock response object with the necessary methods
  const mockRes = {
    status(code) {
      // Allow chaining by returning the same mock object
      this.statusCode = code;
      return this;
    },
    json(data) {
      orderData = data; // Capture the JSON response data
    },
    send(data) {
      orderData = data; // Capture data if `send` is used
    }
  };

  // Call getOrder with the mock response
  await getOrder(req, mockRes);

  // Check if orderData was populated
  if (!orderData) {
    throw new Error('No data returned from getOrder');
  }

  return orderData;
}

module.exports = {
  getOrder,
  getUserOrders,
  getSupplierOrders,
  getPurchasePrice,
  createOrder,
  updateOrder,
  cancelOrder,
  updateOrderItems,
  deleteOrderItems,
  getOrderDataWrapper,
  deleteOrderItems,
  getAllOrder
}
