const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken; // Retrieve token from cookies

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }

        // Attach the decoded token payload to req
        req.username = user.id;
        req.role = user.role;
        req.customerID = user.customerID;

        next();
    });
};

// Middleware to check user role
const authenticateRole = (requiredRole) => {
    return (req, res, next) => {
        if (req.role !== requiredRole) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
        next();
    };
};

module.exports = {
    authenticateToken,
    authenticateRole,
};
