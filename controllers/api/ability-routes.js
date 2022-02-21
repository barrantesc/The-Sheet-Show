const router = require('express').Router();
const { Ability } = require('../../models');
const withAuth = require('../../utils/auth');

// get all abilities
router.get('/', (req, res) => {
    Ability.findAll({
        attributes: [
            'hero_id',
            'name',
            'score',
            'modifier'
        ],
    })
        .then(abilityData => res.json(abilityData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create ability
router.post('/', withAuth, (req, res) => {
    Ability.create({
        hero_id: req.body.hero_id,
        name: req.body.name,
        score: req.body.score,
        modifier: req.body.modifier
    })
        .then(abilityData => res.json(abilityData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

module.exports = router;