const db = require('../config/database');
const axios = require('axios');

const setDiscount = async (req, res) => {
    try {
        // Update discount percentage of a particular product
        let sql1 = 'UPDATE `Product` SET discountPercentage = ? WHERE productID = ?';
        const [results1, fields1] = await db.promise().query(sql1, [req.body.discountPercentage, req.params.id]);
        if (results1.affectedRows === 0) {
            res.status(404).json({msg: "Product not found"});
            return;
        }

        //only notify users if the discount is being set and not being removed (i.e being set to zero)
        if (req.body.discountPercentage != 0){ 
            // Get the product details
            let sql2 = 'SELECT * FROM `Product` WHERE productID = ?';
            const [results2, fields2] = await db.promise().query(sql2, [req.params.id]);
            if (results2.length === 0) {
                res.status(404).json({msg: "Product not found"});
                return;
            }

            // call the existing endpoint to notify the users who have this product in their wishlist
            const notifyURL = `http://localhost:5001/wishlist/sendmail`;
            await axios.post(notifyURL, results2[0]);
            res.status(200).json({msg: "Discount set and users notified successfully"});  
        }

    } catch(err) {
        console.log(err);
        res.status(500).json({msg: "Error setting discount"});
    }
};



module.exports = {
    setDiscount
};