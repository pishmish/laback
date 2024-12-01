const PDFDocument = require('pdfkit');
const fs = require('fs');

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

    //Create the product
    // Create the product table
    const tableHeader = ['Product Name', 'Quantity', 'Unit Price'];
    doc.fontSize(12).text(
    `${tableHeader[0]} | ${tableHeader[1]} | ${tableHeader[2]}`,
    { underline: true }
    );

    doc.moveDown(0.5)
    // Iterate over the products array
    data.products.forEach((product) => {
        doc.text(
        `${product.name} | ${product.quantity} | $${product.unitPrice}`,
        { indent: 10 }
        );
    });

    doc.moveDown();

    // Add general invoice info
    doc.text(`Number of Products: ${data.numProducts}`, { align: 'left'});
    doc.fontSize(16).text(`Receipt ID: ${data.cartID}`, { align: 'left'});

    // Add the total price at the end
    doc.fontSize(14).text(`Total Price: $${data.totalPrice}`, { align: 'right' });

    // Finalize the document
    doc.end();

    return doc;

}

module.exports = { writeInvoice };