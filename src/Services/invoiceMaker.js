
const PDFDocument = require('pdfkit');
const fs = require('fs');

const mailService = require('./mailTransporter')
const cartController = require('../controllers/cart');
const orderController = require('../controllers/order');


function writeInvoice(data) {
    const doc = new PDFDocument();
    const stream = doc.pipe(new require('stream').PassThrough());

    // Add a title
    doc.fontSize(25).text('Zad à Dos', { align: 'center'});
    doc.moveDown();

    //Receipt table:

    // Add a table header for the products
    doc.fontSize(14).text('Invoice', { underline: true });
    doc.moveDown();

        // Add a table header for the products
        const tableHeader = ['Product Name', 'Quantity', 'Unit Price'];
        const columnWidths = [200, 100, 100];
        const startX = doc.x;
        const startY = doc.y;
    
        doc.fontSize(12)
            .text(tableHeader[0], startX, startY)
            .text(tableHeader[1], startX + columnWidths[0], startY)
            .text(tableHeader[2], startX + columnWidths[0] + columnWidths[1], startY, { align: 'right' });
    
        doc.moveDown(0.5);
    
        // Iterate over the orderItems array
        data.orderItems.forEach((item) => {
            const y = doc.y;
            doc.text(item.productName, startX, y)
                .text(item.quantity, startX + columnWidths[0], y)
                .text(`$${item.purchasePrice}`, startX + columnWidths[0] + columnWidths[1], y, { align: 'right' });
        });
    
        doc.moveDown();

    doc.moveDown();


    // Add general invoice info
    doc.fontSize(12).text(`Number of Products: ${data.orderItems.length}`, { align: 'right' });
    doc.moveDown();
    doc.fontSize(16).text(`Receipt ID: ${data.orderNumber}`, { align: 'right'});
    doc.moveDown();
    doc.fontSize(14).text(`Total Price: $${data.totalPrice}`, { align: 'right' });


    // Finalize the document
    doc.end();

    return doc;

}

const mailSender = async (req, res) => {
    try {        
        // Get the email address from the query parameters
        const recipientEmail = req.params.email;
        console.log(recipientEmail);

        // Validate the email address
        if (!recipientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
        return res.status(400).json({ message: 'Invalid or missing email address.' });
        }

        // Fetch data from the cart controller function
        const orderDataObject = await orderController.getOrderDataWrapper(req); //need to change to order controller function

        // Generate PDF as a buffer
        const pdfStream = writeInvoice(orderDataObject);

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
}

module.exports = { writeInvoice, mailSender };