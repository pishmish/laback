require('dotenv').config();

const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: process.env.MYSQL_DIALECT,
  }
);

// Paths to your SQL files
const createTableFilePath = path.join(__dirname, 'setup.sql');
const insertDataFilePath = path.join(__dirname, 'sampleData.sql');

// Read SQL files asynchronously for better performance
async function readSqlFiles() {
  try {
    const createTableSql = await fs.promises.readFile(createTableFilePath, 'utf8');
    const insertDataSql = await fs.promises.readFile(insertDataFilePath, 'utf8');
    return { createTableSql, insertDataSql };
  } catch (error) {
    console.error('Error reading SQL files:', error);
    throw error;
  }
}

// Function to check if tables exist in the database
async function checkIfTablesExist() {
  try {
    const query = `SHOW TABLES`;
    const [tables] = await sequelize.query(query);
    return tables.length > 0;  // This can be refined by checking specific tables
  } catch (error) {
    console.error('Error checking table existence:', error);
    throw error;
  }
}

// Function to initialize the database by running SQL files
async function initializeDatabase() {
  if (process.env.NODE_ENV === 'development') {
    try {
      // Check connection to the database
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');

      // Read SQL files
      const { createTableSql, insertDataSql } = await readSqlFiles();

      // Check if tables already exist
      const tablesExist = await checkIfTablesExist();

      if (!tablesExist) {
        console.log('Tables do not exist. Running CREATE TABLE and INSERT INTO statements...');

        // Run the CREATE TABLE SQL to initialize schema
        await sequelize.query(createTableSql);
        console.log('Tables created successfully.');

        // Run the INSERT INTO SQL to populate data
        await sequelize.query(insertDataSql);
        console.log('Data inserted successfully.');
      } else {
        console.log('Tables already exist. Skipping database initialization.');
      }
    } catch (error) {
      console.error('Unable to initialize/connect to the database:', error);
    }
  } else {
    console.log('Skipping database initialization in non-development environment.');
  }
}

initializeDatabase();

// const result = sequelize.query('SELECT * FROM Product', { type: sequelize.QueryTypes.SELECT });
// console.log(result);


module.exports = sequelize;


// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
// });

// module.exports = pool

// require ('dotenv').config();

// const { Sequelize } = require('sequelize');
// const fs = require('fs');
// const path = require('path');

// const sequelize = new Sequelize(
//     process.env.MYSQL_DATABASE,
//     process.env.MYSQL_USER,
//     process.env.MYSQL_PASSWORD,
//     {
//         host: process.env.MYSQL_HOST,
//         dialect: process.env.MYSQL_DIALECT
//     }
// );

// // Paths to your SQL files
// const createTableFilePath = path.join(__dirname, 'DB', 'setup.sql');
// const insertDataFilePath = path.join(__dirname, 'DB', 'sampleData.sql');

// // Read SQL files
// const createTableSql = fs.readFileSync(createTableFilePath, 'utf8');
// const insertDataSql = fs.readFileSync(insertDataFilePath, 'utf8');

// const sqlFilePath = path.join(__dirname, 'DB', 'database.sql');
// const sql = fs.readFileSync(sqlFilePath, 'utf8');

// // Function to check if tables exist in the database
// async function checkIfTablesExist() {
//     const query = `SHOW TABLES`;
//     const [tables] = await sequelize.query(query);
//     return tables.length > 0;
//   }
  
//   // Function to initialize the database by running SQL files
//   async function initializeDatabase() {
//     if (process.env.NODE_ENV === 'development') {
//       try {
//         // Check connection to the database
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
  
//         // Check if tables already exist
//         const tablesExist = await checkIfTablesExist();
  
//         if (!tablesExist) {
//           console.log('Tables do not exist. Running CREATE TABLE and INSERT INTO statements...');
  
//           // Run the CREATE TABLE SQL to initialize schema
//           await sequelize.query(createTableSql);
//           console.log('Tables created successfully.');
  
//           // Run the INSERT INTO SQL to populate data
//           await sequelize.query(insertDataSql);
//           console.log('Data inserted successfully.');
//         } else {
//           console.log('Tables already exist. Skipping database initialization.');
//         }
//       } catch (error) {
//         console.error('Unable to initialize/connect the database:', error);
//       }
//     } else {
//       console.log('Skipping database initialization in non-development environment.');
//     }
//   }
  
//   initializeDatabase();
  
//   module.exports = sequelize;
