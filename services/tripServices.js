const Trip = require('../models/Trip')


exports.create = (tripData) => Trip.create(tripData)
exports.getAll = () => Trip.find()
exports.getOne = (tripID) => Trip.findById(tripID)
exports.getOneDetailed = (tripID) => Trip.findById(tripID)
exports.delete = (tripID) => Trip.deleteOne({ _id: tripID })
exports.update = (tripID, tripData) => Trip.updateOne({ _id: tripID }, { $set: tripData }, { runValidators: true })
