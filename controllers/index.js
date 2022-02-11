//-- Import Express and create router to share existing express instance
const router = require('express').Router();
// //-- Importing other routes to ensure existing express has access 
const apiRoutes = require('./api');
router.use('/api', apiRoutes);

// // routes from homepage
const homeRoutes = require('./home-routes');
router.use('/', homeRoutes);

// // access to homepage routes

//-- Returning route info to server.js in root.
module.exports = router;
