
const router = require('express').Router();
// connect to User and Hero routes
const userRoutes = require('./user-routes');
const heroRoutes = require('./hero-routes');

// use user and hero routes
router.use('/users', userRoutes);
router.use('/heros', heroRoutes);

module.exports = router;