require('express-async-errors');
//async errors
//^^ above code was written by musab earlier. I've left it in. -Areeb

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cron = require('node-cron');
const cors = require('cors'); // Import cors
const path = require('path'); // Import path

// Import routes from
const storeapi = require('./routes/StoreAPI');
const userapi = require('./routes/UserAPI');
const cartapi = require('./routes/CartAPI');
const addressapi = require('./routes/AddressAPI');

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

// Use the storeapi defined in route.js
app.use('/store', storeapi);
app.use('/user', userapi);
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

//Start the server if the file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app; // Export the app for testing
