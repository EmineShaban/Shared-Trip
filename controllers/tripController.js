const router = require('express').Router()
const { isAuth, isGueat } = require('../middlewares/authMiddleware')
const { getErrorMessage } = require('../utils/errorHelper')
const tripServices = require('../services/tripServices')
const userService = require('../services/userService')
const { preloadTrip, isTripAuthor } = require('../middlewares/tripMiddleware')


router.get('/shared', async (req, res) => {
    const tripOffer = await tripServices.getAll().lean()
    res.render('trip/shared', { tripOffer })
})

router.get('/create', isAuth, (req, res) => {
    res.render('trip/create')
})

router.post('/create', isAuth, async (req, res) => {
    try {
        const trip = await tripServices.create({ ...req.body, tripsHistory: req.user })

        await userService.addTrip(req.user._id, trip._id)
        console.log(req.user)
        res.redirect('/trip/shared')
    } catch (error) {
        return res.render('trip/create', { error: getErrorMessage(error) })
    }
})


router.get(
    '/:tripID/details',
    async (req, res) => {
        const trip = await tripServices.getOneDetailed(req.params.tripID).lean()
        const isAuthor = trip.tripsHistory._id == req.user?._id
        let email = trip.tripsHistory.email
        // console.log(trip.tripsHistory)
        res.render('trip/details', { ...trip, isAuthor })
    })

router.get(
    '/:tripID/delete',
    isAuth,
    preloadTrip,
    isTripAuthor,
    async (req, res) => {
        await tripServices.delete(req.params.tripID)
        res.redirect('/')
    })

router.get(
    '/:tripID/edit',
    isAuth,
    preloadTrip,
    isTripAuthor,
    (req, res) => {
        res.render('trip/edit', { ...req.trip })
    })


router.post(
    '/:tripID/edit',
    isAuth,
    preloadTrip,
    isTripAuthor,
    async (req, res) => {
        try {
            await tripServices.update(req.params.tripID, req.body)
            res.redirect(`/trip/${req.params.tripID}/details`)
        } catch (error) {
            res.render('trip/edit', { ...req.body, error: getErrorMessage(error) })
        }
    })

    // router.get(
    //     '/:tripID/join',
    //     isAuth,
    //     preloadTrip,
        
    //     async (req, res) => {
    //         await tripServices.delete(req.params.tripID)
    //         res.redirect('/')
    //     })



module.exports = router