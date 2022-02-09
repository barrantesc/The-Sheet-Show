const router = require('express').Router();
const apiRoutes = require('./api');
// -- Adding handlebars routing
const homeRoutes = require('./home-routes.js');

router.use('/api', apiRoutes);

// -- Giving handlebar routing params to Router
router.use('/', homeRoutes);

//-- if gets here when rounting, throw 404
router.use((req, res) => {
  res.status(404).end();
});


module.exports = router;
