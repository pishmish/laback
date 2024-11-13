const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../DB/connect');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(64),
    allowNull: false,
    validate: {
      isEmail: true, // Validates that email is in proper format
      is: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, // Custom regex to enforce format '%_@__%.__%'
    },
  },
  username: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true,  // Ensures that username is unique
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
    validate: {
      len: [64, 64], // Ensures password length is exactly 64 characters
    },
  },
}, {
  tableName: 'User',  // Ensure it matches your table name in the DB
  timestamps: false,  // Assuming no automatic timestamps
  indexes: [
    {
      unique: true,
      fields: ['username'],  // This enforces unique constraint on `username`
    },
  ],
});

module.exports = User;
