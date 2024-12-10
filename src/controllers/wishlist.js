const pool = require('../config/database');
const { transporter } = require('../Services/mailTransporter');

const getOrCreateWishlist = async (req, res) => {
    try {
        const { customerID } = req.params;

        if (!customerID) {
            return res.status(400).send('Customer ID is required');
        }

        // Check if a wishlist already exists for the customer
        const [wishlist] = await pool.promise().query('SELECT * FROM Wishlist WHERE customerID = ?', [customerID]);

        let wishlistID;
        if (wishlist.length === 0) {
            // Create a new wishlist for the customer
            await pool.promise().query('INSERT INTO Wishlist (customerID) VALUES (?)', [customerID]);
            const [newWishlist] = await pool.promise().query('SELECT * FROM Wishlist WHERE customerID = ?', [customerID]);
            wishlistID = newWishlist[0].wishlistID;
        } else {
            wishlistID = wishlist[0].wishlistID;
        }

        // Fetch the wishlist items
        const [wishlistItems] = await pool.promise().query('SELECT productID, addedTime FROM WishlistItems WHERE wishlistID = ?', [wishlistID]);

        // Combine the wishlist and its items
        const response = {
            wishlistID,
            customerID, ///or ...wishlist[0] for both
            items: wishlistItems
        };

        res.status(200).json(response);
    } catch (err) {
        console.error('Error fetching or creating wishlist:', err);
        res.status(500).send('Error fetching or creating wishlist');
    }
}

const addProductToWishlist = async (req, res) => {
    try {
        const { customerID, productID } = req.params;

        if (!customerID) {
            return res.status(400).send('Customer ID is required');
        }

        if (!productID) {
            return res.status(400).send('Product ID is required');
        }

        // Check if the wishlist exists for the customer
        let [wishlist] = await pool.promise().query('SELECT * FROM Wishlist WHERE customerID = ?', [customerID]);

        if (wishlist.length === 0) {
            // Create a new wishlist for the customer
            await pool.promise().query('INSERT INTO Wishlist (customerID) VALUES (?)', [customerID]);
            [wishlist] = await pool.promise().query('SELECT * FROM Wishlist WHERE customerID = ?', [customerID]);
        }

        const wishlistID = wishlist[0].wishlistID;

        // Check if the product is already in the wishlist
        const [existingProduct] = await pool.promise().query('SELECT * FROM WishlistItems WHERE wishlistID = ? AND productID = ?', [wishlistID, productID]);

        if (existingProduct.length > 0) {
            return res.status(400).send('Product is already in the wishlist');
        }

        // Add the product to the wishlist
        await pool.promise().query('INSERT INTO WishlistItems (wishlistID, productID) VALUES (?, ?)', [wishlistID, productID]);
        res.status(201).send('Product added to wishlist');
    } catch (err) {
        console.error('Error adding product to wishlist:', err);
        res.status(500).send('Error adding product to wishlist');
    }
}

const removeProductFromWishlist = async (req, res) => {
    try {
        const { customerID, productID } = req.params;

        if (!customerID) {
            return res.status(400).send('Customer ID is required');
        }

        if (!productID) {
            return res.status(400).send('Product ID is required');
        }

        // Check if the wishlist exists for the customer
        const [wishlist] = await pool.promise().query('SELECT * FROM Wishlist WHERE customerID = ?', [customerID]);

        if (wishlist.length === 0) {
            return res.status(404).send('Wishlist not found');
        }

        const wishlistID = wishlist[0].wishlistID;

        // Check if the product is in the wishlist
        const [existingProduct] = await pool.promise().query('SELECT * FROM WishlistItems WHERE wishlistID = ? AND productID = ?', [wishlistID, productID]);

        if (existingProduct.length === 0) {
            return res.status(404).send('Product not found in wishlist');
        }

        // Remove the product from the wishlist
        await pool.promise().query('DELETE FROM WishlistItems WHERE wishlistID = ? AND productID = ?', [wishlistID, productID]);
        res.status(200).send('Product removed from wishlist');
    } catch (err) {
        console.error('Error removing product from wishlist:', err);
        res.status(500).send('Error removing product from wishlist');
    }
}

const deleteWishlist = async (req, res) => {
    try {
        const { customerID } = req.params;

        if (!customerID) {
            return res.status(400).send('Customer ID is required');
        }

        // Check if the wishlist exists for the customer
        const [wishlist] = await pool.promise().query('SELECT * FROM Wishlist WHERE customerID = ?', [customerID]);

        if (wishlist.length === 0) {
            return res.status(404).send('Wishlist not found');
        }

        const wishlistID = wishlist[0].wishlistID;

        // Delete the wishlist
        await pool.promise().query('DELETE FROM Wishlist WHERE wishlistID = ?', [wishlistID]);
        res.status(200).send('Wishlist deleted');
    } catch (err) {
        console.error('Error deleting wishlist:', err);
        res.status(500).send('Error deleting wishlist');
    }
}

