// const pool = require('../config/database');

// const getCartProducts = async (req, res) => {
//     try {
//       // Retrieve fingerprint from cookies
//       const { fingerprint } = req.cookies;
  
//       // If fingerprint is not provided, return an error
//       if (!fingerprint) {
//         return res.status(400).json({ error: 'Fingerprint is required' });
//       }
  
//       // Check if the cart exists for the given fingerprint
//       const [cartRows] = await pool.promise().query(
//         'SELECT cartID FROM Cart WHERE fingerprint = ?',
//         [fingerprint]
//       );
  
//       // If no cart is found, return an error
//       if (cartRows.length === 0) {
//         return res.status(404).json({ error: 'Cart not found' });
//       }
  
//       // Get the cartID from the first row (assuming only one cart per fingerprint)
//       const cartID = cartRows[0].cartID;
//       console.log('Found cartID:', cartID);
  
//       // Retrieve products in the CartContainsProduct table for the cartID
//       const [products] = await pool.promise().query(
//         'SELECT ccp.productID, ccp.quantity, p.name, p.unitPrice ' +
//         'FROM CartContainsProduct ccp ' +
//         'JOIN Product p ON ccp.productID = p.productID ' +
//         'WHERE ccp.cartID = ?',
//         [cartID]
//       );
  
//       // If no products are found, return an empty cart
//       if (products.length === 0) {
//         return res.status(200).json({
//           message: 'Your cart is empty',
//           cartID: cartID,
//           products: []
//         });
//       }
  
//       // Return the products in the cart
//       return res.status(200).json({
//         cartID: cartID,
//         products: products
//       });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Failed to retrieve cart products' });
//     }
//   };
  
// module.exports = {
//     getCartProducts
// }