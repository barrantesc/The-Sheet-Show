const router = require('express').Router();
const { User, Hero } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all heroes - to be updated when we know all hero properties
router.get('/', (req, res) => {
    Hero.findAll({
        attributes: [
            'id', 'name', 'race', 'class', 'gender'
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
            'id', 'name', 'race', 'class', 'gender'
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
        gender: req.body.gender
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
        race: req.body.race,
        class: req.body.class,
        gender: req.body.gender
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