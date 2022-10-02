const { isAuth } = require('../middlewares/authMiddleware')

const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/profile', isAuth, (req, res) => {
    res.render('home/profile', {...req.user})
})


module.exports = router