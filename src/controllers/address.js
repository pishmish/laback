const db = require('../config/database');

const getAddressById = async (addressid) => {
  try {
    let sql = `SELECT * FROM Address WHERE addressID = ?`;
    const [results, fields] = await db.promise().query(sql, [addressid]);
    if (results.length === 0) {
      throw new Error('Address not found');
    }
    return results;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

const getAddress = async (req, res) => {
  try {
    const addressid = req.params.addressid;
    const address = await getAddressById(addressid);
    return res.status(200).json(address[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};

const getUserAddress = async (req, res) => {
  try {
    //get the address id from customer table
    const username = req.params.username;
    let sql = `SELECT * FROM Customer WHERE username = ?`;
    const [results, fields] = await db.promise().query(sql, [username]);

    if (results.length === 0) {
      throw new Error('User not found');
    }

    //get the address from address table
    addressid = results[0].addressID;
    const address = await getAddressById(addressid);

    return res.status(200).json(address[0]);

  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};

const getPersonalAddress = async (req, res) => {
  try {
    //should get username from authentication cookie
    const username = req.username;

    let sql = `SELECT * FROM Customer WHERE username = ?`;
    const [results, fields] = await db.promise().query(sql, [username]);

    if (results.length === 0) {
      throw new Error('User not found');
    }

    //find the address
    addressid = results[0].addressID;
    const address = await getAddressById(addressid);

    return res.status(200).json(address[0]);

  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

const createAddress = async (req, res) => {
  //this function should be called when creating addresses for billing ids and other things, should not be used for Customers. Their addresses are created when they sign up, and they can only be updated.
  
  try {
    //check if role is customer, deny access
    if (req.role === 'customer') {
      return res.status(403).send('Access Denied');
    }

    //create the address
    let sql = `INSERT INTO Address (addressTitle, country, city, province, zipCode, streetAddress, longitude, latitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [results, fields] = await db.promise().query(sql, [req.body.addressTitle, req.body.country, req.body.city, req.body.province, req.body.zipCode, req.body.streetAddress, req.body.longitude, req.body.latitude]);

    return res.status(200).send('Address created');

  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

const updateAddress = async (req, res) => {
  try {
    const addressid = req.params.addressid;
    
    let { addressTitle, country, city, province, zipCode, streetAddress, longitude, latitude } = req.body;
    
    let fields = [];
    
    //check what's there to update
    if (addressTitle) fields.push(`addressTitle = '${addressTitle}'`);
    if (country) fields.push(`country = '${country}'`);
    if (city) fields.push(`city = '${city}'`);
    if (province) fields.push(`province = '${province}'`);
    if (zipCode) fields.push(`zipCode = '${zipCode}'`);
    if (streetAddress) fields.push(`streetAddress = '${streetAddress}'`);
    if (longitude) fields.push(`longitude = '${longitude}'`);
    if (latitude) fields.push(`latitude = '${latitude}'`);

    let sql = `UPDATE Address SET ${fields.join(', ')} WHERE addressID = ?`;
    const [results, fields2] = await db.promise().query(sql, [addressid]);

    return res.status(200).send('Address updated');
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const addressid = req.params.addressid;
    let sql = `DELETE FROM Address WHERE addressID = ?`;
    const [results, fields] = await db.promise().query(sql, [addressid]);

    return res.status(200).send('Address deleted');
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

const getAddressWrapper = async (req) => { // Wrapper function for invoice Areeb shenanigans
  let addressData;

  // Create a mock response object with the necessary methods
  const mockRes = {
    status(code) {
      // Allow chaining by returning the same mock object
      this.statusCode = code;
      return this;
    },
    json(data) {
      addressData = data; // Capture the JSON response data
    },
    send(data) {
      addressData = data; // Capture data if `send` is used
    }
  };

  // Call getAddress with the mock response
  await getAddress(req, mockRes);

  // Check if addressData was populated
  if (!addressData) {
    throw new Error('No data returned from getAddress');
  }

  return addressData;
}

module.exports = {
  getAddress,
  getUserAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  getPersonalAddress,
  getAddressWrapper
};
