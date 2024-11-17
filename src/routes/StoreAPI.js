const express = require('express');
const mysql = require('mysql');
const router = express.Router();

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'zadados'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

// Routes:

//Create example (for inputting into category table)
router.post('/api/Category', (req, res) => {
  const { name, description } = req.body;
  db.query('INSERT INTO `Product` (name, description) VALUES (?, ?)', [name, description], (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(400).send('Error creating user');
      return;
    }
    res.status(201).send('User created successfully');
  });
});

//Read example (Product table)
router.get('/api/Product', (req, res) => {
  db.query('SELECT * FROM `Product`', (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching users');
      return;
    }
    res.json(results);
  });
});

//Update example (for updating a category record)
router.put('/api/Category/:catID', (req, res) => {
  const { name, description } = req.body;
  const categoryID = req.params.catID; //req.params.<catID> is used to match the route definition ":catyID"
  db.query('UPDATE `Category` SET name = ?, description = ? WHERE categoryID = ?', [name, description, categoryID], (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(400).send('Error updating user');
      return;
    }
    res.send('User updated successfully');
  });
});

// Delete example (for deleting an existing category record)
router.delete('/api/Category/:catID', (req, res) => {
  const categoryID = req.params.catID; //req.params.<catID> is used to match the route definition ":catyID"
  db.query('DELETE FROM `Category` WHERE categoryID = ?', [categoryID], (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(400).send('Error deleting user');
      return;
    }
    res.send('User deleted successfully');
  });
});

//export the router:
module.exports = router;