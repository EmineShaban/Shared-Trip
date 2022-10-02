const User = require('../models/User')

exports.getOne = (userId) => User.findById(userId)
exports.addTrip = async(userId, tripID) =>{
// const user = await User.findById(userId)

// user.tri.push(triID)
// await user.save()
// return user
return User.updateOne({_id: userId}, {$push: {tripsHistory: tripID}})
}