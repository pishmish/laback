require('express-async-errors');
//async errors
//^^ above code was written by musab earlier. I've left it in. -Areeb

const express = require('express');
const bodyParser = require('body-parser');

// Import routes from
const storeapi = require('./routes/StoreAPI');
//const userapi = require('./routes/UserAPI'); uncomment later

const deliveryapi = require('./routes/DeliveryAPI'); // added

//middleware 
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

const app = express();
const PORT = process.env.PORT || 5001; //port is 5001

// Middleware
app.use(bodyParser.json());

// Use the storeapi defined in route.js
app.use('/store', storeapi);
//app.use('/user', userapi); uncomment later too

// Use the DeliveryAPI defined 
app.use('/delivery', deliveryapi);

//home page message:
app.get('/', (req, res) => {
    res.send('Api is running, put the extension you need (currently /store) to access relevant calls');
  });

app.use(notFoundMiddleware);
app.use(errorMiddleware);

//Start the server if the file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app; // Export the app for testing
