//------------------------------------------------------------------------------
//-- Modules for Sequelize ORM

const User = require('./User');
const Hero = require('./Hero');

//------------------------------------------------------------------------------
//-- Associations between tables

//-- Create associations between User and Post column values user_id
User.hasMany(Hero, {
    foreignKey: 'user_id'
  });

  Hero.belongsTo(User, {
    foreignKey: 'user_id',
});

//-----------------------------------------------------------------------------
//-- EXPORTS

module.exports = { User, Hero };
