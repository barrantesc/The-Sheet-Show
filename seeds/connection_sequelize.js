//-- IMPORTS
const Sequelize = require('sequelize'); // for drop add tables in employee_db
require('dotenv').config(); //-- for local variable caching


//-- Create placeholder for sequelize
let sequelize;


//-- MAKE sequelize obj for JawsDB on Heroku instance
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} 
//-- MAKE sequelize obj for local MySQL instance
else {
  sequelize = new Sequelize(
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
}
//-- exporting created sequelize obj
module.exports = sequelize;
