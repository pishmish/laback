require('dotenv').config();
const mysql = require('mysql2');

const LOCAL = {
  host: process.env.MYSQL_HOST, 
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD, 
  database: process.env.MYSQL_DB
};

const db = mysql.createPool(LOCAL);
module.exports = db;
