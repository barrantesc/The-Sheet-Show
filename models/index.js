//------------------------------------------------------------------------------
//-- IMPORTS
const User = require('./User');
const Character = require('./Character');

//------------------------------------------------------------------------------

//-- Create associations between User and Post column values user_id
User.hasMany(Character, {
    foreignKey: 'user_id'
  });

Character.belongsTo(User, {
    foreignKey: 'user_id',
});

//------------------------------------------------------------------------------

// turn on connection to database and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

//-----------------------------------------------------------------------------

//-- EXPORTS
module.exports = { User, Character };
