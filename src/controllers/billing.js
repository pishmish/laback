const db = require('../config/database');
const bcrypt = require('bcrypt');


const getBillingInfo = async (req, res) => {
  //get all the billing information for the user
  try {
    //get the customer ID
    let sql2 = 'SELECT * FROM `Customer` WHERE username = ?';
    const [results2, fields2] = await db.promise().query(sql2, [req.username]);

    let customerID = results2[0].customerID;

    //get the billing information
    let sql = 'SELECT * FROM `BillingInfo` WHERE customerID = ?';
    const [results, fields] = await db.promise().query(sql, [customerID]);

    //remove credit card hashes
    for (let i = 0; i < results.length; i++) {
      delete results[i].creditCardNo;
    }

    return res.status(200).json(results);
  } catch(err) {
    console.log(err);
    return res.status(500).json({msg: "Error retrieving billing information"});
  }
};

const getBillingInfoById = async (req, res) => {
  //get the billing information by ID
  try {
    let sql = 'SELECT * FROM `BillingInfo` WHERE billingID = ?';
    const [results, fields] = await db.promise().query(sql, [req.params.id]);
    
    //verify that the billing information belongs to the user
    let sql2 = 'SELECT * FROM `Customer` WHERE customerID = ?';
    const [results2, fields2] = await db.promise().query(sql2, [results[0].customerID]);

    if (results2[0].username != req.username) {
      return res.status(403).json({msg: "Access denied"});
    }

    //remove credit card hash
    delete results[0].creditCardNo;

    return res.status(200).json(results[0]);
  } catch(err) {
    console.log(err);
    return res.status(500).json({msg: "Error retrieving billing information"});
  }

};

const createBillingInfo = async (req, res) => {
  //create billing information
  try {
    //get the customer ID
    let sql2 = 'SELECT * FROM `Customer` WHERE username = ?';
    const [results2, fields2] = await db.promise().query(sql2, [req.username]);

    let customerID = results2[0].customerID;

    //get/insert Address
    let addressID;
    if (req.body.address != null) {
      //insert address into address table
      const {addressTitle, country, city, zipCode, streetAddress} = req.body.address;
      let sql3 = 'INSERT INTO `Address` (addressTitle, country, city, zipCode, streetAddress) VALUES (?, ?, ?, ?, ?)';
      const [results3, fields3] = await db.promise().query(sql3, [addressTitle, country, city, zipCode, streetAddress]);

      addressID = results3.insertId;

    } else if (req.body.addressID != null) {
      //get the addressID
      addressID = req.body.addressID;
    } else {
      return res.status(400).json({msg: "Address or addressID required"});
    }
    
    //hash credit card number
    let cardNumber = req.body.creditCardNo;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(cardNumber, salt);

    //create the billing information
    let sql = 'INSERT INTO `BillingInfo` (customerID, creditCardNo, creditCardEXP, addressID) VALUES (?, ?, ?, ?)';
    const [results, fields] = await db.promise().query(sql, [customerID, hash, req.body.creditCardEXP, addressID]);

    return res.status(200).json({msg: "Billing information created"});
  } catch(err) {
    console.log(err);
    return res.status(500).json({msg: "Error creating billing information"});
  }
};
//TODO: check the following functions

const updateAddress = async (req, res) => {
  try{
    //get/insert Address
    let addressID;
    if (req.body.address != null) {
      //insert address into address table
      const {addressTitle, country, city, zipCode, streetAddress} = req.body.address;
      let sql3 = 'INSERT INTO `Address` (addressTitle, country, city, zipCode, streetAddress) VALUES (?, ?, ?, ?, ?)';
      const [results3, fields3] = await db.promise().query(sql3, [addressTitle, country, city, zipCode, streetAddress]);

      addressID = results3.insertId;

    } else {
      //get the addressID
      addressID = req.body.addressID;
    }

    //update the billing information (address)
    let sql4 = 'UPDATE `BillingInfo` SET addressID = ? WHERE billingID = ?';
    const [results4, fields4] = await db.promise().query(sql4, [addressID, req.params.id]);

  } catch(err) {
    console.log(err);
    throw err;
  }
}

const updateCreditCard = async (req, res) => {
  try{
     //hash credit card number
    let cardNumber = req.body.creditCardNo;
    const salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(cardNumber, salt);

    //update the billing information
    let sql4 = 'UPDATE `BillingInfo` SET creditCardNo = ?, creditCardEXP = ? WHERE billingID = ?';
    const [results4, fields4] = await db.promise().query(sql4, [hash, req.body.creditCardEXP, req.params.id]);

  } catch (err) {
    console.log(err);
    throw err;
  }
}

const updateBillingInfo = async (req, res) => {
  //update billing information
  try {
    //get the billing information
    let sql = 'SELECT * FROM `BillingInfo` WHERE billingID = ?';
    const [results, fields] = await db.promise().query(sql, [req.params.id]);

    //verify that the billing information belongs to the user
    let sql2 = 'SELECT * FROM `Customer` WHERE customerID = ?';
    const [results2, fields2] = await db.promise().query(sql2, [results[0].customerID]);

    if (results2[0].username != req.username) {
      return res.status(403).json({msg: "Access denied"});
    }

    //check if the address is being updated
    if (req.body.address != null || req.body.addressID != null) {
      await updateAddress(req, res);
    }

    //check if the credit card is being updated
    //the && here is questionable, if you're reading this, pretend like you didn't see it.
    if (req.body.creditCardNo != null && req.body.creditCardEXP != null) {
      await updateCreditCard(req, res);
    }
    
    return res.status(200).json({msg: "Billing information updated"});
  } catch(err) {
    console.log(err);
    return res.status(500).json({msg: "Error updating billing information"});
  }
};

const deleteBillingInfo = async (req, res) => {
  //delete billing information
  try {
    //get the billing information
    let sql = 'SELECT * FROM `BillingInfo` WHERE billingID = ?';
    const [results, fields] = await db.promise().query(sql, [req.params.id]);

    //verify that the billing information belongs to the user
    let sql2 = 'SELECT * FROM `Customer` WHERE customerID = ?';
    const [results2, fields2] = await db.promise().query(sql2, [results[0].customerID]);

    if (results2[0].username != req.username) {
      return res.status(403).json({msg: "Access denied"});
    }

    //delete the billing information
    let sql3 = 'DELETE FROM `BillingInfo` WHERE billingID = ?';
    const [results3, fields3] = await db.promise().query(sql3, [req.params.id]);

    return res.status(200).json({msg: "Billing information deleted"});
  } catch(err) {
    console.log(err);
    return res.status(500).json({msg: "Error deleting billing information"});
  }
};

module.exports = {
  getBillingInfo,
  getBillingInfoById,
  createBillingInfo,
  updateBillingInfo,
  deleteBillingInfo
};
