const Trip = require('../models/Trip')


exports.create = (tripData) => Trip.create(tripData)
exports.getAll = () => Trip.find()
exports.getOne = (tripID) => Trip.findById(tripID)
exports.getOneDetailed = (tripID) => Trip.findById(tripID)
exports.delete = (tripID) => Trip.deleteOne({ _id: tripID })
exports.update = (tripID, tripData) => Trip.updateOne({ _id: tripID }, { $set: tripData }, { runValidators: true })
exports.updateOne = (tripID, seatsNew) => Trip.updateOne({ _id: tripID }, { $set: { "seats" : seatsNew } }, { runValidators: true })
exports.addBuddies = (tripID, userId) => Trip.updateOne({ _id: tripID }, { $push: { "Buddies" : userId } }, { runValidators: true })
// exports.addBuddies = (tripID, userId) => Trip.updateOne({_id: tripID}, {$push: {Buddies: userId}})

exports.getTripByID = (userId) => Trip.find({tripsHistory: userId})
