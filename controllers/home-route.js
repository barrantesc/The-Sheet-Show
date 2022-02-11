const router = require("express").Router();

router.get('/', (req, res) => {
    res.render('homepage')

})

router.get('/character', (req, res) => {
    res.render('character')

})

module.exports = router;