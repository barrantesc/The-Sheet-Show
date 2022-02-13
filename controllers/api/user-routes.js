const router = require('express').Router();

// importing User and Hero models 
const { User, Hero } = require('../../models/index');

// confirms user is logged in before executing function
const withAuth = require('../../utils/auth');

// Get all users 
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(userData => res.json(userData))
        .catch(err => {
            res.status(500).json(err);
        });
});

// find a single user 
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Hero,
                attributes: [
                    'id', 'user_id', 'name', 'race', 'class', 'gender'
                ]
            }
        ]
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({
                    message: 'User not found!'
                });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(userData => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// edit existing user
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            if (!userData[0]) {
                res.status(400).json({
                    message: 'User not found!'
                });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete user
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({
                    message: 'User not found!'
                });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// login 
router.post('/login', (req, res) => {
    
    try{
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(userData => {
                if (!userData) {
                    res.status(400).json({
                        message: 'User not found!'
                    });
                    return;
                }
                const validPassword = userData.checkPassword(req.body.password);

                if (!validPassword) {
                    res.status(400).json({
                        message: 'Incorrect password!'
                    });
                    return;
                }

                req.session.save(() => {
                    req.session.user_id = userData.id;
                    req.session.username = userData.username;
                    req.session.loggedIn = true;
                });
            })
            
            .catch(err => {
                res
                .status(500)
                .json({
                  response: {
                    status: 500,
                    error: String(err)
                  }
                });
            });
        }
        catch (err) {  
            res
              .status(500)
              .json({
                response: {
                  status: 500,
                  error: String(err)
                }
              });
          }

});

// logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;