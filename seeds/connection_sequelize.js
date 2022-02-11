//-- IMPORTS
const Sequelize = require('sequelize'); // for drop add tables in employee_db
require('dotenv').config(); //-- for local variable caching

//-- MAKE sequelize obj to play as ORM
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.SERVER_PATH,
    dialect: 'mysql',
    port: 3306
  },
  console.log(`//-- Connection MYSQL database with npm package Sequelize success!`)
);

//-- exporting created sequelize obj
module.exports = sequelize;
