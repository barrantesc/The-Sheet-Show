//-- Imported by anything that uses SQL Database connection

// Import and require mysql2
const mysql = require('mysql2/promise');
require('dotenv').config(); //-- for local variable caching


const db = mysql.createPool({
  host: process.env.SERVER_PATH,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
  },
  console.log(`//-- Connection MYSQL database with npm package mysql2 success!`)
);



//-- exporting created sequelize obj
module.exports = db;