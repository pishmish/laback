require('express-async-errors');
//async errors
//^^ above code was written by musab earlier. I've left it in. -Areeb

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cron = require('node-cron');

// Import routes from
const storeapi = require('./routes/StoreAPI');
// const userapi = require('./routes/UserAPI');
const cartapi = require('./routes/CartAPI');

//middleware 
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

const app = express();
const PORT = process.env.PORT || 5001; //port is 5001 for now

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Use the storeapi defined in route.js
app.use('/store', storeapi);
// app.use('/user', userapi);
app.use('/cart', cartapi);

//cron job for cleaning expired carts every day at midnight (may also gets rid of original carts in sampleData.sql)
cron.schedule('0 0 * * *', async () => {
  try {
    await pool.promise().query('DELETE FROM Cart WHERE timeCreated < NOW() - INTERVAL 7 DAY');
    console.log('Expired carts deleted');
  } catch (err) {
    console.error('Error deleting expired carts:', err);
  }
});

//home page message:
app.get('/', (req, res) => {
    res.send('Api is running, put the extension you need (currently /store) to access relevant calls');
  });

app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




