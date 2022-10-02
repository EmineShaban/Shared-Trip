
const tripServices = require('../services/tripServices')
exports.preloadTrip = async (req, res, next) => {
    const trip = await tripServices.getOne(req.params.tripID).lean()

    req.trip = trip

    next()
}

exports.isTripAuthor = (req, res, next) => {

    // console.log(req.user._id)
    // console.log(req.trip.tripsHistory._id)

    if (req.trip.tripsHistory._id != req.user._id) {
        return next({ message: 'You are not authorized', status: 401 })
    }
    next()
}