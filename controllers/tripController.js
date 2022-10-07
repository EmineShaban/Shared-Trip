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
        const trip = await tripServices.create({ ...req.body, tripsHistory: req.user._id })
        await userService.addTrip(req.user._id, trip._id)
        res.redirect('/trip/shared')
    } catch (error) {
        return res.render('trip/create', { error: getErrorMessage(error) })
    }
})
//http://localhost:3000/trip/633d3a9aed5a1a2ac19fc51b/details
//http://localhost:3000/trip/633d3a9aed5a1a2ac19fc51b/details
router.get(
    '/:tripID/details',
    // isAuth,
    async (req, res) => {
    try {
        
        const trip = await tripServices.getOneDetailed(req.params.tripID).lean()
        const isAuthor = trip.tripsHistory._id == req.user?._id
        const isAvailibleSeats = trip.seats > 0
        const listBuddies = trip.Buddies.map(e => e.email).join(', ')
        const isAlreadyJoin = trip.Buddies.map(e => e._id).find(element => element == req.user?._id) == req.user?._id
        res.render('trip/details', { ...trip, isAuthor, isAvailibleSeats, isAlreadyJoin, listBuddies })
    } catch (error) {
        return res.render(`trip/details`, { error: getErrorMessage(error) })
    }
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

router.get(
    '/:tripID/join',
    isAuth,
    preloadTrip,

    async (req, res) => {
        try {

        if (req.trip.seats > 0) {
            req.trip.seats -= 1
            await tripServices.updateOne(req.params.tripID, req.trip.seats)
            await tripServices.addBuddies(req.trip._id, req.user)
            // console.log(req.user)
            res.redirect(`/trip/${req.params.tripID}/details`)
        }
    } catch (error) {
        res.render(`/trip/${req.params.tripID}/details`, { ...req.body, error: getErrorMessage(error) })
    }
    })

    router.get('*', (req, res) => {
        res.render('404')
    })
    

module.exports = router