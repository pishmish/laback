//As we all know express sends a function called next into the middleware, which then needs to be called with or without error to make it move the request handling to the next middleware. 
// It still works, but in case of an async function, you don't need to do that. If you want to pass an error, just throw a normal exception:
require('express-async-errors');
//async errors
//^^ above code was written by musab earlier. I've left it in. -Areeb

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cron = require('node-cron');
const cors = require('cors'); // Import cors
const path = require('path'); // Import path
const helmet = require('helmet');
const morgan = require('morgan');

// Import routes from
const storeapi = require('./routes/StoreAPI');
const userapi = require('./routes/UserAPI');
const cartapi = require('./routes/CartAPI');
const addressapi = require('./routes/AddressAPI');
const invoiceapi = require('./routes/InvoiceAPI');
const deliveryapi = require('./routes/DeliveryAPI');
const orderapi = require('./routes/OrderAPI');
const paymentapi = require('./routes/PaymentAPI');
const wishlistapi = require('./routes/WishlistAPI');
const analyticsapi = require('./routes/AnalyticsAPI');
const returnapi = require('./routes/ReturnsAPI');

//middleware 
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

const app = express();
const PORT = process.env.PORT || 5001; //port is 5001 for now

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // Allow credentials
})); // Use CORS middleware and restrict to your frontend's URL

// Serve static files from the "src/assets" directory
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));

// Use Helmet to set various HTTP headers for security
app.use(helmet());

// Use 'combined' for detailed logs or 'tiny' for minimal logs
app.use(morgan('combined'));

// Use the storeapi defined in route.js
app.use('/store', storeapi);
app.use('/user', userapi);
app.use('/cart', cartapi);
app.use('/address', addressapi);
app.use('/invoice', invoiceapi);
app.use('/delivery', deliveryapi);
app.use('/order', orderapi);
app.use('/payment', paymentapi);
app.use('/wishlist', wishlistapi);
app.use('/analytics', analyticsapi);
app.use('/returns', returnapi);


// Schedule the cron job, but only if not in the test environment
if (process.env.NODE_ENV !== "test") {
  //cron job for cleaning expired carts every day at midnight (may also gets rid of original carts in sampleData.sql)
  cron.schedule('0 0 * * *', async () => {
    try 
    {
      await pool.promise().query('DELETE FROM Cart WHERE temporary = true timeCreated < NOW() - INTERVAL 7 DAY');
      console.log('Expired carts deleted');
    } catch (err) {
      console.error('Error deleting expired carts:', err);
    }
  });
}
// commented cuz now is not the time to worry about this.

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