const getWishlistsContainingProduct = async (req, res) => {
    try {
        const { productID } = req.params;

        if (!productID) {
            return res.status(400).send('Product ID is required');
        }

        //gonna be useful for getting customers who have the product in their wishlist
        const query = `
            SELECT w.*
            FROM Wishlist w
            JOIN WishlistItems wi ON w.wishlistID = wi.wishlistID
            WHERE wi.productID = ?
        `;

        const [wishlists] = await pool.promise().query(query, [productID]);
        res.status(200).json(wishlists);
    } catch (err) {
        console.error('Error fetching wishlists containing product:', err);
        res.status(500).send('Error fetching wishlists containing product');
    }
}

//if you need the WishlistContainsProduct entries instead
// const getWishlistsContainingProduct = async (req, res) => {
//     try {
//         const { productID } = req.params;
//         const [wishlists] = await pool.promise().query('SELECT * FROM WishlistItems WHERE productID = ?', [productID]);
//         res.status(200).json(wishlists);
//     } catch (err) {
//         res.status(500).send('Error fetching wishlists containing product');
//     }
// }

const getWishlistByID = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send('Wishlist ID is required');
        }

        // Fetch the wishlist entry
        const [wishlist] = await pool.promise().query('SELECT * FROM Wishlist WHERE wishlistID = ?', [id]);

        if (wishlist.length === 0) {
            return res.status(404).send('Wishlist not found');
        }

        // Fetch the wishlist items
        const [wishlistItems] = await pool.promise().query('SELECT productID, addedTime FROM WishlistItems WHERE wishlistID = ?', [id]);

        // Combine the wishlist and its items
        const response = {
            ...wishlist[0],
            items: wishlistItems
        };

        res.status(200).json(response);
    } catch (err) {
        console.error('Error fetching wishlist by ID:', err);
        res.status(500).send('Error fetching wishlist by ID');
    }
}

const sendSaleEmail = async (req, res) => {
    try {
        const products = req.body;

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).send('Product details are required');
        }

        // Create a map to store customer emails and their discounted products
        const customerProductsMap = new Map();

        for (const product of products) {
            const { productID, productName, discountPercentage } = product;

            if (!productID || !productName || discountPercentage === undefined) {
                return res.status(400).send('Product ID, name, and discount percentage are required for each product');
            }

            // Fetch the wishlists containing the product
            const [wishlistItems] = await pool.promise().query('SELECT wishlistID FROM WishlistItems WHERE productID = ?', [productID]);

            if (wishlistItems.length === 0) {
                console.log(`No wishlists found containing the product ID: ${productID}`);
                continue;
            }

            // Aggregate products for each customer
            for (const wishlistItem of wishlistItems) {
                const wishlistID = wishlistItem.wishlistID;

                // Fetch the customer's ID using the wishlistID
                const [wishlists] = await pool.promise().query('SELECT customerID FROM Wishlist WHERE wishlistID = ?', [wishlistID]);
                if (wishlists.length === 0) {
                    console.log(`No wishlist found with ID: ${wishlistID}`);
                    continue;
                }
                const customerID = wishlists[0].customerID;

                // Fetch the customer's username
                const [customer] = await pool.promise().query('SELECT username FROM Customer WHERE customerID = ?', [customerID]);
                if (customer.length === 0) {
                    console.log(`No customer found with ID: ${customerID}`);
                    continue;
                }
                const username = customer[0].username;

                // Fetch the user's email using the username
                const [user] = await pool.promise().query('SELECT email FROM User WHERE username = ?', [username]);
                if (user.length === 0) {
                    console.log(`No user found with username: ${username}`);
                    continue;
                }
                const customerEmail = user[0].email;

                if (!customerProductsMap.has(customerEmail)) {
                    customerProductsMap.set(customerEmail, []);
                }

                customerProductsMap.get(customerEmail).push({
                    productName,
                    productID,
                    discountPercentage
                });
            }
        }

        // Send an email to each customer with their discounted products
        for (const [customerEmail, products] of customerProductsMap.entries()) {
            let emailContent = 'The following products from your wishlist are now discounted:\n\n';
            products.forEach(product => {
                emailContent += `- ${product.productName} (ID: ${product.productID}) is now discounted by ${product.discountPercentage}%\n`;
            });

            try {
                await sendEmail(customerEmail, 'Products Discounted', emailContent);
            } catch (err) {
                console.error(`Error sending email to ${customerEmail}:`, err.message);
                console.error('Error details:', err);
            }
        }

        res.status(200).send('Discount emails sent');
    } catch (err) {
        console.error('Error sending discount emails:', err.message);
        console.error('Error details:', err);
        res.status(500).send('Error sending discount emails');
    }
};

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: 'zadados308@gmail.com',
        to,
        subject,
        text,
    };

    try {
        // Validate the email address
        if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
            throw new Error('Invalid or missing email address.');
        }
        
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error.message);
        console.error('Error details:', error);
        throw error;
    }
};

