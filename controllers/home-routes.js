const router = require('express').Router();
const { render } = require('express/lib/response');
const sequelize = require('../config/connection');
const { User, Hero, Ability } = require('../models');
const withAuth = require('../utils/auth');
const contentManager = require('../utils/contentManager');


//GET request to show all characters and include their usernames
router.get('/', async (req,res) => {
    // console.log('------------------------------')
    try{
        const heroData = await Hero.findAll({
            attributes: [
                'id',
                'user_id',
                'name',
                'race',
                'class',
                'gender',
                "id",
                "user_id",
                "name",
                "race",
                "class",
                "gender",
                "age",
                "player_level",
                "proficiency_bonus",
                "alignment",
                "languages",
                "proficiencies",
                "image_link",
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
        // console.log(heros);
        res.render('homepage', {
            username: req.session.User,
            heros,
            loggedIn: req.session.loggedIn,
        });
  }
   catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
})

//GET REQUEST FOR SINGLE CHARACTER
router.get('/hero/:id', (req, res) => {
    Hero.findOne({
        where: {
            id: req.params.id
        }
    })
})

// Direct to login-screen
router.get('/login', (req, res) => {
    res.render('login')
})

// Direct to Charcter creator page
router.get('/character-creator', (req, res) => {
  res.render('character-creator', {
    loggedIn: req.session.loggedIn,
  })

});

// Testing to display hero images
//-- 02/16/2022 #EP || This being used?
router.get('/hero-images', (req, res) => {
    res.render('hero-images',{
        loggedIn: req.session.loggedIn,
    })

});

//-- Grab an existing hero's character sheet based on ID
router.get('/hero-card/:id', async (req, res) => {
    
    if(!req.session.loggedIn){

        //todo: 02/16/2022 #EP || Verify this is even working
            res.redirect('/');
            return;
    }

    //-- otherwise render
    try {
        const heroData = await Hero.findAll({
            where: {
                id: req.params.id,
            },
            attributes: [
                'id',
                'user_id',
                'name',
                'race',
                'class',
                'gender',
                "name",
                "race",
                "class",
                "gender",
                "age",
                "player_level",
                "proficiency_bonus",
                "alignment",
                "languages",
                "proficiencies",
                "image_link",
            ],
        });
    
        const heros = heroData.map((myHero) =>
        myHero.get({ plain: true })
        );

        // capitalize race for hero card
        heros[0].race = contentManager.uppercaseFirst(heros[0].race)

        res.render('hero-card', {
            heros,
            username: req.session.username,
            session_user_id: req.session.user_id,
            loggedIn: req.session.loggedIn,
            
        })
    }
    catch (err) {
        //TODO:: 02/16/2022 #EP | Need to push back to homeapge but isn't
        res
            .status(500)
            .json(String(err))
            return;
        
    }
});

//-- Grab an existing hero's character sheet based on ID
router.get('/character-sheet/:id', async (req, res) => {
    
    if(!req.session.loggedIn){

        //todo: 02/16/2022 #EP || Verify this is even working
            res.redirect('/');
            return;
    }

    //-- otherwise render
    try {
        const heroData = await Hero.findAll({
            where: {
                id: req.params.id,
            },
            attributes: [
                'id',
                'user_id',
                'name',
                'race',
                'class',
                'gender',
                "id",
                "user_id",
                "name",
                "race",
                "class",
                "gender",
                "age",
                "player_level",
                "proficiency_bonus",
                "alignment",
                "languages",
                "proficiencies",
                "image_link",
            ],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Ability,
                    attributes: ['name', 'score', 'modifier']
                }
            ]
        });
    
        const heros = heroData.map((myHero) =>
        myHero.get({ plain: true })
        );

        res.render('character-sheet-id', {
            username: req.session.username,
            heros,
            loggedIn: req.session.loggedIn,
        })
    }
    catch (err) {
        //TODO:: 02/16/2022 #EP | Need to push back to homeapge but isn't
        res
            .status(500)
            .json(String(err))
            return;
        
    }
});

//-- Character Sheet
router.get('/character-sheet/', async (req, res) => {
    if(!req.session.loggedIn){

        //todo: 02/16/2022 #EP || Verify this is even working
        res.redirect('homepage');
        return;
    }
    
    res.render('character-sheet', {
        loggedIn: req.session.loggedIn,
    })

});

// Testing to display hero images
router.get('/profile', withAuth, async (req, res) => {

    if (!req.session.loggedIn) {
        res.redirect('homepage');
        return;
    }

    try {
        // console.log(req.session.User)
        const heroData = await Hero.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: [
                'id',
                'user_id',
                'name',
                'race',
                'class',
                'gender',
                "name",
                "race",
                "class",
                "gender",
                "age",
                "player_level",
                "proficiency_bonus",
                "alignment",
                "languages",
                "proficiencies",
                "image_link",
            ],
        });

        const heros = heroData.map((hero) =>
            hero.get({ plain: true })
        );

        res.render('profile',{
            heros,
            loggedIn: req.session.loggedIn,
            username: req.session.username,
        })
    }
    catch (err) {
        // console.log(err);
        res.status(500).json(String(err));
      }
});


// error page MM effort
router.get("/*", (req, res) => {
    res.render("error")
})


//-- if gets here when routing, throw 404
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