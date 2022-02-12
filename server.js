//-- access to stylesheet within express app
const path = require('path');

//-- Express
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;


//-- Feeding Express server info it needs to be used

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//-- this MUST be above routes
app.use(express.static(path.join(__dirname, 'public')));


//-- Defining APP template engine - Using Handelbars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//------------------------------------------------------------------------------
//-- Express Session and Connection-Session Sequelize onboarding

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));


//------------------------------------------------------------------------------
// turn on routes

app.use(routes);


//------------------------------------------------------------------------------
//-- Create Database Connection

// turn on connection to db and server
/* 
    - { force: true } == database connection must sync with the model definitions and
     associations.
    
     - By forcing the sync method to true, we will make the tables re-create if
    there are any association changes.

 */

//-- use xisting tables if exist, start connection to express and SQL
sequelize.sync({ force: false }).then(() => {
//-- Overvwrite existing tables if exist, start connection to express and SQL
// sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://127.0.0.1:${PORT}`));
});
