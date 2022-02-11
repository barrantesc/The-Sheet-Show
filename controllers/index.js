//-- Import Express and create router to share existing express instance
const router = require('express').Router();
//-- Importing other routes to ensure existing express has access 
const apiRoutes = require('./api');

// routes from homepage
const homeRoutes = require('./home-routes');

//-- Giving access to api routes
router.use('/api', apiRoutes);

// access to homepage routes
router.use('/', homeRoutes);

//-- Returning route info to server.js in root.
module.exports = router;
