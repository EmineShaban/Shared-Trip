const Trip = require('../models/Trip')


exports.create = (tripData) => Trip.create(tripData)
exports.getAll = () => Trip.find()
exports.getOne = (tripID) => Publication.findById(tripID)
exports.getOneDetailed = (tripID) => Trip.findById(tripID).populate('author')
