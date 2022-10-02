const router = require('express').Router()
const { isAuth, isGueat } = require('../middlewares/authMiddleware')
const {getErrorMessage} = require('../utils/errorHelper')
const tripServices = require('../services/tripServices')

router.get('/shared',isAuth, (req, res) => {
    res.render('trip/shared')
})

router.get('/create', isAuth , (req, res) => {
    res.render('trip/create')
})

router.post('/create',isAuth, async(req, res) => {
    // const { ...tripData} = req.body

    // if (password !== repeatPassword) {
    //     return res.render('auth/register', {error: "Password missmatch!"})
    // }


    const trip = {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time,
        carImage: req.body.carImage,
        carBrand: req.body.carBrand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
        owner: req.user._id,
    }
    try{
    await tripServices.create(trip)
    //    const token = await authServices.createToken(createdUser)

    //    res.cookie(COOKIE_SESSION_NAME, token, {httpOnly: true})
        res.redirect('/trip/shared')
    } catch (error){
        return res.render('trip/create', {error: getErrorMessage(error)})

    }


// console.log(req.body)
    // res.render('trip/create')
})




module.exports = router