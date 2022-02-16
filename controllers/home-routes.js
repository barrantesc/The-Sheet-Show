const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Hero } = require('../models');
const withAuth = require('../utils/auth');


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
        console.log(heros);
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

// Direct to login-screen
router.get('/login', (req, res) => {
res.render('login')

})

// Direct to Charcter creator page
router.get('/character-creator', (req, res) => {
  res.render('character-creator')

});

// Testing to display hero images
router.get('/hero-images', (req, res) => {
    res.render('hero-images',{
        loggedIn: req.session.loggedIn,
    })

});

// Testing to display hero images
router.get('/profile', withAuth, async (req, res) => {

    try {
        console.log(req.session.User)
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
        res.render('profile',{
            
            loggedIn: req.session.loggedIn,
        })
    }
    catch (err) {
        // console.log(err);
        res.status(500).json(String(err));
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

module.exports = router;