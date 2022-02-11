const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Hero } = require('../models');



// //-- GET all KBAs for homepage
// //TODO:: 02/10/2022 #EP | Build for KBAs
router.get('/', async (req, res) => {
    try {
      //TODO:: 02/10/2022 #EP | Build for KBAs
      const userData = await User.findAll({ 
        include: [
          {
            // model: KBA,
            attributes: ['id', 'username'],
          },
        ],
      });
  
      //TODO:: 02/10/2022 #EP | Build for KBAs
      const kbas = kbaData.map((kba) =>
        kba.get({ plain: true })
      );
  
      res.render('homepage', {
        kbas,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500)
      .json({
        request: {
            method: req.method,
            params: req.params,
            body: req.body,
            path: "./home-routes",
        },
        response: {
            status: 404,
            message: "Rquest failure. Page not found."
           }
        })
    }
});

//-- if gets here when rounting, throw 404
router.use((req, res) => {
    res
        .status(404)
        .json({
            request: {
                method: req.method,
                params: req.params,
                body: req.body,
                path: "./home-routes",
            },
            response: {
                status: 404,
                message: "Request failure. Page not found."
        
            }
    }).end();
    
  });

  router.get('/character', (req, res) => {
    res.render('character')

})

module.exports = router;