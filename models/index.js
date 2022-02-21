//------------------------------------------------------------------------------
//-- Modules for Sequelize ORM

const User = require('./User');
const Hero = require('./Hero');
const Ability = require('./Ability')

//------------------------------------------------------------------------------
//-- Associations between tables

//-- Create associations between User and Hero column values user_id
User.hasMany(Hero, {
  foreignKey: 'user_id'
});

Hero.belongsTo(User, {
  foreignKey: 'user_id',
});

//-- Create associations between Hero and Ability
Hero.hasMany(Ability, {
  foreignKey: 'hero_id'
});

Ability.belongsTo(Hero, {
  foreignKey: 'hero_id',
});

//-----------------------------------------------------------------------------
//-- EXPORTS

module.exports = { User, Hero, Ability };
