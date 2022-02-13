const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Hero } = require('../models');


//GET request to show all characters and include their usernames
router.get('/', async (req,res) => {
    console.log('------------------------------')
    try{
        const heroData = await Hero.findAll({
            attributes: [
                'id',
                'user_id',
                'name',
                'race',
                'class',
                'gender'
            ],
            include : [
                {
                    model: User,
                    attributes: ['id', 'username'],
                }
            ]
        });

        const heros = heroData.map((hero) =>
            hero.get({ plain: true })
        );

        res.render('homepage', {
            heros,
            loggedIn: req.session.loggedIn,
        });
  }
   catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

//GET REQUEST FOR SINGLE CHARACTER
router.get('/hero/:id', (req, res) => {
    Hero.findOne({
        where: {
            id: req.params.id
        }//MM PAUSED HEREEEEEEEEEEEEEEEEEEEE
    })
})


// //-- GET all KBAs for homepage
// //TODO:: 02/10/2022 #EP | Build for KBAs
router.get('/login', async (req, res) => {
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

// Direct to Charcter creator page
router.get('/character-creator', (req, res) => {
  res.render('character-creator')

})

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

module.exports = router;