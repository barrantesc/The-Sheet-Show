
const router = require('express').Router();
// connect to User and Hero routes
const userRoutes = require('./user-routes');
const heroRoutes = require('./hero-routes');

// use user and hero routes
router.use('/users', userRoutes);
router.use('/heros', heroRoutes);


//-- if gets here when rounting, throw 404
router.use((req, res) => {
    // console.log(`//-- Calling a ${req.method} in controllers/api/index.js`);
    res.status(404).json({
      request: {
        method: req.method,
        params: req.params,
        body: req.body,
        path: "./api",
      },
      response: {
        status: 404,
        message: "API rquest failure. Page not found."
  
      }
    }).end();
    
  });



module.exports = router;