// let htmlContent = `
//     <h1 style="color: #333;">The following products from your wishlist are now discounted:</h1>
//     <ul style="list-style-type: none; padding: 0;">
// `;
// products.forEach(product => {
//     htmlContent += `
//         <li style="margin-bottom: 10px;">
//             <strong>${product.productName}</strong> (ID: ${product.productID}) is now discounted by <strong>${product.discountPercentage}%</strong>
//         </li>
//     `;
// });
// htmlContent += '</ul>';

// const sendSaleEmail = async (req, res) => {
//     try {
//         const products = req.body;

//         if (!products || !Array.isArray(products) || products.length === 0) {
//             return res.status(400).send('Product details are required');
//         }

//         // Create a map to store customer emails and their discounted products
//         const customerProductsMap = new Map();

//         for (const product of products) {
//             const { productID, productName, discountPercentage } = product;

//             if (!productID || !productName || discountPercentage === undefined) {
//                 return res.status(400).send('Product ID, name, and discount percentage are required for each product');
//             }

//             // Fetch the wishlists containing the product
//             const [wishlists] = await pool.promise().query('SELECT * FROM WishlistItems WHERE productID = ?', [productID]);

//             if (wishlists.length === 0) {
//                 console.log(`No wishlists found containing the product ID: ${productID}`);
//                 continue;
//             }

//             // Aggregate products for each customer
//             for (const wishlist of wishlists) {
//                 const customerID = wishlist.customerID;

//                 // Fetch the customer's email
//                 const [customer] = await pool.promise().query('SELECT email FROM Customer WHERE customerID = ?', [customerID]);
//                 const customerEmail = customer[0].email;

//                 if (!customerProductsMap.has(customerEmail)) {
//                     customerProductsMap.set(customerEmail, []);
//                 }

//                 customerProductsMap.get(customerEmail).push({
//                     productName,
//                     productID,
//                     discountPercentage
//                 });
//             }
//         }

//         // Send an email to each customer with their discounted products
//         for (const [customerEmail, products] of customerProductsMap.entries()) {
//             let emailContent = 'The following products from your wishlist are now discounted:\n\n';
//             let htmlContent = '<h1>The following products from your wishlist are now discounted:</h1><ul>';
//             products.forEach(product => {
//                 emailContent += `- ${product.productName} (ID: ${product.productID}) is now discounted by ${product.discountPercentage}%\n`;
//                 htmlContent += `<li>${product.productName} (ID: ${product.productID}) is now discounted by ${product.discountPercentage}%</li>`;
//             });
//             htmlContent += '</ul>';

//             await sendEmail(customerEmail, 'Products Discounted', emailContent, htmlContent);
//         }

//         res.status(200).send('Discount emails sent');
//     } catch (err) {
//         console.error('Error sending discount emails:', err);
//         res.status(500).send('Error sending discount emails');
//     }
// };

// const sendEmail = async (to, subject, text, html) => {
//     const mailOptions = {
//         from: 'zadados308@gmail.com',
//         to,
//         subject,
//         text,
//         html, // Add the HTML content here
//     };

//     try {
//         // Validate the email address
//         if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
//             throw new Error('Invalid or missing email address.');
//         }
        
//         await transporter.sendMail(mailOptions);
//         console.log('Email sent successfully');
//     } catch (error) {
//         console.error('Error sending email:', error);
//         throw error;
//     }
// };

// const sendSaleEmail = async (req, res) => {
//     try {
//         const { productID } = req.params;

//         if (!productID) {
//             return res.status(400).send('Product ID is required');
//         }

//         // Fetch the wishlists containing the product
//         const [wishlists] = await pool.promise().query('SELECT * FROM WishlistItems WHERE productID = ?', [productID]);

//         if (wishlists.length === 0) {
//             return res.status(404).send('No wishlists found containing the product');
//         }

//         // Send an email to each customer with the wishlist containing the product
//         wishlists.forEach(async (wishlist) => {
//             const customerID = wishlist.customerID;

//             // Fetch the customer's email
//             const [customer] = await pool.promise().query('SELECT email FROM Customer WHERE customerID = ?', [customerID]);
//             const customerEmail = customer[0].email;

//             // Send the email
//             await mailSender(customerEmail, 'Product on Sale', `The product with ID ${productID} is now on sale!`);
//         });

//         res.status(200).send('Sale emails sent');
//     } catch (err) {
//         console.error('Error sending sale emails:', err);
//         res.status(500).send('Error sending sale emails');
//     }
// }

module.exports = {
    getOrCreateWishlist,
    addProductToWishlist,
    removeProductFromWishlist,
    deleteWishlist,
    getWishlistsContainingProduct,
    getWishlistByID,
    sendSaleEmail
};