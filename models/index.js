//------------------------------------------------------------------------------
//-- IMPORTS

const User = require('./User');
const Toon = require('./Toon');

//------------------------------------------------------------------------------
//-- Sequelize Table Management

//-- Create associations between User and Post column values user_id
User.hasMany(Toon, {
    foreignKey: 'user_id'
  });

Toon.belongsTo(User, {
    foreignKey: 'user_id',
});

//-----------------------------------------------------------------------------

//-- EXPORTS
module.exports = { User, Toon };
