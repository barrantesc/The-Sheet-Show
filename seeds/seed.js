//------------------------------------------------------------------------------
//-- IMPORTS



//------------------------------------------------------------------------------
//-- Building seed database with mysql2 

async function seedDatabase () {
  require('dotenv').config(); //-- for local variable caching

  const db = require('./connection_mysql2')
  // execute in parallel, next console.log in 3 seconds
  try {
    await Promise.all([
      db.query('DROP DATABASE IF EXISTS sheet_show'),
      db.query('select sleep(2)'),
      db.query('CREATE DATABASE sheet_show'),
    ]);
    
    await db.end(); //-- Close connection
    return true; //-- return true as promise
  }
  catch (err) { 
    console.log(err);
    await db.end(); //-- Close connection
    return false; //-- return true as promise
  };

}

//------------------------------------------------------------------------------
//-- Building seed tables with Sequelize based on Model data and seed JSON data
async function seedTables() {

  //-- Used to build SQL seed data, and erase anything that may exist
  const sequelize = require('./connection_sequelize');

  //-- Grab database Table models
  const { Department, Role, Employee } = require('../models');

  //-- Grab seed data to build a seed database
  const seed_Departments = require('./seed_User.json');
  const seed_Roles = require('./seed_Character.json');


  await sequelize.sync({ force: true });

  //-- Grab all departments and build Table based on Model
  const departments = await Department.bulkCreate(seed_Departments, {
    individualHooks: true,
    returning: true,
  });

  //-- grab all roles and build Table based on Model
  for (const role of seed_Roles) {
    const newRole = await Role.create({
    ...role,
    });
  }

  //-- grab all employees and build Table based on Model
  for (const employee of seed_Employees) {
    const newEmployee = await Employee.create({
    ...employee,
    });
  }

  //-- exit once done building seed database data
  // process.exit(0);
  
};


//------------------------------------------------------------------------------
//-- RUNNIUNG

const seed = async () => {

  seedDatabase()
    .then( results => console.log(`//-- database creation successful: ${results}`))
    .then(() => seedTables())
    .then( () => process.exit(0))
    //-- print error
    .catch(console.log)
};

//------------------------------------------------------------------------------
//-- RUNNING 

seed();

// seedDatabase();

