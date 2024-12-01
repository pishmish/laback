const pool = require('../config/database');
// const cookieParser = require('cookie-parser'); // Import cookie parser middleware
// router.use(cookieParser()); // Use cookie parser middleware

// Fetch or create a temporary/permanent cart and get its products using cookies/customerID
const getOrCreateCart = async (req, res) => {
  try {
    // Retrieve fingerprint from cookies
    let { fingerprint } = req.cookies;
    const customerID = req.customerID || null; // Get customerID if the user is logged in, otherwise null

    let cartID;
    let rows;

    if (customerID) {
      // User is logged in, use permanent cart
      [rows] = await pool.promise().query(
        'SELECT * FROM Cart WHERE customerID = ? AND temporary = false',
        [customerID]
      );

      if (rows.length === 0) {
        // Create a new permanent cart if none exists
        const [result] = await pool.promise().query(
          'INSERT INTO Cart (totalPrice, numProducts, customerID, temporary) VALUES (?, ?, ?, ?)',
          [0, 0, customerID, false]
        );
        cartID = result.insertId;
        [rows] = await pool.promise().query(
          'SELECT * FROM Cart WHERE customerID = ? AND temporary = false',
          [customerID]
        );
        console.log('New permanent cart created with ID:', cartID);
      } else {
        cartID = rows[0].cartID;
      }
    } else {
      // User is not logged in, use temporary cart
      if (!fingerprint) {
        // Generate a new fingerprint (e.g., UUID)
        fingerprint = require('crypto').randomUUID();

        // Set the new fingerprint as a cookie
        res.cookie('fingerprint', fingerprint, {
          httpOnly: true, // Prevent client-side access to the cookie
          secure: true, // Secure cookie (HTTPS only)
          maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration (1 week)
        });
        console.log('New fingerprint created:', fingerprint);

        // Create a new temporary cart with the generated fingerprint
        const [result] = await pool.promise().query(
          'INSERT INTO Cart (totalPrice, numProducts, fingerprint, temporary) VALUES (?, ?, ?, ?)',
          [0, 0, fingerprint, true]
        );
        cartID = result.insertId;
        [rows] = await pool.promise().query(
          'SELECT * FROM Cart WHERE fingerprint = ? AND temporary = true',
          [fingerprint]
        );
        console.log('New temporary cart created with ID:', cartID);
      } else {
        // Check if a cart exists for the current fingerprint, and ensure it is not older than 7 days
        [rows] = await pool.promise().query(
          'SELECT * FROM Cart WHERE fingerprint = ? AND temporary = true AND timeCreated > NOW() - INTERVAL 7 DAY',
          [fingerprint]
        );

        if (rows.length === 0) {
          // Create a new temporary cart if none exists
          const [result] = await pool.promise().query(
            'INSERT INTO Cart (totalPrice, numProducts, fingerprint, temporary) VALUES (?, ?, ?, ?)',
            [0, 0, fingerprint, true]
          );
          cartID = result.insertId;
          console.log('New temporary cart created with ID:', cartID);
        } else {
          cartID = rows[0].cartID;
        }
      }
    }

    // Fetch products in the cart
    const [cartProducts] = await pool.promise().query(
      'SELECT p.productID, p.name, p.unitPrice, ccp.quantity FROM CartContainsProduct ccp JOIN Product p ON ccp.productID = p.productID WHERE ccp.cartID = ?',
      [cartID]
    );

    // Send response with cart details
    return res.status(200).json({
      cartID: cartID,
      loggedIn: !!customerID, // Return whether the user is logged in
      temporary: !!rows[0].temporary, // Return whether the cart is temporary
      fingerprint: fingerprint, // Return the fingerprint
      customerID: customerID,  // Return the customerID
      totalPrice: rows[0].totalPrice,
      numProducts: rows[0].numProducts,
      timeCreated: rows[0].timeCreated,
      products: cartProducts // Return the products in the cart
    });
    
  } catch (err) {
    console.error('Error fetching or creating cart:', err);
    res.status(500).json({ error: 'Failed to fetch or create cart.' });
  }
};


