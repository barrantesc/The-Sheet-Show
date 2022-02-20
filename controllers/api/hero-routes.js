const router = require('express').Router();
const { User, Hero, Ability } = require('../../models');
const withAuth = require('../../utils/auth');

// get all heroes
router.get('/', (req, res) => {
    Hero.findAll({
        attributes: [
            'id',
            'user_id',
            'name',
            'race',
            'class',
            'gender',
            'age',
            'proficiency_bonus',
            'alignment',
            'languages',
            'proficiencies',
            'image_link'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Ability,
                attributes: [ 'name', 'score', 'modifier']
            }
        ]
    })
        .then(heroData => res.json(heroData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get single hero
router.get('/:id', (req, res) => {
    Hero.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'user_id',
            'name',
            'race',
            'class',
            'gender',
            'age',
            'proficiency_bonus',
            'alignment',
            'languages',
            'proficiencies',
            'image_link'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Ability,
                attributes: [ 'name', 'score', 'modifier']
            }
        ]
    })
        .then(heroData => {
            if (!heroData) {
                res.status(404).json({
                    message: 'Hero not found!'
                });
                return;
            }
            res.json(heroData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create hero
router.post('/', withAuth, (req, res) => {
    Hero.create({
        user_id: req.session.user_id,
        name: req.body.name,
        race: req.body.race,
        class: req.body.class,
        gender: req.body.gender,
        age: req.body.age,
        player_level: req.body.player_level,
        proficiency_bonus: req.body.proficiency_bonus,
        alignment: req.body.alignment,
        languages: req.body.languages,
        proficiencies: req.body.proficiencies,
        image_link: req.body.image_link
    })
        .then(heroData => res.json(heroData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

//updated existing hero
router.put('/:id', withAuth, (req, res) => {
    Hero.update({
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        player_level: req.body.player_level
    },
        {
            where: {
                id: req.params.id
            }
        })
        .then(heroData => {
            if (!heroData) {
                res.status(404).json({
                    message: 'Hero not found!'
                });
                return;
            }
            res.json(heroData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete hero
router.delete('/:id', withAuth, async (req, res) => {
    console.log("delete route hit")
    
    //-- if not logged in, can't delete
    if(!req.session.loggedIn){ 
        console.log("not logged in, go home")
        // document.redirect('/');
        return;
    }
    
    //-- verify heros user_id associated matches session_user_id  
    Hero.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(heroData => {
        if (!heroData) {
            res.status(404).json({
                message: 'Hero not found!'
            });
            console.log('nothing to delete')
            return;
        }
        console.log("delete")
        res.json(heroData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
        
    
    
});

module.exports = router;