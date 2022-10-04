const { isAuth } = require('../middlewares/authMiddleware')
// const User = require('../models/User')
const router = require('express').Router()
const userService = require('../services/userService')
const tripServices = require('../services/tripServices')

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/profile', isAuth, async (req, res) => {
    let user = await userService.getOne(req.user._id)
    let trips = await user.tripsHistory.map(el => tripServices.getOne(el))
    // let trip = await tripServices.getTripByID(req.user._id )
    let gender = user.gender
    let lengthTripHistory = user.tripsHistory.length

    // console.log(user._id )
    console.log(trips)

    res.render('home/profile', { ...user, gender, lengthTripHistory })
})


module.exports = router