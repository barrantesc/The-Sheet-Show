//------------------------------------------------------------------------------
//-- IMPORTS
const User = require('./User');
const Sheet = require('./Sheet');

//------------------------------------------------------------------------------

//-- Create associations between User and Post column values user_id
User.hasMany(Sheet, {
    foreignKey: 'user_id'
  });

Sheet.belongsTo(User, {
    foreignKey: 'user_id',
});


//-- Associates both users and post to vote, our through table

/*
  Now we need to associate User and Post to one another in a way that when we
  query Post, we can see a total of how many votes a user creates; and when we
  query a User, we can see all of the posts they've voted on. You might think
  that we can use .hasMany() on both models, but instead we need to use
  .belongsToMany().
*/

// User.belongsToMany(Post, {
//   through: Vote,
//   as: 'voted_posts',
//   foreignKey: 'user_id'
// });

// Post.belongsToMany(User, {
//   through: Vote,
//   as: 'voted_posts',
//   foreignKey: 'post_id'
// });


/*
    Association for Comments.

    - We just want to see the user's comment and which post it was for.
*/

// Comment.belongsTo(User, {
//   foreignKey: 'user_id'
// });

// Comment.belongsTo(Post, {
//   foreignKey: 'post_id'
// });

// User.hasMany(Comment, {
//   foreignKey: 'user_id'
// });

// Post.hasMany(Comment, {
//   foreignKey: 'post_id'
// });



//------------------------------------------------------------------------------
//-- EXPORTS
module.exports = { User, Sheet };
