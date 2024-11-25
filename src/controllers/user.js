require('dotenv').config();
const db = require('../config/database');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const registerUser = async (req, res) => {
  try{
    //regsiter user
    const {name, email, username, password} = req.body;

    if (!name || !email || !username || !password) {
      throw new Error('Please fill in all fields');
    }

    //check if user already exists
    let sql = 'SELECT * FROM `User` WHERE username = ?';
    const [results, fields] = await db.promise().query(sql, [username]);
    if (results.length > 0) {
      return;
      //user is already registered, no need to register again
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await db.promise().query('INSERT INTO `User` (name, email, username, password) VALUES (?, ?, ?, ?)', [name, email, username, hash]);

    return;
  } catch(err) {
    console.log(err);
    throw err;
  }
}

const registerCustomerInternal = async (req, res) => {
  try {
    const {address, phone, username} = req.body;

    if (!address || !phone) {
      throw new Error('Please fill in all fields (address, phone)');
    }

    //insert address into address table
    const {addressTitle, country, city, zipCode, streetAddress} = address;
    sql = 'INSERT INTO `Address` (addressTitle, country, city, zipCode, streetAddress) VALUES (?, ?, ?, ?, ?)';
    const [results3, fields3] = await db.promise().query(sql, [addressTitle, country, city, zipCode, streetAddress]);
    addressID = results3.insertId;

    //insert customer
    sql = 'INSERT INTO `Customer` (username, addressID, phone) VALUES (?, ?, ?)';
    const [results2, fields2] = await db.promise().query(sql, [username, addressID, phone]);

    return true;
  } catch(err) {
    console.log(err);
    return res.status(500).json({msg: "Error registering customer"});
}}

const registerCustomer = async (req, res) => {
  try {
    //register user
    await registerUser(req, res);
    //register Customer
    await registerCustomerInternal(req, res);

    return res.status(200).json({msg: "User registered"});
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: "Error registering user"});
}}

const checkRole = async (username) => {
  let sql = 'SELECT * FROM `Customer` WHERE username = ?';
  const [results, fields] = await db.promise().query(sql, [username]);

  let sql2 = 'SELECT * FROM `ProductManager` WHERE username = ?';
  const [results2, fields2] = await db.promise().query(sql2, [username]);

  let sql3 = 'SELECT * FROM `SalesManager` WHERE username = ?';
  const [results3, fields3] = await db.promise().query(sql3, [username]);

  if ((results2 && results2.length >0) || (results3 && results3.length >0)) {
    if (results2.length>0) {
      return 'productManager';
    } else {
      return 'salesManager';
    }
  } else if (results && results.length>0) {
      return 'customer';
  } else {
    //this is dependent on the implementation of the calling function
    return 'admin';
  }
}

const loginUser = async (req, res) => {
  try {
    const {username, password} = req.body;

    if (!username || !password) {
      throw new Error('Please fill in all fields');
    }

    let sql = 'SELECT * FROM `User` WHERE username = ?';
    const [results, fields] = await db.promise().query(sql, [username]);

    if (results.length == 0) {
      throw new Error('Invalid credentials');
    }

    const user = results[0];

    //check user role
    let role = await checkRole(user.username); //we know the user exists.

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        throw err;
      }
      if (!isMatch) {
        return res.status(401).json({msg: "Invalid credentials"});
      } else {
        //user logged in with correct password. Create a token
        const token = jwt.sign({id: user.username, role: role}, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE
        });

        res.cookie('authToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: process.env.JWT_COOKIE
        });

        return res.status(200).json({msg: "User logged in"});
      }
    });

    return;
  } catch(err) {
    console.log(err);
    return res.status(500).json({msg: "Error logging in"});
  }
}

const getUserProfile = async (req, res) => {
  //get customer profile (this will probably be expanded later)
  try {
    let sql = 'SELECT * FROM `Customer` WHERE username = ?';
    const [results, fields] = await db.promise().query(sql, [req.username]);
    if (results.length == 0) {
      throw new Error('User not found');
    }

    let customer = results[0];

    let sql2 = 'SELECT * FROM `Address` WHERE addressID = ?';
    const [results2, fields2] = await db.promise().query(sql2, [customer.addressID]);
    let address = results2[0];

    //add orders here
    let sql3 = 'SELECT * FROM `Order` WHERE customerID = ?';
    const [results3, fields3] = await db.promise().query(sql3, [customer.customerID]);

    //get user
    let sql4 = 'SELECT * FROM `User` WHERE username = ?';
    const [results4, fields4] = await db.promise().query(sql4, [req.username]);

    let user = results4[0];
    //remove the things that should be removed
    delete user.password;
    delete customer.customerID;

    return res.status(200).json({
      customer: customer,
      address: address,
      orders: results3,
      user: user
    });
  } catch(err) {
    console.log(err);
    return res.status(500).json({msg: "Error getting user profile"});
  }
}

const updateUserProfile = async (req, res) => {
  //allows user to update name, password
  // if the user is a customer, they can also update their phone. Address is upto addressAPI.
  try {
    const {name, password, phone} = req.body;
    
    if (name) {
      let sql = 'UPDATE `User` SET name = ? WHERE username = ?';
      const [results, fields] = await db.promise().query(sql, [name, req.username]);
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      let sql = 'UPDATE `User` SET password = ? WHERE username = ?';
      const [results, fields] = await db.promise().query(sql, [hash, req.username]);
    }

    //Customer specific
    if (req.role == 'customer' && phone) {
      let sql = 'UPDATE `Customer` SET phone = ? WHERE username = ?';
      const [results, fields] = await db.promise().query(sql, [phone, req.username]);
    }

    return res.status(200).json({
      msg: "User updated"
    });

  } catch(err) {
    console.log(err);
    return res.status(500).json({msg: "Error updating user"});
  }
}

const deleteUser = async (req, res) => {
  try{
    let sql = 'DELETE FROM `User` WHERE username = ?';
    const [results, fields] = await db.promise().query(sql, [req.username]);
    return res.status(200).json({msg: "User deleted"});
  } catch(err) {
    console.log(err);
    throw err;
    return res.status(500).json({msg: "Error deleting user"});
  }
}

module.exports = {
  registerCustomer,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser
}
