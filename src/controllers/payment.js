const db = require('../config/database');

const processPayment = async (req, res) => {
  try {
    //check if the credit card is valid
    if (!req.body.creditCard) {
      res.status(400).json({msg: "Missing credit card"});
      return;
    }

    //check if the credit card is valid
    if (!req.body.creditCard.cardNumber || !req.body.creditCard.expiryDate || !req.body.creditCard.cvv) {
      res.status(400).json({msg: "Invalid credit card"});
      console.log("a field is missing");
      return;
    }

    //check if the fields are valid
    if (req.body.creditCard.cardNumber.length !== 16 || req.body.creditCard.cvv.length !== 3 || req.body.creditCard.expiryDate.length !== 5) {
      res.status(400).json({msg: "Invalid credit card"});
      console.log("wrong length");
      return;
    }

    //check if the expiry date is valid
    let expiryDate = req.body.creditCard.expiryDate.split('/');
    if (expiryDate.length !== 2 || expiryDate[0].length !== 2 || expiryDate[1].length !== 2) {
      res.status(400).json({msg: "Invalid expiry date"});
      console.log("wrong expiry date format");
      return;
    }

    if (expiryDate[1] < 25) {
      res.status(400).json({msg: "Card expired"});
      console.log("card expired");
      return;
    }

    return res.status(200).json({msg: "Payment processed"});

  } catch (err) {
    console.log(err);
    res.status(500).json({msg: "Error processing payment"});
  }
}

module.exports = {
  processPayment
}

