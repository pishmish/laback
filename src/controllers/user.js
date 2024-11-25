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
    throw err;
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
    console.log(role);

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        throw err;
      }
      if (!isMatch) {
        throw new Error('Invalid credentials');
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
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return;
  } catch(err) {
    console.log(err);
    throw err;
  }
}

const getUserProfile = async (req, res) => {
}

const updateUserProfile = async (req, res) => {
}

const deleteUser = async (req, res) => {
}

module.exports = {
  registerCustomer,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser
}
