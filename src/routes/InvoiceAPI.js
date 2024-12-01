const express = require('express');
const router = express.Router();

//controllers and services
const pdfService = require('../Services/invoiceMaker');
const mailService = require('../Services/mailTransporter')
const cartController = require('../controllers/cart');


router.get('/mail', async (req, res, next) => {
    try {
        
        // Get the email address from the query parameters
        const recipientEmail = req.query.email;

        // Validate the email address
        if (!recipientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
        return res.status(400).json({ message: 'Invalid or missing email address.' });
        }

        // Fetch data from the cart controller function
        const cartData = await cartController.getCartData(req);

        // Generate PDF as a buffer
        const pdfStream = pdfService.writeInvoice(cartData);

        //listening for data from the stream
        let chunks = [];
        pdfStream.on('data', (chunk) => chunks.push(chunk));

        //when the stream ends (i.e when all data has been received), process the remaining chunks
        pdfStream.on('end', async () => {
            //combine all collected chunks into a single buffer
            const pdfBuffer = Buffer.concat(chunks);

            // Send email with PDF attachment
            const mailOptions = {
                from: 'zadados308@gmail.com',
                to: recipientEmail, // Replace with recipient's email
                subject: 'Your Invoice',
                text: 'Please find your invoice attached.',
                attachments: [
                    {
                    filename: 'invoice.pdf',
                    content: pdfBuffer,
                    contentType: 'application/pdf',
                    },
                ],
            };

            try {
                await mailService.transporter.sendMail(mailOptions);
                console.log('Email sent successfully');

                // Respond to the API caller with success message
                res.status(200).json({ message: 'Invoice sent successfully via email.' });
            } catch (emailError) {
                console.error('Error sending email:', emailError);
                res.status(500).json({ message: 'Failed to send invoice via email.' });
            }
        });

        pdfStream.on('error', (streamError) => {
            console.error('Error generating PDF:', streamError);
            res.status(500).json({ message: 'Failed to generate invoice PDF.' });
        });
            
    } catch (error) {
        console.error('Error generating invoice:', error);
        res.status(500).json({ message: 'Failed to generate invoice.' });
    } 
});

module.exports = router;