const express = require('express');
const router = express.Router();

//controllers
const pdfService = require('../Services/invoice');
const cartController = require('../controllers/cart');


router.get('/invoice', async (req, res, next) => {
  try {
    // Fetch data from the cart controller function
    const cartData = await cartController.getCartData(req);

    // Set headers once for PDF response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');

    // Generate and pipe the PDF
    const stream = pdfService.writeInvoice(cartData);
    stream.pipe(res);

  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).json({ message: 'Failed to generate invoice.' });
  }
});

module.exports = router;