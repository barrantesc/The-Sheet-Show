const router = require('express').Router();
const { User, Hero } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all heroes - to be updated when we know all hero properties
router.get('/', async (req, res) => {

    const heros = await Hero.findAll({
        attributes: [
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
            }
        ]
    })
        .then(heroData => res.json(heroData))
        .catch(err => {
            console.log(err);
            res
                .status(500)
                .json({
                    request: {
                        method: req.method,
                        params: req.params,
                        body: req.body,
                        path: "./heros",
                    },
                    response: {
                        status: 500,
                        message: "Rquest failure. Catch Failure.",
                        error: err

                    }
                })
        });
});

// get single hero - to be updated when we know all hero properties
router.get('/:id', (req, res) => {
    Hero.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
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

// create hero  - to be updated when we know all hero properties
router.post('/', withAuth, (req, res) => {
    Hero.create({
        user_id: req.body.user_id,
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

// updated existing hero - to be updated when we know all hero properties
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
router.delete('/:id', withAuth, (req, res) => {
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
                return;
            }
            res.json(heroData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;