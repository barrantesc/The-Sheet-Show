const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Hero } = require('../models');


//GET request to show all characters and include their usernames
router.get('/', (req,res) => {
    console.log('------------------------------')
    Hero.findAll({
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
    })
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