// import the Sequelize constructor from the library
const Sequelize = require('sequelize');
require('dotenv').config(); //-- for local variable caching

/*
  Create connection to our database, pass in your MySQL information for username
    and password.
*/

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.SERVER_PATH,
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
