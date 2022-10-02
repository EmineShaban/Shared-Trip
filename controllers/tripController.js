const router = require('express').Router()
const { isAuth, isGueat } = require('../middlewares/authMiddleware')
const { getErrorMessage } = require('../utils/errorHelper')
const tripServices = require('../services/tripServices')
const userService = require('../services/userService')
router.get('/shared', isAuth, async (req, res) => {
    const tripOffer = await tripServices.getAll().lean()
    res.render('trip/shared', { tripOffer })
    // res.render('trip/shared')
})

router.get('/create', isAuth, (req, res) => {
    res.render('trip/create')
})

router.post('/create', isAuth, async (req, res) => {
    // const trip = {
    //     startPoint: req.body.startPoint,
    //     endPoint: req.body.endPoint,
    //     date: req.body.date,
    //     time: req.body.time,
    //     carImage: req.body.carImage,
    //     carBrand: req.body.carBrand,
    //     seats: req.body.seats,
    //     price: req.body.price,
    //     description: req.body.description,
    //     owner: req.user._id,
    // }
    try {

     const trip =    await tripServices.create({...req.body, author: req.user._id})

        await userService.addTrip(req.user._id, trip._id)
        // console.log(req.body)
        // console.log(trip._id)

        res.redirect('/trip/shared')
    } catch (error) {
        return res.render('trip/create', { error: getErrorMessage(error) })
    }
    // console.log(req.user._id)
    // try {
    //     const publication = await publicationServices.create({ ...req.body, author: req.user._id })
    //     await userService.addPublication(req.user._id, publication._id)
    //     res.redirect('/publication')

    // } catch (error) {
    //     res.render('publication/create', { error: getErrorMessage(error) })
    // }

})


router.get(
    '/:publicationID/details',
    async (req, res) => {

        const trip = await tripServices.getOneDetailed(req.params.tripID).lean()
        // const isAuthor = trip.id == req.user?._id
        // const isShared = publication.usersShared.includes(req.user._id) 
        // const isShared = publication.usersShared.find(element => element == req.user._id) == req.user._id
        // console.log(isShared22)

        // includes(req.user._id)
        // console.log(publication.usersShared.find(element => element == req.user._id))

        // console.log(req.user._id)

        res.render('trip/details', { ...trip })
    })



module.exports = router