// models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../DB/connect'); // Adjust the path as needed

const Product = sequelize.define('product', {
  productID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unitPrice: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  overallRating: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 0,
  },
  discountPercentage: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  description: {
    type: DataTypes.TEXT,
  },
  timeListed: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  brand: {
    type: DataTypes.STRING,
  },
  showProduct: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  supplierID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  material: {
    type: DataTypes.STRING,
  },
  capacityLitres: {
    type: DataTypes.DECIMAL(4, 1),
  },
  warrantyMonths: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  serialNumber: {
    type: DataTypes.STRING,
  },
  popularity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  }
}, {
  tableName: 'product', // Use the exact table name in the DB
  timestamps: false, // Disable automatic timestamp fields if your table doesn't have them
  underscored: true // Automatically convert camelCase to snake_case for column names
});

module.exports = Product;
