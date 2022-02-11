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


module.exports = router;