require('dotenv').config()
require('express-async-errors');
//async errors
//^^ above code was written by musab earlier. I've left it in. -Areeb

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/StoreAPI'); // Import the router

const app = express();
const PORT = process.env.PORT || 5001; //port is 5001

// Middleware
app.use(bodyParser.json());

// Use the routes defined in route.js
app.use('/', routes);

//home page message:
app.get('/', (req, res) => {
    res.send('Welcome to the API. Access all products at /api/Product');
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




