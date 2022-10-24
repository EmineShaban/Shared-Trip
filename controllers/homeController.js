const { isAuth } = require('../middlewares/authMiddleware')
const router = require('express').Router()
const userService = require('../services/userService')
const tripServices = require('../services/tripServices')

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/profile', isAuth, async (req, res) => {
    let user = await userService.getOne(req.user._id)
    let trips = await tripServices.getTripByID(req.user._id).lean()
    console.log(user)
    let gender = user.gender
    let lengthTripHistory = user.tripsHistory.length

    res.render('home/profile', { gender, lengthTripHistory, trips })
})


module.exports = router