const addProductToCart = async (req, res) => {
  try {
    // Retrieve fingerprint from cookies
    let { fingerprint } = req.cookies;
    const { productID } = req.params; // Get product ID from the request parameter
    const customerID = req.customerID || null; // Get customerID if the user is logged in, otherwise null

    let cartID;

    if (customerID) {
      // User is logged in, use permanent cart
      const [permCartRows] = await pool.promise().query(
        'SELECT * FROM Cart WHERE customerID = ? AND temporary = false',
        [customerID]
      );

      if (permCartRows.length === 0) {
        // Create a new permanent cart if none exists
        const [result] = await pool.promise().query(
          'INSERT INTO Cart (totalPrice, numProducts, customerID, temporary) VALUES (?, ?, ?, ?)',
          [0, 0, customerID, false]
        );
        cartID = result.insertId;
        console.log('New permanent cart created with ID:', cartID);
      } else {
        cartID = permCartRows[0].cartID;
      }
    } else {
      // User is not logged in, use temporary cart
      if (!fingerprint) {
        // Generate a new fingerprint (e.g., UUID)
        fingerprint = require('crypto').randomUUID();

        // Set the new fingerprint as a cookie
        res.cookie('fingerprint', fingerprint, {
          httpOnly: true, // Prevent client-side access to the cookie
          secure: true, // Secure cookie (HTTPS only)
          maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration (1 week)
        });
        console.log('New fingerprint created:', fingerprint);

        // Create a new temporary cart with the generated fingerprint
        const [result] = await pool.promise().query(
          'INSERT INTO Cart (totalPrice, numProducts, fingerprint, temporary) VALUES (?, ?, ?, ?)',
          [0, 0, fingerprint, true]
        );
        cartID = result.insertId;
        console.log('New temporary cart created with ID:', cartID);
      } else {
        // Check if a cart exists for the current fingerprint, and ensure it is not older than 7 days
        const [rows] = await pool.promise().query(
          'SELECT * FROM Cart WHERE fingerprint = ? AND temporary = true AND timeCreated > NOW() - INTERVAL 7 DAY',
          [fingerprint]
        );

        if (rows.length === 0) {
          // Create a new temporary cart if none exists
          const [result] = await pool.promise().query(
            'INSERT INTO Cart (totalPrice, numProducts, fingerprint, temporary) VALUES (?, ?, ?, ?)',
            [0, 0, fingerprint, true]
          );
          cartID = result.insertId;
          console.log('New temporary cart created with ID:', cartID);
        } else {
          cartID = rows[0].cartID;
        }
      }
    }

    // Add product to the cart
    await pool.promise().query(
      'INSERT INTO CartContainsProduct (cartID, productID, quantity) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE quantity = quantity + 1',
      [cartID, productID]
    );

    // Update cart totals: numProducts and totalPrice
    await pool.promise().query(
      'UPDATE Cart SET numProducts = numProducts + 1, totalPrice = totalPrice + (SELECT unitPrice FROM Product WHERE productID = ?) WHERE cartID = ?',
      [productID, cartID]
    );

    // Send response with success message and cart details
    return res.status(201).json({
      message: 'Product added to cart successfully.',
      cartID: cartID,          // Return the cart ID
      loggedIn: !!customerID,  // Return whether the user is logged in
      fingerprint: fingerprint,  // Return the fingerprint
      customerID: customerID  // Return the customerID
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add product to cart.' });
  }
};


const removeProductFromCart = async (req, res) => {
  const { fingerprint } = req.cookies; // Retrieve fingerprint from cookies
  const { productID } = req.params; // Get product ID from the request parameter
  const customerID = req.customerID || null; // Get customerID if the user is logged in, otherwise null

  try {
    let cartID;

    if (customerID) {
      // User is logged in, use permanent cart
      const [permCartRows] = await pool.promise().query(
        'SELECT * FROM Cart WHERE customerID = ? AND temporary = false',
        [customerID]
      );

      if (permCartRows.length === 0) {
        return res.status(404).json({ error: 'No permanent cart found for the user.' });
      }

      cartID = permCartRows[0].cartID;
    } else {
      // User is not logged in, use temporary cart
      const [rows] = await pool.promise().query(
        'SELECT * FROM Cart WHERE fingerprint = ? AND temporary = true AND timeCreated > NOW() - INTERVAL 7 DAY',
        [fingerprint]
      );

      if (!rows.length) {
        return res.status(404).json({ error: 'No temporary cart found for the user.' });
      }

      cartID = rows[0].cartID;
    }

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

    res.status(200).json({ 
      message: 'Product removed from cart successfully.',
      cartID: cartID,          // Return the cart ID
      loggedIn: !!customerID,  // Return whether the user is logged in
      fingerprint: fingerprint,  // Return the fingerprint
      customerID: customerID  // Return the customerID
       });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove product from cart.' });
  }
};


const deleteProductFromCart = async (req, res) => {
  const { fingerprint } = req.cookies; // Retrieve fingerprint from cookies
  const { productID } = req.params; // Get product ID from the request parameter
  const customerID = req.customerID || null; // Get customerID if the user is logged in, otherwise null

  try {
    let cartID;

    if (customerID) {
      // User is logged in, use permanent cart
      const [permCartRows] = await pool.promise().query(
        'SELECT * FROM Cart WHERE customerID = ? AND temporary = false',
        [customerID]
      );

      if (permCartRows.length === 0) {
        return res.status(404).json({ error: 'No active cart found for the user.' });
      }

      cartID = permCartRows[0].cartID;
    } else {
      // User is not logged in, use temporary cart
      const [rows] = await pool.promise().query(
        'SELECT * FROM Cart WHERE fingerprint = ? AND temporary = true AND timeCreated > NOW() - INTERVAL 7 DAY',
        [fingerprint]
      );

      if (!rows.length) {
        return res.status(404).json({ error: 'No active cart found for the user.' });
      }

      cartID = rows[0].cartID;
    }

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

    res.status(200).json({ 
      message: 'Product deleted from cart successfully.',
      cartID: cartID,
      loggedIn: !!customerID,
      fingerprint: fingerprint,
      customerID: customerID
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete product from cart.' });
  }
};

//Merge carts on login using cookies and customerID
///creates a new permanent cart if none exists, deletes the temporary cart if it exists, and clears the fingerprint cookie
const mergeCartsOnLogin = async (req, res) => {
  try {
    const customerID = req.customerID || null; // Get customerID if the user is logged in, otherwise null
    const { fingerprint } = req.cookies;

    if (!fingerprint) {
      return res.status(400).json({ msg: 'No temporary cart found' });
    }

    // Get the temporary cart
    const [tempCartRows] = await pool.promise().query(
      'SELECT * FROM Cart WHERE fingerprint = ? AND temporary = true',
      [fingerprint]
    );

    if (tempCartRows.length === 0) {
      return res.status(400).json({ msg: 'No temporary cart found' });
    }

    const tempCartID = tempCartRows[0].cartID;

    // Get the permanent cart for the customer
    const [permCartRows] = await pool.promise().query(
      'SELECT * FROM Cart WHERE customerID = ? AND temporary = false',
      [customerID]
    );

    let permCartID;
    if (permCartRows.length === 0) {
      // Create a new permanent cart if none exists
      const [result] = await pool.promise().query(
        'INSERT INTO Cart (totalPrice, numProducts, customerID, temporary) VALUES (?, ?, ?, ?)',
        [0, 0, customerID, false]
      );
      permCartID = result.insertId;
      console.log('New permanent cart created with ID:', permCartID);
    } else {
      permCartID = permCartRows[0].cartID;
    }

    // Merge products from temporary cart to permanent cart
    const [tempCartProducts] = await pool.promise().query(
      'SELECT * FROM CartContainsProduct WHERE cartID = ?',
      [tempCartID]
    );

    for (const product of tempCartProducts) {
      await pool.promise().query(
        'INSERT INTO CartContainsProduct (cartID, productID, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)',
        [permCartID, product.productID, product.quantity]
      );
    }

    // Delete the temporary cart
    await pool.promise().query('DELETE FROM Cart WHERE cartID = ?', [tempCartID]);

    // Clear the fingerprint cookie
    res.clearCookie('fingerprint');

    res.status(200).json({ msg: 'Carts merged successfully' });
  } catch (err) {
    console.error('Error merging carts on login:', err);
    res.status(500).json({ error: 'Failed to merge carts.' });
  }
};


const deletePermanentCartOnLogout = async (req, res) => {
  const { customerID } = req.user || {}; // Get customerID if the user is logged in

  try {
    if (!customerID) {
      return res.status(400).json({ msg: 'User not logged in' });
    }

    // Fetch the permanent cart for the customer
    const [permCartRows] = await pool.promise().query(
      'SELECT * FROM Cart WHERE customerID = ? AND temporary = false',
      [customerID]
    );

    if (permCartRows.length === 0) {
      return res.status(404).json({ msg: 'No permanent cart found for the user' });
    }

    const permCartID = permCartRows[0].cartID;

    // Check if the cart is empty
    const [cartProducts] = await pool.promise().query(
      'SELECT * FROM CartContainsProduct WHERE cartID = ?',
      [permCartID]
    );

    if (cartProducts.length > 0) {
      return res.status(400).json({ msg: 'Cart is not empty' });
    }

    // Delete the permanent cart if it is empty
    await pool.promise().query('DELETE FROM Cart WHERE cartID = ?', [permCartID]);

    res.status(200).json({ msg: 'Empty permanent cart deleted successfully' });
  } catch (err) {
    console.error('Error deleting permanent cart on logout:', err);
    res.status(500).json({ error: 'Failed to delete permanent cart' });
  }
};


//encapsulated function for internal use (namely for PDFAPI)
async function getCartData(req) {
  let cartData;

  // Create a mock response object with the necessary methods
  const mockRes = {
    status(code) {
      // Allow chaining by returning the same mock object
      this.statusCode = code;
      return this;
    },
    json(data) {
      cartData = data; // Capture the JSON response data
    },
    send(data) {
      cartData = data; // Capture data if `send` is used
    }
  };

  // Call getOrCreateCart with the mock response
  await getOrCreateCart(req, mockRes);

  // Check if cartData was populated
  if (!cartData) {
    throw new Error('No data returned from getOrCreateCart');
  }

  return cartData;
}


// const getOrCreateCart = async (req, res) => {
//   try {
//     // Retrieve fingerprint from cookies
//     let { fingerprint } = req.cookies;

//     if (!fingerprint) {
//       // Generate a new fingerprint (e.g., UUID)
//       fingerprint = require('crypto').randomUUID();

//       // Set the new fingerprint as a cookie
//       res.cookie('fingerprint', fingerprint, {
//         httpOnly: true, // Prevent client-side access to the cookie
//         security: true, // Secure cookie (HTTPS only)
//         maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration (1 week)
//       });
//       console.log('New fingerprint created:', fingerprint);

//       //fallback action/ create-as-you-fetch mechanism
//       // Create a new cart with the generated fingerprint
//       const [result] = await pool.promise().query(
//         'INSERT INTO Cart (totalPrice, numProducts, fingerprint, customerID) VALUES (?, ?, ?, ?)',
//         [0, 0, fingerprint, null] // No customerID for non-logged-in users
//       );
//       console.log('New cart created with ID:', result.insertId);
//     }

//     // Check if a cart exists for the current fingerprint, and ensure it is not older than 7 days
//     let [rows] = await pool.promise().query(
//       'SELECT * FROM Cart WHERE fingerprint = ? AND timeCreated >= NOW() - INTERVAL 7 DAY',
//       [fingerprint]
//     );

//     let cartID;

//     if (rows.length) {
//       // Cart exists, return it
//       cartID = rows[0].cartID; // Existing cart ID
//       console.log('Existing cart found with ID:', cartID);
      
//     } else {
//       //fallback action/ create-as-you-fetch mechanism
//       // Cart does not exist or has expired, create a new one
//       const [result] = await pool.promise().query(
//         'INSERT INTO Cart (totalPrice, numProducts, fingerprint, customerID) VALUES (?, ?, ?, ?)',
//         [0, 0, fingerprint, null] // No customerID for non-logged-in users
//       );
//       cartID = result.insertId; // New cart ID
//       console.log('New cart created with ID:', cartID);

//       [rows] = await pool.promise().query(
//         'SELECT * FROM Cart WHERE fingerprint = ? AND timeCreated >= NOW() - INTERVAL 7 DAY',
//         [fingerprint]
//       );
//     }

//     // Retrieve products in the CartContainsProduct table for the cartID
//     const [products] = await pool.promise().query(
//       'SELECT ccp.productID, ccp.quantity, p.name, p.unitPrice ' +
//       'FROM CartContainsProduct ccp ' +
//       'JOIN Product p ON ccp.productID = p.productID ' +
//       'WHERE ccp.cartID = ?',
//       [cartID]
//     );

//     rows[0].products = products;

//     return res.status(200).json(rows[0]);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch or create cart.' });
//   }
// };

// const addProductToCart = async (req, res) => {
//   try 
//   {
//     // Retrieve fingerprint from cookies
//     let { fingerprint } = req.cookies;
//     let { customerID } = req.user; // Assuming you have user info in req.user
//     const { productID }  = req.params; // Get product ID from the request parameter

//     if (!fingerprint) {
//       // Generate a new fingerprint (e.g., UUID)
//       fingerprint = require('crypto').randomUUID();

//       // Set the new fingerprint as a cookie
//       res.cookie('fingerprint', fingerprint, {
//         httpOnly: true, // Prevent client-side access to the cookie
//         security: true, // Secure cookie (HTTPS only)
//         maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration (1 week)
//       });
//       console.log('New fingerprint created:', fingerprint);

//       //fallback action/ create-as-you-fetch mechanism
//       // Create a new cart with the generated fingerprint
//       const [result] = await pool.promise().query(
//         'INSERT INTO Cart (totalPrice, numProducts, fingerprint, customerID) VALUES (?, ?, ?, ?)',
//         [0, 0, fingerprint, null] // No customerID for non-logged-in users
//       );
//       console.log('New cart created with ID:', result.insertId);
//     }

//     // Check if a cart exists for the current fingerprint, and ensure it is not older than 7 days
//     const [rows] = await pool.promise().query(
//       'SELECT * FROM Cart WHERE fingerprint = ? AND timeCreated >= NOW() - INTERVAL 7 DAY',
//       [fingerprint]
//     );
//     //timecreated
//     // console.log('Rows:', rows);
//     console.log(fingerprint);

//     let cartID;

//     if (rows.length) {
//       // Cart exists
//       cartID = rows[0].cartID; // Existing cart ID
//       console.log('Existing cart found with ID:', cartID);
//     } else 
//     {
//       //fallback action/ create-as-you-fetch mechanism
//       // Cart does not exist or has expired, create a new one
//       const [result] = await pool.promise().query(
//         'INSERT INTO Cart (totalPrice, numProducts, fingerprint, customerID) VALUES (?, ?, ?, ?)',
//         [0, 0, fingerprint, null] // No customerID for non-logged-in users
//       );
//       cartID = result.insertId; // New cart ID
//       console.log('New cart created with ID:', cartID);
//     }

//     // Add product to CartContainsProduct, incrementing quantity by 1
//     await pool.promise().query(
//       'INSERT INTO CartContainsProduct (cartID, productID, quantity) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE quantity = quantity + 1',
//       [cartID, productID]
//     );

//     // Update cart totals: numProducts and totalPrice
//     await pool.promise().query(
//       'UPDATE Cart SET numProducts = numProducts + 1, totalPrice = totalPrice + (SELECT unitPrice FROM Product WHERE productID = ?) WHERE cartID = ?',
//       [productID, cartID]
//     );

//     // console.log('Rows:', rows);


//     // Send response with success message and cart details
//     return res.status(201).json({
//       message: 'Product added to cart successfully.',
//       cartID: cartID,          // Return the cart ID
//       fingerprint: fingerprint  // Return the fingerprint
//     });
//   } 
//   catch (err) 
//   {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to add product to cart.' });
//   }
// };

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
    mergeCartsOnLogin,
    deletePermanentCartOnLogout,
    getCartData
  };
