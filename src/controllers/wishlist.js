const pool = require('../config/database');
const db = require('../config/database');
const { transporter } = require('../Services/mailTransporter');
const fs = require('fs');
const path = require('path');

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
        const [wishlistItems] = await pool.promise().query(
        `SELECT p.productID, p.name, p.unitPrice, p.stock, wi.addedTime
        FROM WishlistItems wi
        JOIN Product p ON wi.productID = p.productID
        WHERE wi.wishlistID = ?`, [wishlistID]);

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

        // //check if role is customer, deny access
        // if (req.role === 'customer') {
        //     return res.status(403).send('Access Denied');
        // }

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

        // //check if role is customer, deny access
        // if (req.role === 'customer') {
        //     return res.status(403).send('Access Denied');
        // }

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
        const { productIDs } = req.body;

        if (!productIDs || !Array.isArray(productIDs) || productIDs.length === 0) {
            return res.status(400).send('Product IDs are required');
        }

        // Create a map to store customer emails and their discounted products
        const customerProductsMap = new Map();

        for (const productID of productIDs) {
            // Fetch product details from the database
            const [productDetails] = await pool.promise().query(`
                SELECT productID, p.name, p.discountPercentage, p.stock, p.unitPrice, p.brand, p.material, p.description, p.overallRating
                FROM Product p
                WHERE p.productID = ?
            `, [productID]);

            if (productDetails.length === 0) {
                console.log(`No product found with ID: ${productID}`);
                continue;
            }

            const product = productDetails[0];

            // Skip products with zero discount
            if (product.discountPercentage === 0) {
                console.log(`Skipping product ID: ${productID} - No discount`);
                continue;
            }

            // Fetch the wishlists containing the product
            const [wishlistItems] = await pool.promise().query('SELECT wishlistID FROM WishlistItems WHERE productID = ?', [productID]);

            if (wishlistItems.length === 0) {
                console.log(`No wishlists found containing the product ID: ${productID}`);
                continue;
            }

            // Fetch the product image path
            const imagePath = await getProductImagePath(productID);

            // Read the image file
            let imageBuffer = null;
            if (imagePath) {
                try {
                    imageBuffer = fs.readFileSync(imagePath);
                } catch (err) {
                    console.error(`Error reading image file for product ID: ${productID}`, err);
                }
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
                    name: product.name,
                    productID: product.productID,
                    discountPercentage: product.discountPercentage,
                    stock: product.stock,
                    unitPrice: product.unitPrice,
                    brand: product.brand,
                    material: product.material,
                    description: product.description,
                    overallRating: product.overallRating,
                    imageBuffer
                });
            }
        }

        // Check if we have any products to send
        if (customerProductsMap.size === 0) {
            console.log('No emails to send - all products have zero discount');
            return res.status(200).send('No discount emails to send');
        }

        // Send an email to each customer with their discounted products
        for (const [customerEmail, products] of customerProductsMap.entries()) {
            // Skip customers with no discounted products
            if (products.length === 0) {
                console.log(`Skipping email to ${customerEmail} - no discounted products`);
                continue;
            }

            let emailContent = `
                <html>
                <h1 style="color: #333;">Exciting Discounts Just for You!</h1>
                <h5 style="color: #333;">The following products from your wishlist are now on sale:</h5>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #dedede; padding: 15px; border-radius: 8px; border: 1px solid #666;">
            `;

            const attachments = [];

            products.forEach((product, index) => {
                const cid = `product${index}@yourstore.com`;
                const discountedPrice = (product.unitPrice * (1 - product.discountPercentage / 100)).toFixed(2);
                const stars = '★'.repeat(product.overallRating) + '☆'.repeat(5 - product.overallRating);
                emailContent += `
                    <div style="max-width: 600px; margin: 0 auto;">
                        <table style="width: 100%; border-collapse: separate; border-spacing: 0; font-family: Arial, sans-serif; background-color: #dedede; margin-bottom: 15px; border-radius: 8px; border: 1px solid #f1f1f1;">
                            <!-- Product Container -->
                            <tr>
                                <!-- Image Cell - Fixed width, responsive image -->
                                <td style="width: 100px; min-width: 100px; padding: 15px; vertical-align: top;">
                                    <div style="width: 100%; text-align: center;">
                                        <img src="cid:${cid}" 
                                             alt="${product.name}" 
                                             style="max-width: 100px; 
                                                    width: 100%; 
                                                    height: auto; 
                                                    border-radius: 4px; 
                                                    display: block; 
                                                    margin: 0 auto;">
                                    </div>
                                </td>
                                
                                <!-- Details Cell - Flexible width -->
                                <td style="padding: 15px; vertical-align: top;">
                                    <div style="min-width: 200px;">
                                        <p style="margin: 2px 0; font-size: 13px; font-weight: bold; color: #666;">${product.brand}</p>
                                        <p style="margin: 0 0 10px 0; font-size: 14px; font-style: italic; font-weight: bold; color: #333;">${product.name}</p>
                                        <p style="margin: 5px 0; color: #666;">Discount: ${product.discountPercentage}%</p>
                                        <p style="margin: 5px 0; color: #666;">Stock: ${product.stock}</p>
                                        <p style="margin: 5px 0; color: #666;">Price: <s style="color: red;">$${product.unitPrice}</s> <strong style="color: green;">$${discountedPrice}</strong></p>
                                    </div>
                                </td>

                                <!-- Description Cell - Hide on mobile -->
                                <td style="padding: 15px; vertical-align: top; min-width: 150px;">
                                    <div style="text-align: center;">
                                        <p style="margin: 5px 0; color: black; font-size: 16px;">${stars}</p>
                                        <p style="margin: 5px 0; color: #555; font-style: italic; font-weight: bold; font-size: 16px;">${product.description}</p>
                                    </div>
                                </td>
                            </tr>

                            <!-- Button Row -->
                            <tr>
                                <td colspan="3" style="padding: 10px 15px;">
                                    <div style="text-align: center;">
                                        <a href="http://localhost:3000/product/${product.productID}" 
                                           style="display: inline-block;
                                                  width: 80%;
                                                  max-width: 200px;
                                                  text-decoration: none;
                                                  background-color: rgb(225, 168, 34);
                                                  color: #fff;
                                                  padding: 12px 24px;
                                                  border-radius: 4px;
                                                  font-size: 14px;
                                                  font-weight: bold;
                                                  text-align: center;
                                                  margin: 10px auto;
                                                  box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                            Purchase Now
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                `;

                if (product.imageBuffer) {
                    attachments.push({
                        filename: `${product.name}.png`,
                        content: product.imageBuffer,
                        cid: cid
                    });
                }
            });

            emailContent += `
                </body>
                <p style="font-size: 0.9em; color: #666;">This email was sent to you because you have these products in your wishlist.</p>
                </html>
            `;

            try {
                await sendEmail(customerEmail, 'Products Discounted', 'The following products from your wishlist are now on sale.', emailContent, attachments);
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

const getProductImagePath = async (productID) => {
    try {
        const sql = 'SELECT picturePath FROM `Pictures` WHERE productID = ?';
        const [results, fields] = await db.promise().query(sql, [productID]);

        if (results.length > 0) {
            return path.join(__dirname, '..', results[0].picturePath); // Adjust the path as necessary
        } else {
            console.log("Image not found");
            return null;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
};

const sendEmail = async (to, subject, text, html, attachments) => {
    const mailOptions = {
        from: 'zadados308@gmail.com',
        to,
        subject,
        text, // Plain text version of the email
        html, // HTML version of the email
        attachments // Attachments
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

const isProductInWishlist = async (req, res) => {
    try {
        const { customerID, productID } = req.params;

        if (!customerID) {
            return res.status(400).send('Customer ID is required');
        }

        if (!productID) {
            return res.status(400).send('Product ID is required');
        }

        // Get the wishlist for the customer
        const [wishlist] = await pool.promise().query('SELECT * FROM Wishlist WHERE customerID = ?', [customerID]);

        if (wishlist.length === 0) {
            return res.status(200).json({ exists: false });
        }

        const wishlistID = wishlist[0].wishlistID;

        // Check if product exists in wishlist
        const [existingProduct] = await pool.promise().query(
            'SELECT * FROM WishlistItems WHERE wishlistID = ? AND productID = ?',
            [wishlistID, productID]
        );

        return res.status(200).json({ exists: existingProduct.length > 0 });

    } catch (err) {
        console.error('Error checking product in wishlist:', err);
        res.status(500).send('Error checking product in wishlist');
    }
};

module.exports = {
    getOrCreateWishlist,
    addProductToWishlist,
    removeProductFromWishlist,
    deleteWishlist,
    getWishlistsContainingProduct,
    getWishlistByID,
    sendSaleEmail,
    isProductInWishlist
};