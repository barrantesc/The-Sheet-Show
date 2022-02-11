//-- Import Express and create router to share existing express instance
const router = require('express').Router();
// //-- Importing other routes to ensure existing express has access 
const apiRoutes = require('./api');
router.use('/api', apiRoutes);

// // routes from homepage
const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);

// // access to homepage routes

//-- if gets here when rounting, throw 404
router.use((req, res) => {
    // console.log(`//-- Calling a ${req.method} in controllers/api/index.js`);
    res
        .status(404)
        .json({
            request: {
                method: req.method,
                params: req.params,
                body: req.body,
                path: "./",
            },
            response: {
                status: 404,
                message: "Rquest failure. Page not found."
        
            }
    }).end();
    
  });

//-- Returning route info to server.js in root.
module.exports = router;
