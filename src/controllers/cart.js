const pool = require('../config/database');
// const cookieParser = require('cookie-parser'); // Import cookie parser middleware
// router.use(cookieParser()); // Use cookie parser middleware

// Fetch or create a temporary cart (Cart table) and its products (CartContainsProduct table) using cookies
const getOrCreateCart = async (req, res) => {
  try {
    // Retrieve fingerprint from cookies
    let { fingerprint } = req.cookies;

    if (!fingerprint) {
      // Generate a new fingerprint (e.g., UUID)
      fingerprint = require('crypto').randomUUID();

      // Set the new fingerprint as a cookie
      res.cookie('fingerprint', fingerprint, {
        httpOnly: true, // Prevent client-side access to the cookie
        security: true, // Secure cookie (HTTPS only)
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration (1 week)
      });
      console.log('New fingerprint created:', fingerprint);

      //fallback action/ create-as-you-fetch mechanism
      // Create a new cart with the generated fingerprint
      const [result] = await pool.promise().query(
        'INSERT INTO Cart (totalPrice, numProducts, fingerprint, customerID) VALUES (?, ?, ?, ?)',
        [0, 0, fingerprint, null] // No customerID for non-logged-in users
      );
      console.log('New cart created with ID:', result.insertId);
    }

    // Check if a cart exists for the current fingerprint, and ensure it is not older than 7 days
    let [rows] = await pool.promise().query(
      'SELECT * FROM Cart WHERE fingerprint = ? AND timeCreated >= NOW() - INTERVAL 7 DAY',
      [fingerprint]
    );

    let cartID;

    if (rows.length) {
      // Cart exists, return it
      cartID = rows[0].cartID; // Existing cart ID
      console.log('Existing cart found with ID:', cartID);
      
    } else {
      //fallback action/ create-as-you-fetch mechanism
      // Cart does not exist or has expired, create a new one
      const [result] = await pool.promise().query(
        'INSERT INTO Cart (totalPrice, numProducts, fingerprint, customerID) VALUES (?, ?, ?, ?)',
        [0, 0, fingerprint, null] // No customerID for non-logged-in users
      );
      cartID = result.insertId; // New cart ID
      console.log('New cart created with ID:', cartID);

      [rows] = await pool.promise().query(
        'SELECT * FROM Cart WHERE fingerprint = ? AND timeCreated >= NOW() - INTERVAL 7 DAY',
        [fingerprint]
      );
    }

    // Retrieve products in the CartContainsProduct table for the cartID
    const [products] = await pool.promise().query(
      'SELECT ccp.productID, ccp.quantity, p.name, p.unitPrice ' +
      'FROM CartContainsProduct ccp ' +
      'JOIN Product p ON ccp.productID = p.productID ' +
      'WHERE ccp.cartID = ?',
      [cartID]
    );

    rows[0].products = products;

    return res.status(200).json(rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch or create cart.' });
  }
};

  
  // Add product to cart using cookies (while creating a new cart if necessary)
const addProductToCart = async (req, res) => {
  try 
  {
    // Retrieve fingerprint from cookies
    let { fingerprint } = req.cookies;
    const { productID }  = req.params; // Get product ID from the request parameter

    if (!fingerprint) {
      // Generate a new fingerprint (e.g., UUID)
      fingerprint = require('crypto').randomUUID();

      // Set the new fingerprint as a cookie
      res.cookie('fingerprint', fingerprint, {
        httpOnly: true, // Prevent client-side access to the cookie
        security: true, // Secure cookie (HTTPS only)
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration (1 week)
      });
      console.log('New fingerprint created:', fingerprint);

      //fallback action/ create-as-you-fetch mechanism
      // Create a new cart with the generated fingerprint
      const [result] = await pool.promise().query(
        'INSERT INTO Cart (totalPrice, numProducts, fingerprint, customerID) VALUES (?, ?, ?, ?)',
        [0, 0, fingerprint, null] // No customerID for non-logged-in users
      );
      console.log('New cart created with ID:', result.insertId);
    }

    // Check if a cart exists for the current fingerprint, and ensure it is not older than 7 days
    const [rows] = await pool.promise().query(
      'SELECT * FROM Cart WHERE fingerprint = ? AND timeCreated >= NOW() - INTERVAL 7 DAY',
      [fingerprint]
    );
    //timecreated
    // console.log('Rows:', rows);
    console.log(fingerprint);

    let cartID;

    if (rows.length) {
      // Cart exists
      cartID = rows[0].cartID; // Existing cart ID
      console.log('Existing cart found with ID:', cartID);
    } else 
    {
      //fallback action/ create-as-you-fetch mechanism
      // Cart does not exist or has expired, create a new one
      const [result] = await pool.promise().query(
        'INSERT INTO Cart (totalPrice, numProducts, fingerprint, customerID) VALUES (?, ?, ?, ?)',
        [0, 0, fingerprint, null] // No customerID for non-logged-in users
      );
      cartID = result.insertId; // New cart ID
      console.log('New cart created with ID:', cartID);
    }

    // Add product to CartContainsProduct, incrementing quantity by 1
    await pool.promise().query(
      'INSERT INTO CartContainsProduct (cartID, productID, quantity) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE quantity = quantity + 1',
      [cartID, productID]
    );

    // Update cart totals: numProducts and totalPrice
    await pool.promise().query(
      'UPDATE Cart SET numProducts = numProducts + 1, totalPrice = totalPrice + (SELECT unitPrice FROM Product WHERE productID = ?) WHERE cartID = ?',
      [productID, cartID]
    );

    // console.log('Rows:', rows);


    // Send response with success message and cart details
    return res.status(201).json({
      message: 'Product added to cart successfully.',
      cartID: cartID,          // Return the cart ID
      fingerprint: fingerprint  // Return the fingerprint
    });
  } 
  catch (err) 
  {
    console.error(err);
    res.status(500).json({ error: 'Failed to add product to cart.' });
  }
};

const removeProductFromCart = async (req, res) => {
  const { fingerprint } = req.cookies; // Retrieve fingerprint from cookies
  const { productID } = req.params; // Get product details from request param

  try {
    // Check for an existing cart for this fingerprint
    const [rows] = await pool.promise().query(
      'SELECT * FROM Cart WHERE fingerprint = ? AND timeCreated >= NOW() - INTERVAL 7 DAY',
      [fingerprint]
    );

    if (!rows.length) {
      return res.status(404).json({ error: 'No active cart found for the user.' });
    }

    const cartID = rows[0].cartID; // Existing cart ID

    // Check if the product exists in the cart
    const [productRows] = await pool.promise().query(
      'SELECT quantity FROM CartContainsProduct WHERE cartID = ? AND productID = ?',
      [cartID, productID]
    );

    if (!productRows.length) {
      return res.status(404).json({ error: 'Product not found in the cart.' });
    }

    const currentQuantity = productRows[0].quantity;

    if (currentQuantity === 1) {
      // Remove the product from the cart entirely if the quantity is 1
      await pool.promise().query(
        'DELETE FROM CartContainsProduct WHERE cartID = ? AND productID = ?',
        [cartID, productID]
      );
    } else {
      // Decrement the quantity by 1
      await pool.promise().query(
        'UPDATE CartContainsProduct SET quantity = quantity - 1 WHERE cartID = ? AND productID = ?',
        [cartID, productID]
      );
    }

    // Update cart totals
    await pool.promise().query(
      'UPDATE Cart SET numProducts = numProducts - 1, totalPrice = totalPrice - (SELECT unitPrice FROM Product WHERE productID = ?) WHERE cartID = ?',
      [productID, cartID]
    );

    res.status(200).json({ cartID, message: 'Product removed from cart successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove product from cart.' });
  }
};


const deleteProductFromCart = async (req, res) => {
  const { fingerprint } = req.cookies; // Retrieve fingerprint from cookies
  const { productID } = req.params; // Get product ID from the request parameter

  try {
    // Check for an existing cart for this fingerprint
    const [rows] = await pool.promise().query(
      'SELECT * FROM Cart WHERE fingerprint = ? AND timeCreated >= NOW() - INTERVAL 7 DAY',
      [fingerprint]
    );

    if (!rows.length) {
      return res.status(404).json({ error: 'No active cart found for the user.' });
    }

    const cartID = rows[0].cartID; // Existing cart ID

    // Check if the product exists in the cart
    const [productRows] = await pool.promise().query(
      'SELECT quantity, (quantity * (SELECT unitPrice FROM Product WHERE productID = ?)) AS productTotal FROM CartContainsProduct WHERE cartID = ? AND productID = ?',
      [productID, cartID, productID]
    );

    if (!productRows.length) {
      return res.status(404).json({ error: 'Product not found in the cart.' });
    }

    const productTotal = productRows[0].productTotal;

    // Remove the product from the cart
    await pool.promise().query(
      'DELETE FROM CartContainsProduct WHERE cartID = ? AND productID = ?',
      [cartID, productID]
    );

    // Update cart totals
    await pool.promise().query(
      'UPDATE Cart SET numProducts = numProducts - ?, totalPrice = totalPrice - ? WHERE cartID = ?',
      [productRows[0].quantity, productTotal, cartID]
    );

    res.status(200).json({ cartID, message: 'Product removed from cart successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete product from cart.' });
  }
};


  // // Merge carts on login using cookies and customerID
  // router.post('/cart/merge', async (req, res) => {
  //   const { customerID, fingerprint } = req.body; // Access fingerprint from body and customerID
  
  //   try {
  //     // Find temporary cart
  //     const [tempCartRows] = await pool.query(
  //       'SELECT * FROM Cart WHERE fingerprint = ? AND temporary = TRUE',
  //       [fingerprint]
  //     );
  
  //     if (!tempCartRows.length) {
  //       return res.status(404).json({ error: 'Temporary cart not found.' });
  //     }
  
  //     const tempCart = tempCartRows[0];
  
  //     // Check for existing user cart (where temporary = false)
  //     const [userCartRows] = await pool.query(
  //       'SELECT * FROM Cart WHERE customerID = ? AND temporary = FALSE',
  //       [customerID]
  //     );
  
  //     let userCartID;
  
  //     if (userCartRows.length) {
  //       // Check if the user’s cart is empty (i.e., it has no products in CartContainsProduct)
  //       const [cartItems] = await pool.query(
  //         'SELECT * FROM CartContainsProduct WHERE cartID = ?',
  //         [userCartRows[0].cartID]
  //       );
  
  //       if (cartItems.length === 0) {
  //         // The user has an empty cart or a cart that has been ordered
  //         // Replace the totals and quantity with the new products from the temporary cart
  //         userCartID = userCartRows[0].cartID;
          
  //         // Clear the old cart items (if any)
  //         await pool.query('DELETE FROM CartContainsProduct WHERE cartID = ?', [userCartID]);
  
  //         // Add products from the temporary cart and update totals
  //         await pool.query(
  //           'INSERT INTO CartContainsProduct (cartID, productID, quantity) SELECT ?, productID, quantity FROM CartContainsProduct WHERE cartID = ?',
  //           [userCartID, tempCart.cartID]
  //         );
  
  //         await pool.query(
  //           'UPDATE Cart SET totalPrice = ?, numProducts = ? WHERE cartID = ?',
  //           [tempCart.totalPrice, tempCart.numProducts, userCartID]
  //         );
  //       } else {
  //         // The user’s cart contains products, so just add the new products from temp cart
  //         userCartID = userCartRows[0].cartID;
  
  //         await pool.query(
  //           'INSERT INTO CartContainsProduct (cartID, productID, quantity) SELECT ?, productID, quantity FROM CartContainsProduct WHERE cartID = ? ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)',
  //           [userCartID, tempCart.cartID]
  //         );
  
  //         // Update user cart totals
  //         await pool.query(
  //           'UPDATE Cart SET totalPrice = totalPrice + ?, numProducts = numProducts + ? WHERE cartID = ?',
  //           [tempCart.totalPrice, tempCart.numProducts, userCartID]
  //         );
  //       }
  //     } else {
  //       // Assign temporary cart to user (if no existing user cart)
  //       userCartID = tempCart.cartID;
  //       await pool.query(
  //         'UPDATE Cart SET temporary = FALSE, customerID = ? WHERE cartID = ?',
  //         [customerID, userCartID]
  //       );
  //     }
  
  //     // Delete temporary cart data after merging
  //     await pool.query('DELETE FROM Cart WHERE cartID = ?', [tempCart.cartID]);
  
  //     res.json({ message: 'Carts merged successfully.', cartID: userCartID });
  //   } catch (err) {
  //     res.status(500).json({ error: 'Failed to merge carts.' });
  //   }
  // });

  //
  
  module.exports = {
    getOrCreateCart,
    addProductToCart,
    removeProductFromCart,
    deleteProductFromCart,
  };
  


