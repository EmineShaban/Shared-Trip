const Trip = require('../models/Trip')


exports.create = (tripData) => Trip.create(tripData)
exports.getAll = () => Trip.find()
